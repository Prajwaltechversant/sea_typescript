import { View, Text, ImageBackground,Button } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';
import { BlurView } from "@react-native-community/blur";
import HomeIcon from '../../assets/images/home.svg';
import { Circle, Svg } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Logo from '../../assets/images/logo.svg';

export default function UiSamples() {
    const skew = useSharedValue(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         skewX.value = withTiming(skewX.value + 30, { duration: 1000 });
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, [skewX]);


    // const btnPress = () =>{
    //     skewY.value + 30
    // }
    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [{ skewX: `0deg` }],
    //     };
    // });

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
        //     <HomeIcon width={30} height={30} color={'red'} />
        //     <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', position: 'absolute', transform: [{ translateX: -50, }] }}>Hello World</Text>
        // </ImageBackground>

        <View style={styles.container}>
            {/* <Svg>
                <Circle x={50} y={50} r={20} fill={'green'} />
            </Svg> */}
            <Animated.View   style={{transform:[{skewY:'160deg'}]}}>
                <Logo width={250} height={250} />
            </Animated.View>
            {/* <Button title='skew' onPress={btnPress} /> */}
        </View>
    );
}
