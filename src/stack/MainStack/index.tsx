import React, { useContext } from 'react'
import {  useTheme } from '@react-navigation/native'
import TabStack from '../Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ResultView from '../../screens/webView'
import { ColorThemeContextAPI } from '../../context/ColorThemeContext'

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
    const { theme, setTheme } = useContext(ColorThemeContextAPI)
    const { colors } = useTheme()

    return (
        <Stack.Navigator screenOptions={{
            statusBarColor: colors.background,
            headerShown: false
        }}>
            {/* <Stack.Screen name='drawer' component={DrawerStack}  /> */}
            <Stack.Screen name='TabStack' component={TabStack} options={{
                headerShown: false
            }} />
            <Stack.Screen name='ResultView' component={ResultView} />
        </Stack.Navigator>
    )
}