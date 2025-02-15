import React from 'react'
import Home from './src/screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
// import Spotify from './src/screens/Spotify';
import Workout from './src/screens/Workout';
// import TextInput from './src/component/TextInput';
// import SampleText from './src/component/SampleText';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Workout" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        {/* <Stack.Screen name="Spotify" component={Spotify}/> */}
        <Stack.Screen name="Workout" component={Workout}/>
        {/* <Stack.Screen name="SampleText" component={SampleText}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App