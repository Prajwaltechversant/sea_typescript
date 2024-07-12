import {View, Text} from 'react-native';
import React from 'react';
import ReCaptcha from '../../../components/reCaptch';
import styles from './style';

export default function RecaptchaTest() {
  return (
    <View style={styles.container}>
      <ReCaptcha />
    </View>
  );
}
