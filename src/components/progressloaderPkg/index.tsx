import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export default function CircleProgressBar() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <ProgressBar />
      
    </View>
  );
}
