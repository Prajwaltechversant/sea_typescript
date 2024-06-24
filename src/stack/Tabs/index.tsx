import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../screens/Home'
import DrawerStack from '../Drawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import Screen2 from '../../screens/screen2'
import { RootStackParams } from '../MainStack'
import Editor from '../../screens/Imageditor'
import Homelogo from '../../assets/images/home.svg'
import Codelogo from '../../assets/images/code.svg'

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
      <Tab.Screen name='Home' component={Home} 
      options={{
        tabBarIcon:({focused})=>{
          return(
            focused ? <Homelogo width={25}  height={25} color='red'  /> :
            <Homelogo width={25}  height={25} color='black'  />
          )
        },
        tabBarActiveTintColor:'gray'
        
      }}
       />
      <Tab.Screen name='HomeStack' component={HomeStack}
      options={{
        tabBarIcon:({focused})=>{
          return(
            focused ? <Codelogo width={25}  height={25} color='red'   /> :
            <Codelogo width={25}  height={25} color='black'   />
          )
        },
        tabBarActiveTintColor:'gray'

        
      }
    
    }
      

      

      />
    </Tab.Navigator>
  )
}