import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabStack from '../Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerStack from '../Drawer'
import ResultView from '../../screens/webView'

const Stack = createNativeStackNavigator()

export type RootStackParams ={
    TabStack:undefined,
    ResultView:{
        url:string
    }
}

export default function MainStack() {

    type a = {
        a:string
    }

    return (
        <Stack.Navigator>
            {/* <Stack.Screen name='drawer' component={DrawerStack}  /> */}
            <Stack.Screen name='TabStack' component={TabStack} options={{
                headerShown: false
            }} />

            <Stack.Screen  name='ResultView' component={ResultView}  />
        </Stack.Navigator>
    )
}