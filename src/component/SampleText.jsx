import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';

const SampleText = () => {
  const [text, setText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.text}>SampleText</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type here"
          placeholderTextColor="#888"
          onFocus={()=>setText('')}
        />
        <Text style={styles.text}>You typed: {text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SampleText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    color: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
