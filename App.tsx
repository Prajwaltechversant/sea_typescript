import 'react-native-gesture-handler'
import React, {useContext, useEffect} from 'react'
import {NavigationContainer,useTheme} from '@react-navigation/native';
import MainStack from './src/stack/MainStack';
import notifee, {EventDetail, EventType} from '@notifee/react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import colorPalette from './src/assets/colorPalette/colorPalette';
import ColorThemeContext, {
  ColorThemeContextAPI,
} from './src/context/ColorThemeContext';
import {Appearance} from 'react-native';
import ScreenContextProvider from './src/context/ScreenContextProvider';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import Echart from './src/screens/echarts';
import BackgroundTask from './src/screens/modules/backgroundActions';
import RecaptchaTest from './src/screens/modules/recaptch';
import WebViews from './src/screens/webView/sample';


// type NotificationParameters = {
//   type:EventType;
//   details:EventDetail
// }

const App: React.FC = () => {
  // Orientation.lockToPortrait()
  // Orientation.unlockAllOrientations()
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
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
};
function ThemeProviderWrapper() {
  const {theme, setTheme} = useContext(ColorThemeContextAPI);
  const activeColor = theme === 'dark' ? colorPalette.dark : colorPalette.light;
  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });
  const {colors} = useTheme();

  return (
    <Provider store={store}>
      <ScreenContextProvider>
        <NavigationContainer theme={activeColor}>
          <PaperProvider>
            <MainStack />
            {/* <Echart  /> */}
            {/* <BackgroundTask /> */}
            {/* <RecaptchaTest /> */}
            {/* <WebViews  /> */}
            <FlashMessage position="top" />
          </PaperProvider>
        </NavigationContainer>
      </ScreenContextProvider>
    </Provider>
  );
}

export default App;
