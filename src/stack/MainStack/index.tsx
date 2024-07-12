import React from 'react'
import {  useTheme } from '@react-navigation/native'
import TabStack from '../Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ResultView from '../../screens/webView'
import Login from '../../screens/Login'

const Stack = createNativeStackNavigator()

export type RootStackParams = {
    TabStack: {
        Login:undefined;
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
    const { colors } = useTheme()

    return (
        <Stack.Navigator screenOptions={{
            statusBarColor: colors.background,
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login}  />
            <Stack.Screen name='TabStack' component={TabStack} options={{
                headerShown: false
            }} />
            <Stack.Screen name='ResultView' component={ResultView} />
        </Stack.Navigator>
    )
}