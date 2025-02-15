import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Modal, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import Sound from 'react-native-sound';

const PREVIEW_DURATION = 30; // Seconds (adjust if needed)

const SongModal = ({ song, onClose, songs, setSelectedSong }) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songProgress, setSongProgress] = useState(0);
    const intervalRef = useRef(null);

    const albumImage = song.track.album.images[0]?.url;
    const songName = song.track.name;
    const artistNames = song.track.artists.map((artist) => artist.name).join(', ');
    const durationms = song.track.duration_ms;
    const duration = `${Math.floor(durationms / 60000)}:${String(Math.floor((durationms % 60000) / 1000)).padStart(2, '0')}`;

    const loadAndPlaySound = () => {
        const previewUrl = song.track.preview_url;
        if (!previewUrl) {
            console.log('No preview available');
            stopSound();
            return;
        }

        stopSound();

        const soundInstance = new Sound(previewUrl, null, (error) => {
            if (error) {
                console.error('Error loading sound', error);
                stopSound();
                return;
            }

            setSound(soundInstance);
            setIsPlaying(true);

            soundInstance.play((success) => {
                if (success) {
                    stopSound();
                } else {
                    updateProgress();
                }
            });
        });
    };

    const updateProgress = () => {
        if (durationms <= 0) {
            console.warn("Song duration is zero or negative. Cannot update progress.");
            return;
        }

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (sound && isPlaying) {
                sound.getCurrentTime((seconds) => {
                    const progress = seconds / PREVIEW_DURATION;
                    setSongProgress(progress);
                    if (progress >= 1) {
                        stopSound();
                    }
                });
            }
        }, 250);
    };

    const togglePlayPause = () => {
        if (!sound) {
            loadAndPlaySound();
            return;
        }

        setIsPlaying((prevIsPlaying) => {
            if (prevIsPlaying) {
                sound.pause();
                clearInterval(intervalRef.current);
            } else {
                sound.play((success) => {
                    if (success) {
                        stopSound();
                    } else {
                        updateProgress();
                    }
                });
            }
            return !prevIsPlaying;
        });
    };

    updateProgress()

    const navigateSong = (direction) => {
        stopSound();
        const currentIndex = songs.findIndex(s => s.track.id === song.track.id);
        let newIndex = (currentIndex + direction + songs.length) % songs.length;
        setSelectedSong(songs[newIndex]);
    };

    const stopSound = () => {
        clearInterval(intervalRef.current);

        if (sound) {
            sound.stop(() => {
                sound.release();
                setSound(null);
            });
        }
        setIsPlaying(false);
        setSongProgress(0); 
    };

    useEffect(() => {
        loadAndPlaySound();

        return () => {
            stopSound();
        };
    }, [song]);

    const handleClose = () => {
        stopSound();
        onClose();
    };

    return (
        <Modal visible={true} transparent={true} animationType="slide" onRequestClose={handleClose}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Image source={{ uri: albumImage }} style={styles.albumImage} />
                            <View style={styles.songDetails}>
                                <Text style={[styles.text, { fontWeight: '600', fontSize: 18 }]} numberOfLines={1}>
                                    {songName.length <= 30 ? songName : songName.slice(0, 30) + '...'}
                                </Text>
                                <Text style={styles.text} numberOfLines={1}>
                                    {artistNames.length <= 30 ? artistNames : artistNames.slice(0, 30) + '...'}
                                </Text>
                                <Text style={styles.text}>Duration: {duration}</Text>
                                <View style={styles.songProgress}>
                                    <View style={[styles.songLength, { width: `${songProgress * 100}%` }]} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={() => navigateSong(-1)} style={styles.controlButton} accessibilityLabel="Previous Song">
                                <Image source={require('../assets/images/backward-btn.png')} style={styles.controlImage} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
                                onPress={togglePlayPause}
                                style={styles.controlButton}
                            >
                                <Image
                                    source={isPlaying ? require('../assets/images/pause-btn.png') : require('../assets/images/play-btn.png')}
                                    style={styles.controlImage}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateSong(1)} style={styles.controlButton} accessibilityLabel="Next Song">
                                <Image source={require('../assets/images/forward-btn.png')} style={styles.controlImage} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={handleClose} accessibilityLabel="Close">
                            <Image source={require('../assets/images/close-btn.png')} style={styles.closeImage} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default SongModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        flexDirection: 'row',
    },
    albumImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    songDetails: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    songProgress: {
        width: '100%',
        height: 5,
        backgroundColor: '#aaa',
        borderRadius: 10,
        marginTop: 10,
        overflow: 'hidden',
    },
    songLength: {
        height: '100%',
        backgroundColor: '#444',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    controlButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    controlImage: {
        width: 30,
        height: 30,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeImage: {
        width: 25,
        height: 25,
    },
});