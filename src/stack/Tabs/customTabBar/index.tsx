import React from 'react';
import { View, Text, Animated, TouchableOpacity, ToastAndroid, Easing, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useScreenContext } from '../../../context/ScreenContextProvider';
import { useTheme } from '@react-navigation/native';
import styles from './style';
import { useOrientationChange } from 'react-native-orientation-locker';




export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const screenContext = useScreenContext();
  const { colors } = useTheme();

  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(screenContext, screenContext[isPortrait ? 'windowWidth' : 'windowHeight'], screenContext[isPortrait ? 'windowHeight' : 'windowWidth'], colors);

  return (
    <View style={screenStyles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const tabLabel = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        let name;
        switch (route.name) {
          case 'Home':
            name = 'home';
            break;
          case 'tasks':
            name = 'plus';
            break;
          default:
            name = 'home';
        }

        const scaleValue = React.useRef(new Animated.Value(1)).current;
        const opacityValue = React.useRef(new Animated.Value(1)).current;
        const rotateValue = React.useRef(new Animated.Value(0)).current;


        const startScale = () => {
          Animated.sequence([
            Animated.timing(scaleValue, { toValue: 0.5, duration: 200, useNativeDriver: true }),
            Animated.spring(scaleValue, { toValue: 1, friction: 4, useNativeDriver: true })
          ]).start();
        };

        const startOpacityAnimation = () => {
          Animated.sequence([
            Animated.timing(opacityValue, { toValue: 0.1, duration: 200, useNativeDriver: true }),
            Animated.spring(opacityValue, { toValue: 1, friction: 4, useNativeDriver: true }),
          ]).start();
        };

        const startRotateAnimation = () => {
          Animated.sequence([
            Animated.timing(rotateValue, { toValue: 0.6, duration: 300, useNativeDriver: true, easing: Easing.ease }),
            Animated.spring(rotateValue, { toValue: 0, friction: 15, useNativeDriver: true, })
          ]).start();
        };

        const onPress = () => {
          navigation.navigate(route.name);
          if (!isFocused) {
            startScale();
            startOpacityAnimation();
            startRotateAnimation();
          }
        };

        const onLongPress = () => {
          if (!isFocused) {
            ToastAndroid.showWithGravityAndOffset(
              `navigate to ${route.name}`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        };

        const rotation = rotateValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
        
        useOrientationChange((e) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        })
        return (
          <TouchableOpacity
            key={route.key}
            style={[screenStyles.tabBarItem, { opacity: opacityValue }]}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {isFocused && <View style={{ borderWidth: 1, width: 50, marginBottom: 5, transform: [{ translateX: 0 }] }}></View>}

            <Animated.View style={[
              { transform: [{ scale: scaleValue }, { rotate: rotation }] },
              { backgroundColor: isFocused ? colors.primary : 'transparent', borderRadius: 50, padding: 5 },
              screenStyles.labelContainer
            ]}>
              <View style={screenStyles.iconContainerWrapper}>
                <Icon name={name} size={20} color={colors.text} />
                <Text style={screenStyles.labelText}>{tabLabel}</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
