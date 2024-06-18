import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../screens/Home'
import DrawerStack from '../Drawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import Screen2 from '../../screens/screen2'
import { RootStackParams } from '../MainStack'


const Stack = createNativeStackNavigator()
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='drawer' component={DrawerStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
const Tab = createBottomTabNavigator<RootStackParams>()
export default function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home}  />
      <Tab.Screen name='HomeStack' component={HomeStack} />

    </Tab.Navigator>
  )
}