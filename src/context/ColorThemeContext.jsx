import { View, Text, Appearance } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import colorPalette from '../assets/colorPalette/colorPalette'

export const ColorThemeContextAPI = React.createContext()

export default function ColorThemeContext({ children }) {

    const [theme, setTheme] = useState(Appearance.getColorScheme())
    
    // const [activeColors, setActiveColors] = useState(colorPalette[theme])

    return (
        <ColorThemeContextAPI.Provider value={{ theme, setTheme }}>
            {children}
        </ColorThemeContextAPI.Provider>
    )
}



