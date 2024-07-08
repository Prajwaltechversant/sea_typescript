import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Data from '../../screens/data'
import GeoLoaction from '../../screens/GeoLocation'
import Editor from '../../screens/Imageditor'
import SampleChart from '../../screens/chart'
import UiSamples from '../../screens/ui'
import Languages from '../../screens/language'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DropdownLn from '../../components/dropdownLn'
import { useTranslation } from 'react-i18next'
import ChangeTheme from '../../components/Theme'
import { useTheme } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import ThreeDSample from '../../screens/3d'
import ParallaxScroll from '../../screens/parallax'
import Downloads from '../../screens/Downloads'
import LayoutAnimations from '../../screens/layoutAnimation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Layout2 from '../../screens/layoutSample'
import ButtonAnim from '../../screens/Login'
import Login from '../../screens/Login'

const Drawer = createDrawerNavigator()
export default function DrawerStack() {

    const { t } = useTranslation()
    let date = new Date()
    const { colors } = useTheme()

    return (
        <Drawer.Navigator
        initialRouteName='ParallaxScroll'
            screenOptions={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={25} color={colors.text} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),

                headerRight: () => (
                    <Text>{date.toDateString}</Text>
                ),
                headerStyle: { backgroundColor: colors.background },

                drawerStyle: { backgroundColor: colors.background, elevation: 6, shadowColor: colors.text }
                , drawerStatusBarAnimation: 'fade',

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
                }}
            />
            <Drawer.Screen name={t('geolocation')} component={GeoLoaction} />
            <Drawer.Screen name={t('editor')} component={Editor} options={{ headerShown: false }} />
            <Drawer.Screen name={t('chart')} component={SampleChart} />
            <Drawer.Screen name={t('uiSample')} component={UiSamples} />
            <Drawer.Screen name={t('header')} component={Languages}
                options={{
                    headerRight: () => (
                        <View style={{ marginRight: 20 }}>
                            <DropdownLn />
                        </View>
                    ),
                }}
            />
            <Drawer.Screen name={t('ThreeDSample')} component={ThreeDSample} />
            <Drawer.Screen name='ParallaxScroll' component={ParallaxScroll} />
            <Drawer.Screen name='Download' component={Downloads} />
            <Drawer.Screen name='layoutAnimations' component={LayoutAnimations} options={{
                drawerIcon: () => (
                    <AntDesign name='layout' color={colors.text} />
                ),
                title: "Layouts",

            }} />
            <Drawer.Screen name='layoutSample' component={Layout2} options={{
                drawerIcon: () => (
                    <AntDesign name='layout' color={colors.text} />
                ),
                title: "Layouts 2",

            }} />

        </Drawer.Navigator>
    )
}