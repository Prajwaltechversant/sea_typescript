import { View, Text, Easing, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Circle, G, Svg } from 'react-native-svg';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Props {
    progress: number
}

export default function Loader({ progress }: Props) {

    const circumference = 200;
    const R = circumference / (2 * Math.PI)
    const strokeWidth = 10;
    const half_circle = R + strokeWidth
    const diameter = half_circle * 2

    // animation values

    const progressValue = useSharedValue(0)
    const rotation = useSharedValue(0)

    const loadingAnimation = () => {
        progressValue.value = withTiming(0.6, { duration: 1000 })
        progressValue.value = withRepeat(
            withRepeat(
                withTiming(0.7, { duration: 800 }),
                withTiming(0.1, { duration: 2000 })
            ), -1, true
        )
        rotation.value = withRepeat(
            withTiming(360, { duration: 900 }), -1, false
        )
    }


    useEffect(() => {
        loadingAnimation()
    }, [])


    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - progressValue.value)
        }
    }, [progressValue.value])

    const animatedViewStyle = useAnimatedStyle(()=>{
        return{
            transform:[{rotate:rotation.value+'deg'}]
        }

    },[])
    
const height = Dimensions.get('screen').height
    return (
        <View style={{justifyContent:'center', alignItems:'center', transform:[{translateY:height/4}]}}>
            <Animated.View style={animatedViewStyle}>
                <Svg width={diameter} height={diameter}>
                    <G
                        origin={`${half_circle},${half_circle}`}
                    rotation={0}
                    >
                        <AnimatedCircle
                            animatedProps={animatedProps}
                            fill={'transparent'}
                            stroke={'white'}
                            r={R}
                            cx={'50%'}
                            cy={'50%'}
                            strokeWidth={strokeWidth}
                            strokeLinecap='round'
                            strokeDasharray={circumference}
                        />
                        <Circle
                            fill={'transparent'}
                            stroke={'white'}
                            r={R}
                            cx={'50%'}
                            cy={'50%'}
                            strokeWidth={strokeWidth}
                            strokeLinecap='round'
                            strokeDasharray={circumference}
                            // strokeDashoffset={circumference * (1 - 0.6)}
                            strokeOpacity={0.2}
                        />
                    </G>
                </Svg>
            </Animated.View>
        </View>
    )
}