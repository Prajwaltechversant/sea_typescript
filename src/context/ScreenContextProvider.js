import { useWindowDimensions, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { isTablet } from 'react-native-device-info';

const ScreenContext = React.createContext()

export const useScreenContext = () => useContext(ScreenContext);

export default function ScreenContextProvider({ children }) {
    const dimensions = useWindowDimensions()

    // screen dimentions
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const scale = Dimensions.get('window').scale;
    const fontScale = Dimensions.get('window').fontScale;

    // portrait / land

    const isPortrait = height > width;

    let isTabletType = isTablet()

    // states for dimentions
    const [windowWidth, setWindowWidth] = useState(width);
    const [windowHeight, setWindowHeight] = useState(height);
    const [windowScale, setWindowscale] = useState(scale);
    const [windowFontScale, setWindowFontScale] = useState(fontScale);
    const [windowisPortrait, setWindowisPortrait] = useState(isPortrait)


    function setDimensions() {
        const { height, width, scale, fontScale } = dimensions;
        const modPortrait = height > width;

        setWindowHeight(height)
        setWindowWidth(width);
        setWindowFontScale(fontScale)
        setWindowscale(scale)
        setWindowisPortrait(modPortrait)
    }

    useEffect(() => {
        setDimensions()
    }, [dimensions])
console.log(windowisPortrait)
    return (
        <ScreenContext.Provider
            value={{ windowHeight, windowWidth, windowFontScale, windowScale, windowisPortrait, isTabletType }}>
            {children}
        </ScreenContext.Provider >

    )
}