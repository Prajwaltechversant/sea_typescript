import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import {
  Canvas,
  RadialGradient,
  Rect,
  SweepGradient,
  TwoPointConicalGradient,
  vec,
} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const GradientClock = () => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[
      screenContext.windowisPortrait ? 'windowWidth' : 'windowHeight'
    ],
    screenContext[
      screenContext.windowisPortrait ? 'windowHeight' : 'windowWidth'
    ],
    colors,
  );

  const {height, width} = Dimensions.get('screen');
  const centerX = width / 2;
  const centerY = height / 2;
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useDerivedValue(() => {
    return [{rotate: rotation.value * Math.PI}];
  }, [rotation]);

  const centerZ = vec(centerX, centerY);

  return (
    <View style={screenStyles.container}>
      <Canvas style={screenStyles.container}>
        <Rect x={0} y={0} width={width} height={height}>
          <SweepGradient
            c={centerZ}
            colors={['transparent', 'black']}
            start={0}
            end={360}
            origin={centerZ}
            transform={animatedStyle}
          />
          {/* <RadialGradient
            c={centerZ}
            r={128}
          colors={["black", "white"]}
          transform={animatedStyle}
          origin={centerZ}

        /> */}
          {/* <TwoPointConicalGradient
          start={vec(128, 128)}
          startR={360}
          end={vec(128, 16)}
          endR={16}
          colors={["blue", "yellow"]}
          transform={animatedStyle}
          origin={centerZ}

        /> */}
        </Rect>
      </Canvas>

    </View>
  );
};

export default GradientClock;
