import React, { useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, ToastAndroid } from 'react-native';
// import HomeLogo from '../../../assets/images/home.svg';
// import CodeLogo from '../../../assets/images/code.svg';
import styles from './style';

import Icon from 'react-native-vector-icons/AntDesign'
export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
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

        const scaleValue = useRef(new Animated.Value(1)).current

        const opacityValue = useRef(new Animated.Value(1)).current

        const startscale = () => {
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

        const onPress = () => {
          navigation.navigate(route.name);
          startscale()
          startOpacityAnimation()
        };

        const onLongPress = () => {
         if(!isFocused){
          ToastAndroid.showWithGravityAndOffset(
            `navigate to ${route.name}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
         }
        }


        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabBarItem, { backgroundColor: isFocused ? 'gray' : 'transparent', opacity: opacityValue }]}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Animated.View style={{ flexDirection: 'column', alignItems: 'center', transform: [{ scale: scaleValue }] }}>
              <Icon name={name} size={20} />
              <Text style={{ color: isFocused ? 'white' : 'black' }}>{tabLabel}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
