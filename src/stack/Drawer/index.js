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
import { useTranslation } from 'react-i18next'
import ChangeTheme from '../../components/Theme'
import { useTheme } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import ThreeDSample from '../../screens/3d'

const Drawer = createDrawerNavigator()
export default function DrawerStack() {
    const { t } = useTranslation()

    let date = new Date()

    const { colors } = useTheme()

    return (
        <Drawer.Navigator


            screenOptions={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={25} color={colors.text} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
                headerStyle: { backgroundColor: colors.background, borderWidth: 2, elevation: 6, shadowColor: colors.text },

                drawerStyle: { backgroundColor: colors.background, elevation: 6, shadowColor: colors.text }
            , drawerStatusBarAnimation:'fade'
            
            })}

            drawerContent={(props) => <ChangeTheme props={props}

            />


            }

        >
            <Drawer.Screen name={t('data')} component={Data}
                options={{
                    headerTitleStyle: {
                        color: colors.text
                    },
                    drawerIcon: () => (
                        <Entypo name='home' color={colors.text} />
                    ),
                    // headerShown:false
                }}
            />
            <Drawer.Screen name={t('geolocation')} component={GeoLoaction}

            // options={{
            //     headerTitleStyle: {
            //         color: colors.text
            //     },
            //     drawerIcon: () => (
            //         <Entypo name='home' color={colors.text} />
            //     ),
            //     // headerShown:false
            // }}

            />
            <Drawer.Screen name={t('editor')} component={Editor} />
            <Drawer.Screen name={t('chart')} component={SampleChart} />
            <Drawer.Screen name={t('uiSample')} component={UiSamples}
            // options={{
            //     headerShown:false
            // }}
            />

            <Drawer.Screen name={t('header')} component={Languages}
                options={{
                    headerRight: () => (
                        <View style={{ marginRight: 20 }}>
                            <DropdownLn />
                        </View>
                    ),
                }}
            />

            <Drawer.Screen name={t('ThreeDSample')} component={ThreeDSample}
            
            
            
            />

        </Drawer.Navigator>
    )
}