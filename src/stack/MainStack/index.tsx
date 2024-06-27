import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import TabStack from '../Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerStack from '../Drawer'
import ResultView from '../../screens/webView'
import { ColorThemeContextAPI } from '../../context/ColorThemeContext'
import colorPalette from '../../assets/colorPalette/colorPalette'

const Stack = createNativeStackNavigator()

export type RootStackParams = {
    TabStack: undefined,
    ResultView: {
        url: string
    }
}

export default function MainStack() {

    type a = {
        a: string
    }
  const {theme, setTheme}  = useContext(ColorThemeContextAPI)
  // Appearance.addChangeListener((scheme) => {
  //     setTheme(scheme.colorScheme)
  // })
//   let colors = theme === 'dark' ? colorPalette.dark : colorPalette.light

const {colors} = useTheme()

    return (
        <Stack.Navigator screenOptions={{
            statusBarColor:colors.background
        }}>
            {/* <Stack.Screen name='drawer' component={DrawerStack}  /> */}
            <Stack.Screen name='TabStack' component={TabStack} options={{
                headerShown: false
            }} />
            <Stack.Screen name='ResultView' component={ResultView} />
        </Stack.Navigator>
    )
}