import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import TabStack from '../Tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ResultView from '../../screens/webView';
import Login from '../../screens/Login';
import GradientClock from '../../screens/GradientClock';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export type RootStackParams = {
  TabStack: {
    Login: undefined;
    Home: undefined;
    Tasks: undefined;
    TrackPlayer: undefined;
    Profile: undefined;
  };
  ResultView: {
    url: string;
  };
};

export default function MainStack() {
  const {colors} = useTheme();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // if (initializing) return <GradientClock />;

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: colors.background,
        headerShown: false,
      }}>

      {!user ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <>
          <Stack.Screen
            name="TabStack"
            component={TabStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ResultView" component={ResultView} />
        </>
      )}
    </Stack.Navigator>
  );
}
