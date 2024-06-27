import { View, Text, ImageBackground, Button, Appearance } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './style';
import { BlurView } from "@react-native-community/blur";
import HomeIcon from '../../assets/images/home.svg';
import { Circle, Svg } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Logo from '../../assets/images/logo.svg';
import DatePicker from 'react-native-date-picker'
import colorPalette from '../../assets/colorPalette/colorPalette';
import ColorThemeContext, { ColorThemeContextAPI } from '../../context/ColorThemeContext';
import { useTheme } from '@react-navigation/native';
export default function UiSamples() {
    const skew = useSharedValue(0);




    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const { theme, setTheme } = useContext(ColorThemeContextAPI)
    console.log(theme)
    // let colors = theme === 'dark' ? colorPalette.dark : colorPalette.light

    const { colors } = useTheme()
    console.log(colors)
    return (
        <View style={styles.container}>
            <View style={{ width: 200, height: 200, backgroundColor: colors.primary }}>

            </View>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Text style={{ color: 'black' }}>{date.toDateString()}</Text>
            <Button title="Dark" onPress={() => Appearance.setColorScheme('dark')} />
            <Button title="Light" onPress={() => Appearance.setColorScheme('light')} />
        </View>
    );
}
