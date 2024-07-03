import { Appearance } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../screens/Home'
import DrawerStack from '../Drawer'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import { RootStackParams } from '../MainStack'
import Homelogo from '../../assets/images/home.svg'
import Codelogo from '../../assets/images/code.svg'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native'
import Screen2 from '../../screens/screen2'
import CustomTabBar from './customTabBar'

const Stack = createNativeStackNavigator()
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='drawer' component={DrawerStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


const Tab = createBottomTabNavigator<RootStackParams>()
export default function TabStack({ navigation }: any) {
  const deviceTheme = Appearance.getColorScheme()
  const { t } = useTranslation()
  const { colors } = useTheme()
  return (

    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background, borderWidth: 2, elevation: 6, shadowColor: colors.text },
        headerStyle: { backgroundColor: colors.background, },
        headerShown: false,
        headerShadowVisible: false, tabBarHideOnKeyboard: true, tabBarBadgeStyle: { backgroundColor: 'red' },

      }}
    >
      <Tab.Screen name={t('home')} component={Home}
      />
      <Tab.Screen name={t('tasks')} component={HomeStack}  />
      <Tab.Screen name='screen2' component={Screen2} />
    </Tab.Navigator>
  )
}