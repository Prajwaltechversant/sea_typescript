import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, useTheme } from '@react-navigation/native';
import MainStack from './src/stack/MainStack';
import notifee, { EventType } from '@notifee/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import colorPalette from './src/assets/colorPalette/colorPalette';
import ColorThemeContext, { ColorThemeContextAPI } from './src/context/ColorThemeContext';
import { Appearance } from 'react-native';

export default function App() {
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification?.data);
          break;
      }
    });
  }, []);


  return (
    <ColorThemeContext>
      <ThemeProviderWrapper />
    </ColorThemeContext>
  );
}
function ThemeProviderWrapper() {
  const { theme,setTheme } = useContext(ColorThemeContextAPI);
  const activeColor = theme === 'dark' ? colorPalette.dark : colorPalette.light
  Appearance.addChangeListener((scheme)=>{
    // console.log('====================================');
    // console.log(scheme);
    // console.log('====================================');
    setTheme(scheme.colorScheme)
  })

  const {colors} = useTheme()

  return (
    <NavigationContainer theme={activeColor}  >
      <PaperProvider>
        <MainStack   />
      </PaperProvider>
    </NavigationContainer>
  );
}
