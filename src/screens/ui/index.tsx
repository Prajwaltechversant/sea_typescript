import { View } from 'react-native';
import React from 'react';
import styles from './style';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

export default function UiSamples() {
    const keyframe = new Keyframe({
        0: {
            transform: [{ rotate: '0deg' }],
        },
        45: {
            transform: [{ rotate: '100deg' }],
            easing: Easing.exp,
        },
        100: {
            transform: [{ rotate: '45deg' }],
        },
    });

    return (
        <View style={styles.container}>
            <Animated.View
                entering={keyframe.duration(3000).delay(200)}
                style={{ width: 150, height: 150, backgroundColor: 'green', position:'static' }}
            />
            <Animated.View
                entering={keyframe.duration(3000).delay(200)}
                style={{ width: 150, height: 150, backgroundColor: 'green',position:'static' }}
            />
        </View>
    );
}
