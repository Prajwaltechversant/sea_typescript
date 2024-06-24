import { View, Text, ImageBackground, EasingFunction } from 'react-native'
import React from 'react'
import styles from './style'
import { BlurView } from "@react-native-community/blur";
import HomeIcon from '../../assets/images/home.svg'

import { Circle, Svg  } from "react-native-svg";
import Animated, { useSharedValue } from 'react-native-reanimated';
export default function UiSamples() {

    const r = useSharedValue(20)





    return (
        // <ImageBackground
        //     //  source={require('../../assets/images/bg.jpg')} 
        //     // source={require('../../assets/images/bg2.jpg')} 
        //     source={require('../../assets/images/bg3.jpg')}

        //     style={styles.container}>
        //     <BlurView
        //         style={styles.cardContainer}
        //         blurType='light'
        //         blurAmount={20}
        //         reducedTransparencyFallbackColor="black"
        //         blurRadius={10}

        //     >
        //         <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Hello World</Text>
        //     </BlurView>

        //     <HomeIcon width={30} height={30}  color={'red'} />


        //     <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', position: 'absolute', transform: [{ translateX: -50, }] }}>Hello World</Text>



        // </ImageBackground>

        <View style={styles.container}>
            <Svg>
                <Circle x={50} y={50} r={20}  fill={'green'}  />
            </Svg>

        </View>
    )
}