import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SongList from '../component/SongList';
import SongsData from '../assets/data/SongsData';

const Spotify = () => {
  return (
    <View style={styles.spotify}>
      <Text style={{ fontSize: 28, textAlign: 'center', color: '#fff' }}>Spotify top songs list</Text>
      <View style={{ marginTop: 10, paddingBottom: 30 }}>
        <FlatList
          data={SongsData}
          persistentScrollbar={false}
          keyExtractor={(item) => item.track.id} // Use a unique ID from the song object
          renderItem={({ item }) => (
            <View>
              <SongList song={item} songs={SongsData} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Spotify;

const styles = StyleSheet.create({
  spotify: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});