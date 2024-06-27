import { View, Text, useColorScheme, Appearance } from 'react-native'
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
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native'

const Stack = createNativeStackNavigator()
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='drawer' component={DrawerStack} options={{ headerShown: false }}
      
      />
    </Stack.Navigator>
  )
}
const Tab = createBottomTabNavigator<RootStackParams>()
export default function TabStack() {
  const deviceTheme = Appearance.getColorScheme()

  console.log('====================================');
  console.log(deviceTheme);
  console.log('====================================');

  const {t} = useTranslation()
  const {colors} = useTheme()
  return (
    <Tab.Navigator
    
    screenOptions={{
      tabBarStyle:{backgroundColor:colors.background, borderWidth:2, elevation:6, shadowColor:colors.text},
      headerStyle:{backgroundColor:colors.background, }
    }}
    >
      <Tab.Screen name={t('home')} component={Home} 
      options={{
        tabBarIcon:({focused})=>{
          return(
            focused ? <Homelogo width={25}  height={25} color='red'  /> :
            <Homelogo width={25}  height={25} color={colors.text}  />
          )
        },
        tabBarActiveTintColor:'gray'
        
      }}
       />
      <Tab.Screen name={t('tasks')} component={HomeStack}
      options={{
        tabBarIcon:({focused})=>{
          return(
            focused ? <Codelogo width={25}  height={25} color='red'   /> :
            <Codelogo width={25}  height={25} color={colors.text}   />
          )
        },
        tabBarActiveTintColor:'gray'

        
      }
    
    }
      

      

      />
    </Tab.Navigator>
  )
}