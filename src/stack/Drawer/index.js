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
import Users from '../../screens/redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Echart from '../../screens/echarts'
import RecaptchaTest from '../../screens/modules/recaptch'
import BackgroundTask from '../../screens/modules/backgroundActions'
import WebViews from '../../screens/webView/sample'
import VideoStream from '../../screens/video/index'
import Timer from '../../screens/Timer/index'
import OnBoardUser from '../../screens/onBoard'

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
                        <Entypo name='menu' size={25} color={colors.text} style={{ marginLeft: 15 }} />
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
                        <Entypo name='home' color={colors.text} size={25} />
                    ),
                }}
            />
            <Drawer.Screen name={t('geolocation')} component={GeoLoaction}
                options={{
                    drawerIcon: ({size}) => (
                        <Entypo name='map' color={colors.text} size={25} />
                    ),

                }}

            />
            <Drawer.Screen name={t('editor')} component={Editor} options={{
                headerShown: false, drawerIcon: () => (
                    <AntDesign name='edit' color={colors.text} size={25} />
                ),
            }}


            />
            <Drawer.Screen name={t('chart')} component={SampleChart}

                options={{
                    drawerIcon: () => (
                        <AntDesign name='areachart' color={colors.text} size={25} />
                    ),

                }}

            />
            <Drawer.Screen name={t('uiSample')} component={UiSamples}
                options={{
                    drawerIcon: () => (
                        <Entypo name='dot-single' color={colors.text} size={25} />
                    ),

                }}

            />
            <Drawer.Screen name={t('header')} component={Languages}
                options={{
                    headerRight: () => (
                        <View style={{ marginRight: 20 }}>
                            <DropdownLn />
                        </View>
                    ),
                    drawerIcon: () => (
                        <Entypo name='language' color={colors.text} size={25} />
                    ),
                }}
            />
            <Drawer.Screen name={t('ThreeDSample')} component={ThreeDSample}
                options={{
                    drawerIcon: () => (
                        <AntDesign name='antdesign' color={colors.text} size={25} />
                    ),

                }}

            />
            <Drawer.Screen name='ParallaxScroll' component={ParallaxScroll}
                options={{
                    drawerIcon: () => (
                        <AntDesign name='antdesign' color={colors.text} size={25} />
                    ),

                }}

            />
            <Drawer.Screen name='Download' component={Downloads}

                options={{
                    drawerIcon: () => (
                        <Entypo name='download' color={colors.text} size={25} />
                    ),

                }}
            />
            <Drawer.Screen name='layoutAnimations' component={LayoutAnimations} options={{
                drawerIcon: () => (
                    <AntDesign name='layout' color={colors.text} size={25} />
                ),
                title: "Layouts",

            }} />
            <Drawer.Screen name='layoutSample' component={Layout2} options={{
                drawerIcon: () => (
                    <AntDesign name='layout' color={colors.text} size={25} />
                ),
                title: "Layouts 2",

            }} />
            <Drawer.Screen name='Users' component={Users} options={{
                drawerIcon: () => (
                    <FontAwesome name='group' color={colors.text} size={25} />
                ),
                title: "redux thunk",

            }} />
            <Drawer.Screen name='Echart' component={Echart} options={{
                drawerIcon: () => (
                    <FontAwesome name='line-chart' color={colors.text} size={25} />
                ),
                title: "E chart",

            }} />
            <Drawer.Screen name='recaptch' component={RecaptchaTest} options={{

                title: "re captch",
                drawerIcon: () => (
                    <AntDesign name='layout' color={colors.text} size={25} />
                ),

            }} />
            <Drawer.Screen name='bgTask' component={BackgroundTask} options={{

                title: "Background Actions",
                drawerIcon: () => (
                    <AntDesign name='doubleright' color={colors.text} size={25} />
                ),

            }} />
            <Drawer.Screen name='OnBaord' component={OnBoardUser} options={{
                drawerIcon: () => (
                    <AntDesign name='layout' color={colors.text} size={25} />
                ),
                title: "onboard animation",
                headerShown: false

            }} />
            <Drawer.Screen name='webViews' component={WebViews} options={{

                title: "web ",
                drawerIcon: () => (
                    <AntDesign name='codepen' color={colors.text} size={25} />

                ),

            }} />
            <Drawer.Screen name='Video' component={VideoStream} options={{
                drawerIcon: () => (
                    <AntDesign name='play' color={colors.text} size={25} />
                ),
                title: "Video Streaming",

                headerShown: false

            }} />
            <Drawer.Screen name='Timer' component={Timer} options={{
                drawerIcon: () => (
                    <AntDesign name='clockcircle' color={colors.text} size={25} />
                ),
                title: "Timer",
                headerShown: false

            }} />
        </Drawer.Navigator>
    )
}


