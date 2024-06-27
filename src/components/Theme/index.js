import { View, Text, Appearance, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Button } from 'react-native'
import ColorThemeContext, { ColorThemeContextAPI } from '../../context/ColorThemeContext'
import { Switch } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default function ChangeTheme({ props }) {

    const { theme, setTheme } = useContext(ColorThemeContextAPI)
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    // Appearance.setColorScheme('')

    // const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const { colors } = useTheme()

    console.log('====================================');
    console.log(theme);
    console.log('====================================');
    const changeTheme = () => {
        setIsSwitchOn(!isSwitchOn)
        if (theme === 'dark') {
            setTheme('light')
            Appearance.setColorScheme('light')

        } else {
            setTheme('dark')
            Appearance.setColorScheme('dark')

        }
    }
    return (
        <DrawerContentScrollView {...props} style={{height:'100%',}}>
            <DrawerItemList {...props} />
            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                {/* <Text style={{ color: colors.text }}>Change Theme</Text> */}
                {/* <Switch value={isSwitchOn} onValueChange={changeTheme} color={theme==='dark' ? 'white'  :'black'} thumbColor={theme==='dark' ? 'white'  :'black'}  /> */}
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: colors.text, borderRadius: 10, padding: 5 }}>
                    {
                        theme === 'dark' ?
                            <>
                                <TouchableOpacity onPress={changeTheme}>
                                    <MaterialIcons name='dark-mode' size={25} color={colors.text} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.text }}>{theme}</Text>
                            </>
                            :
                            <>
                                <Text style={{ color: colors.text }}>{theme}</Text>
                                <TouchableOpacity onPress={changeTheme}>
                                    <MaterialIcons name='sunny' size={25} color={colors.text} />
                                </TouchableOpacity>
                            </>

                    }

                </View>
            </View>
        </DrawerContentScrollView>
    )
}