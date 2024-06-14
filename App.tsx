import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/stack/MainStack'
export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}