import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Data from '../../screens/data'
import GeoLoaction from '../../screens/GeoLocation'
import Editor from '../../screens/Imageditor'
import SampleChart from '../../screens/chart'


const Drawer = createDrawerNavigator()
export default function DrawerStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='data' component={Data} />
            <Drawer.Screen name='GeoLoaction' component={GeoLoaction} />
            <Drawer.Screen name='Editor' component={Editor} />
            <Drawer.Screen name='chart' component={SampleChart} />
        </Drawer.Navigator>
    )
}