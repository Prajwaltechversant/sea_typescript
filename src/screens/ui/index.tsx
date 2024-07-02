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
// import Icon from '../../assets/svg/icon.svg'
export default function UiSamples() {
    const skew = useSharedValue(0);




    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { theme, setTheme } = useContext(ColorThemeContextAPI)
    const { colors } = useTheme()
    return (
        <View style={styles.container}>
            {/* <Svg>
                <polygon />
            </Svg> */}
         
           
    
        </View>
    );
}
