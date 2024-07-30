import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  UIManager,
  LayoutAnimation,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import {TextInput} from 'react-native-paper';
// import Logo from '../../assets/images/logo.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useOrientationChange} from 'react-native-orientation-locker';
import GradientClock from '../GradientClock';
import Clipboard from '@react-native-clipboard/clipboard';
import Entypo from 'react-native-vector-icons/Entypo';
import emailValidator from '../../validation/validation';
import auth from '@react-native-firebase/auth';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Login({navigation}: any) {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  const [resetPassword, setResetPassword] = useState(false);

  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(true);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const zoomValue = useRef(new Animated.Value(1)).current;

  type Input = {
    email: string | null;
    pwd: string | null;
  };

  const [loginData, setLoginData] = useState<Input>({
    email: '',
    pwd: null,
  });

  const zoomAnimation = () => {
    Animated.sequence([
      Animated.timing(zoomValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(zoomValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useOrientationChange(o => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // zoomAnimation()
  });

  // console.log(
  //   screenContext.windowWidth < screenContext.windowHeight ? true : false,
  // );
  // if (!loading) {
  //   return <GradientClock />;
  // }

  const copyToClipboard = () => {
    const {email} = loginData;

    if (email) {
      Clipboard.setString(email);
    }
  };

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const signup = async () => {
    const {pwd, email} = loginData;

    if (!email || !pwd) {
      Alert.alert('Please Add the details');
    } else {
      if (await emailValidator(email)) {
        try {
          await auth().createUserWithEmailAndPassword(email, pwd);
          setIsLogin(!isLogin);
        } catch (err) {
          console.log(err.message);
          Alert.alert(err.message);
        }
      } else {
        console.log('Invalid email id');
      }
    }
  };

  const login = async () => {
    const {pwd, email} = loginData;

    if (!email || !pwd) {
      Alert.alert('Please Add the details');
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, pwd);

        navigation.replace('TabStack');
      } catch (err) {
        console.log(err.message);
        Alert.alert(err.message);
      }
    }
  };

  const forgotPassword = async () => {
    const {email} = loginData;
    if (!email) {
      Alert.alert('Please Add the details');
    } else {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Please Check Your Mail');
        // await auth().verifyPasswordResetCode
        setIsLogin(true);
        setResetPassword(!resetPassword);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={screenStyles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        viewIsInsideTabBar
        showsVerticalScrollIndicator={false}>
        <View style={[screenStyles.container]}>
          <View style={screenStyles.logoContainer}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={screenStyles.logoImage}
              alt="logo"
            />
          </View>
          <View style={screenStyles.formContainer}>
            <TextInput
              mode="outlined"
              label={'email'}
              onChangeText={e => setLoginData({...loginData, email: e})}
            />
            {!resetPassword && (
              <TextInput
                mode="outlined"
                label={'password'}
                secureTextEntry={showPassword}
                onChangeText={e => setLoginData({...loginData, pwd: e})}
                right={
                  <TextInput.Icon icon={'eye'} onPress={showPasswordToggle} />
                }
              />
            )}
            {isLogin && !resetPassword ? (
              <TouchableOpacity style={screenStyles.btn} onPress={login}>
                <Text style={screenStyles.btnText}>Login</Text>
              </TouchableOpacity>
            ) : resetPassword ? (
              <TouchableOpacity
                style={screenStyles.btn}
                onPress={forgotPassword}>
                <Text style={screenStyles.btnText}>Send reset link</Text>
              </TouchableOpacity>
            ) : (
              !isLogin &&
              !resetPassword && (
                <TouchableOpacity style={screenStyles.btn} onPress={signup}>
                  <Text style={screenStyles.btnText}>Create Account</Text>
                </TouchableOpacity>
              )
            )}
            {!resetPassword && (
              <TouchableOpacity
                style={screenStyles.forgotBtn}
                onPress={() => setResetPassword(!resetPassword)}>
                <Text style={[screenStyles.btnText, {textAlign: 'center'}]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={screenStyles.createBtn}
            onPress={() => {
              setIsLogin(!isLogin);
              setResetPassword(false);
            }}>
            <Text style={screenStyles.createBtnText}>
              {isLogin ? 'Create Account' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}
