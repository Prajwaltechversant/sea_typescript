import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, UIManager, LayoutAnimation } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import { useScreenContext } from '../../context/ScreenContextProvider';
import styles from './style';
import { TextInput } from 'react-native-paper';
import Logo from '../../assets/images/logo.svg';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useOrientationChange } from 'react-native-orientation-locker';
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default function Login({ navigation }: any) {
    const { colors } = useTheme();
    const screenContext = useScreenContext();
    const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
    const screenStyles = styles(screenContext, screenContext[isPortrait ? 'windowWidth' : 'windowHeight'], screenContext[isPortrait ? 'windowHeight' : 'windowWidth'], colors);

    const zoomValue = useRef(new Animated.Value(1)).current
    
  const zoomAnimation = () => {
    Animated.sequence([
      Animated.timing(zoomValue, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.spring(zoomValue, { toValue: 1, friction: 4, useNativeDriver: true })
    ]).start();
  };

    useOrientationChange((o) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        // zoomAnimation()
    })


console.log(screenContext.windowWidth<screenContext.windowHeight ? true : false)
    return (
        <KeyboardAvoidingView
            style={screenStyles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} viewIsInsideTabBar showsVerticalScrollIndicator={false}>
                <View style={[screenStyles.container,]}>
                    <View style={screenStyles.languageSections}>
                        <Text style={{ textAlign: 'center' }}>Language</Text>
                    </View>
                    <View style={screenStyles.logoContainer}>
                        <Image source={require('../../assets/images/icon.png')} style={screenStyles.logoImage} alt='logo' />
                    </View>
                    <View style={screenStyles.formContainer}>
                        <TextInput
                            mode='outlined'
                            placeholder='username, email or mobile number'
                        />
                        <TextInput
                            mode='outlined'
                            placeholder='username, email or mobile number'
                        />
                        <TouchableOpacity style={screenStyles.btn} onPress={() => navigation.replace('TabStack')}>
                            <Text style={screenStyles.btnText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={screenStyles.forgotBtn}>
                            <Text style={[screenStyles.btnText, { textAlign: 'center' }]}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={screenStyles.createBtn}>
                        <Text style={screenStyles.createBtnText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    );
}
