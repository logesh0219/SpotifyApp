import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.home}>
      <Text style={styles.text}>Welcome to home page</Text>
      {/* <TouchableHighlight
        style={styles.button}
        underlayColor="#ddd"
        onPress={() => navigation.navigate('Spotify')}
      >
        <Text style={styles.buttonText}>Go to Spotify</Text>
      </TouchableHighlight> */}
      <TouchableHighlight
        style={styles.button}
        underlayColor="#ddd"
        onPress={() => navigation.navigate('Workout')}
      >
        <Text style={styles.buttonText}>Go to Workout</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
