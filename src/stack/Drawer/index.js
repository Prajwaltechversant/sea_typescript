import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Data from '../../screens/data'


const Drawer = createDrawerNavigator()
export default function DrawerStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen  name='data' component={Data}  />
        </Drawer.Navigator>
    )
}