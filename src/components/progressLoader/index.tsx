import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, Dimensions, Text} from 'react-native';
import styles from './style';
import {Circle, G, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {log} from 'console';

const {height, width} = Dimensions.get('screen');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  progress: number;
  time?: any;
}

const ProgressLoader: React.FC<Props> = ({progress, time}) => {
  const {colors} = useTheme();
  const style = styles(colors, height);
  const circumference = 900;
  const R = circumference / (2 * Math.PI);
  const strokeWidth = 15;
  const half_Circle = R + strokeWidth;
  const diameter = half_Circle * 2;
  const progressValue = useSharedValue(progress);


  // const endPosition = useDerivedValue(() => {
  //   const angle = 2 * Math.PI * progressValue.value - Math.PI / 2;
  //   return x.value = half_Circle + Math.cos(angle)*R
  //   // return {

  //   //   x: half_Circle + Math.cos(angle) * R,
  //   //   y: half_Circle + Math.sin(angle) * R,
  //   // };
  // },[progress]);

  // useMemo(() => {

  //   const angle = 2 * Math.PI * progressValue.value - Math.PI / 2;
  //   console.log('====================================');
  //   console.log(angle);
  //   console.log('====================================');
  //   x.value = half_Circle + Math.cos(angle)*R;
  //   y.value = half_Circle + Math.sin(angle) * R;
  // }, [progressValue.value]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress),
    };
  }, [progress]);



  return (
    <View style={style.container}>
      <View style={{position: 'absolute'}}>
        <Text style={{fontSize: 25, color: colors.text}}>{time}</Text>
      </View>
      <Svg
        rotation={360}
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}>
        <G origin={`${half_Circle},${half_Circle}`} rotation={'-90'}>
          <Circle
            r={R}
            strokeWidth={strokeWidth}
            fill={'transparent'}
            cx={'50%'}
            cy={'50%'}
            stroke={'gray'}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeOpacity={0.1}
          />
          <AnimatedCircle
            animatedProps={animatedProps}
            r={R}
            strokeWidth={strokeWidth}
            fill={'transparent'}
            cx={'50%'}
            cy={'50%'}
            stroke={progress >= 0.75 ? 'green' : colors.text}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeOpacity={1}
            strokeLinejoin="bevel"
          />
          {/* <AnimatedCircle
            r={10}
            fill={'blue'}

          /> */}
        </G>
      </Svg>
    </View>
  );
};

export default React.memo(ProgressLoader);
