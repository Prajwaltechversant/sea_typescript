import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabStack from '../Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerStack from '../Drawer'

const Stack = createNativeStackNavigator()
export default function MainStack() {

    type a = {
        a:string
    }

    return (
        <Stack.Navigator>
            {/* <Stack.Screen name='drawer' component={DrawerStack}  /> */}
            <Stack.Screen name='tabs' component={TabStack} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}