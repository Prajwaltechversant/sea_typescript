import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/stack/MainStack'

import notifee, { AndroidImportance, AndroidStyle, AndroidVisibility, EventType } from '@notifee/react-native';
import RNFS from 'react-native-fs'
import { Appearance } from 'react-native';

export default function App() {

  // const getdeviceDefaultTheme = ()=>{
  //  const colorTheme =  Appearance.getColorScheme()
  //  console.log(colorTheme)
  //  Appearance.setColorScheme('')
  // }



  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification?.data);
          // let path = <details></details>
          // RNFS.readFile(detail.notification?.data.path, 'utf8')
          break;
      }
    });
  }, []);

  // useEffect(()=>{
  //   getdeviceDefaultTheme()
  // },[])
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}