import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useScreenContext } from '../../context/ScreenContextProvider';
import styles from './style';
import { TextInput } from 'react-native-paper';

interface Props {
  placeholder?: string;
  onChangeText: (value: any) => void;
  value: string | number | null;
  secureTextEntry?: boolean;
  label: string;
  style?: any;
}

const InputBox: React.FC<Props> = ({ label, onChangeText, placeholder, value, secureTextEntry, style }) => {
  const { colors } = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(screenContext, screenContext[isPortrait ? 'windowWidth' : 'windowHeight'], screenContext[isPortrait ? 'windowHeight' : 'windowWidth'], colors, style);

  return (
    <View style={screenStyles.container}>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        label={label}
        onChangeText={onChangeText}
        value={value?.toString()}
        secureTextEntry={secureTextEntry}
        style={screenStyles.inputContainer}
      />
    </View>
  );
};

export default InputBox;
