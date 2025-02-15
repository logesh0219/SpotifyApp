


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

// const SpotifyTracks = () => {
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTracks = async () => {
//       try {
//         // Fetch a playlist's track list (example: public playlist ID)
//         const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; // Example playlist ID (Spotify's "Today's Top Hits")
//         const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // No token required for public data
//           },
//         });
//         const data = await response.json();
//         setTracks(data.items); // Extract tracks from response
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchTracks();
//   }, []);

//   const handleTrackPress = (trackUri) => {
//     const spotifyUrl = `https://open.spotify.com/track/${trackUri}`;
//     Linking.openURL(spotifyUrl); // Open the track on the Spotify app or web
//   };

//   const renderTrackItem = ({ item }) => {
//     const track = item.track;

//     return (
//       <TouchableOpacity onPress={() => handleTrackPress(track.id)}>
//         <View style={styles.trackItem}>
//           {track.album.images[0] && (
//             <Image source={{ uri: track.album.images[0].url }} style={styles.trackImage} />
//           )}
//           <View style={styles.trackInfo}>
//             <Text style={styles.trackName}>{track.name}</Text>
//             <Text style={styles.trackArtist}>{track.artists[0].name}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//     <Text>hello</Text>
//       {loading ? (
//         <Text>Loading tracks...</Text>
//       ) : (
//         <FlatList
//           data={tracks}
//           renderItem={renderTrackItem}
//           keyExtractor={(item) => item.track.id}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   trackItem: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     alignItems: 'center',
//   },
//   trackImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//   },
//   trackInfo: {
//     marginLeft: 10,
//   },
//   trackName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   trackArtist: {
//     fontSize: 14,
//     color: '#555',
//   },
// });

// export default SpotifyTracks;
