import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import SongModal from './SongModal';

const SongList = ({ song, songs }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSongClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedSong(song);  // Set selectedSong to the current song
      setIsLoading(false);
      setIsModalVisible(true); //open modal
    }, 500);
  };

  const closeModal = () => {
    setSelectedSong(null);
    setIsModalVisible(false); //close modal
  };

  const songName = song.track.name;
  const artistNames = song.track.artists.map((artist) => artist.name).join(', ');
  const albumImage = song.track.album.images[0]?.url;

  return (
    <View style={styles.list}>
      <TouchableOpacity style={styles.header} onPress={handleSongClick}>
        <View>{albumImage && <Image source={{ uri: albumImage }} style={styles.albumImage} />}</View>
        <View style={styles.songDetails}>
          <Text style={[styles.text, { fontWeight: '600', fontSize: 18, color: '#000' }]} numberOfLines={1}>
            {songName.length <= 30 ? songName : songName.slice(0, 30) + '...'}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {artistNames.length <= 30 ? artistNames : artistNames.slice(0, 30) + '...'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Song Modal */}
      {selectedSong && isModalVisible && (  // only render modal if song is selected and isModalVisible is true
        <SongModal
          song={selectedSong}
          onClose={closeModal}
          songs={songs}  // Pass the entire songs array
          setSelectedSong={(newSong) => setSelectedSong(newSong)}
        />
      )}
    </View>
  );
};

export default SongList;

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    gap: 10,
    height: 70,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
  },
  songDetails: {
    width: '80%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  albumImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
});