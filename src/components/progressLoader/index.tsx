import { useTheme } from "@react-navigation/native"
import React from "react"
import { View, Dimensions, TextInput, StyleSheet } from "react-native"
import styles from "./style"
import { Circle, G, Svg, Text as SvgText, } from "react-native-svg"
import Animated, { useAnimatedProps, withSpring } from "react-native-reanimated"
import Success from './success.svg'
import { he } from "@faker-js/faker"

const { height, width } = Dimensions.get('screen')
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Props {
    progress: number
}

const ProgressLoader: React.FC<Props> = ({ progress }) => {

    const { colors } = useTheme()
    const style = styles(colors, height)
    const circumference = 500;
    const R = circumference / (2 * Math.PI);
    const strokeWidth = 20;
    const half_Circle = R + strokeWidth;
    const diameter = half_Circle * 2
    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: withSpring(circumference * (1 - progress))
        }
    }, [progress])


    return (
        <View style={style.container}>
            <Svg
                rotation={360}
                width={R * 2}
                height={R * 2}
                viewBox={`0 0 ${half_Circle * 2} ${half_Circle * 2}`}
            >
                {
                    progress < 1 ?
                        <G
                            origin={`${half_Circle},${half_Circle}`}
                            rotation={'-90'}
                        >

                            <AnimatedCircle

                                animatedProps={animatedProps}
                                r={R}
                                strokeWidth={strokeWidth}
                                fill={progress !== 1 ? 'transparent' : 'white'}
                                cx={'50%'}
                                cy={'50%'}
                                stroke={'white'}
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeOpacity={1}

                            />



                            <Circle
                                r={R}
                                strokeWidth={strokeWidth}
                                fill={'transparent'}
                                cx={'50%'}
                                cy={'50%'}
                                stroke={'white'}
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeOpacity={0.3}
                            />
                        </G>


                        :<Success x={half_Circle*2} y={half_Circle*2}  />

                }
                <SvgText
                    x={half_Circle}
                    y={half_Circle}
                    textAnchor="middle"
                    alignmentBaseline="center"
                    fill={'white'}
                    fontSize={20}
                >
                    {progress * 100}%
                </SvgText>
            </Svg>

        </View>
    )

}
export default React.memo(ProgressLoader)
