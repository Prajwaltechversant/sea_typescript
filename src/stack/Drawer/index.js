import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Data from '../../screens/data'
import GeoLoaction from '../../screens/GeoLocation'
import Editor from '../../screens/Imageditor'
import SampleChart from '../../screens/chart'
import UiSamples from '../../screens/ui'
import Languages from '../../screens/language'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colorPalette from '../../assets/colorPalette/colorPalette'
import { Dropdown } from 'react-native-element-dropdown';
import DropdownComponent from '../../components/dropdownLn'
import DropdownLn from '../../components/dropdownLn'


const Drawer = createDrawerNavigator()
export default function DrawerStack() {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name='data' component={Data} />
            <Drawer.Screen name='GeoLoaction' component={GeoLoaction} />
            <Drawer.Screen name='Editor' component={Editor} />
            <Drawer.Screen name='Chart' component={SampleChart} />
            <Drawer.Screen name='UiSamples' component={UiSamples}
            // options={{
            //     headerShown:false
            // }}
            />

            <Drawer.Screen name='Languages' component={Languages} 
            options={{
                headerRight: () => (
                    <View style={{ marginRight: 20 }}>
                        <DropdownLn/>
                    </View>
                ),
            }}
             />
        </Drawer.Navigator>
    )
}