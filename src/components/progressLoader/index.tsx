import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Dimensions} from 'react-native';
import styles from './style';
import {Circle, G, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  progress: number;
}

const ProgressLoader: React.FC<Props> = ({progress}) => {
  const {colors} = useTheme();
  const style = styles(colors, height);
  const circumference = 900;
  const R = circumference / (2 * Math.PI);
  const strokeWidth = 9;
  const half_Circle = R + strokeWidth;
  const diameter = half_Circle * 2;

  const progressValue = useSharedValue(progress);

  const endPosition = useDerivedValue(() => {
    const angle = Math.PI * progressValue.value - Math.PI ;
    return {
      x: half_Circle + Math.cos(angle) * R,
      y: half_Circle + Math.sin(angle) * R,
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      // strokeDashoffset: withSpring(circumference * (1 - progress)),
      strokeDashoffset:circumference * (1 - progress)

    };
  }, [progress]);

  return (
    <View style={style.container}>
      <Svg
        rotation={360}
        width={R * 2}
        height={R * 2}
        viewBox={`0 0 ${half_Circle * 2} ${half_Circle * 2}`}>
        <G origin={`${half_Circle},${half_Circle}`} rotation={'-90'}>
          <AnimatedCircle
            animatedProps={animatedProps}
            r={R}
            strokeWidth={strokeWidth}
            fill={progress !== 1 ? 'transparent' : colors.text}
            cx={'50%'}
            cy={'50%'}
            stroke={progress >= 0.75 ? 'green' : colors.text}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeOpacity={1}
            strokeLinejoin="bevel"
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
            strokeOpacity={0.1}
          />

          <Circle
            cx={endPosition.value.x}
            cy={endPosition.value.y}
            r={strokeWidth / 2}
            fill={'red'}
          />
        </G>
      </Svg>
    </View>
  );
};

export default React.memo(ProgressLoader);
