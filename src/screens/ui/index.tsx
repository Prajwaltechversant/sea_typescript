import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import styles from './style'
import { BlurView } from "@react-native-community/blur";

export default function UiSamples() {
    return (
        <ImageBackground
            //  source={require('../../assets/images/bg.jpg')} 
            // source={require('../../assets/images/bg2.jpg')} 
            source={require('../../assets/images/bg3.jpg')}

            style={styles.container}>
            <BlurView
                style={styles.cardContainer}
                blurType='light'
                blurAmount={20}
                reducedTransparencyFallbackColor="black"
                blurRadius={10}

            >
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Hello World</Text>
            </BlurView>


            <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', position: 'absolute', transform: [{ translateX: -50, }] }}>Hello World</Text>



        </ImageBackground>
    )
}