
import {
  Alert,
  KeyboardAvoidingView,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import { useScreenContext } from '../../context/ScreenContextProvider';
import styles from './style';
import DatePickerComponent from '../../components/datePicker';
import { Checkbox, TextInput } from 'react-native-paper';
import { useOrientationChange } from 'react-native-orientation-locker';
import { Form } from '.';
const MemoTextInput = React.memo(TextInput);


const AddressInput: React.FC<{
    addressType: 'permanentAddress' | 'temporaryAddress';
    formData: Form;
    handleInputChange: (field: keyof Form, value: any, subField?: string) => void;
    screenStyles: any;
    checked?: boolean;
  }> = ({ addressType, formData, handleInputChange, screenStyles, checked }) => {
    return (
      <>
        <MemoTextInput
          label="address"
          value={checked ? formData.permanentAddress.address?.toString() : formData[addressType].address?.toString()}
          onChangeText={value => handleInputChange(addressType, value, 'address')}
          mode="outlined"
          readOnly={checked ? true : false}
          style={screenStyles.inputContainer}
        />
        <MemoTextInput
          label="city"
          value={checked ? formData.permanentAddress.city?.toString() : formData[addressType].city?.toString()}
          onChangeText={value => handleInputChange(addressType, value, 'city')}
          mode="outlined"
          readOnly={checked ? true : false}
          style={screenStyles.inputContainer}
        />
        <MemoTextInput
          label="state"
          value={checked ? formData.permanentAddress.state?.toString() : formData[addressType].state?.toString()}
          onChangeText={value => handleInputChange(addressType, value, 'state')}
          mode="outlined"
          readOnly={checked ? true : false}
          style={screenStyles.inputContainer}
        />
        <MemoTextInput
          label="country"
          value={checked ? formData.permanentAddress.country?.toString() : formData[addressType].country?.toString()}
          onChangeText={value => handleInputChange(addressType, value, 'country')}
          mode="outlined"
          readOnly={checked ? true : false}
          style={screenStyles.inputContainer}
        />
        <MemoTextInput
          label="pincode"
          value={checked ? formData.permanentAddress.pincode?.toString() : formData[addressType].pincode?.toString()}
          onChangeText={value => handleInputChange(addressType, value, 'pincode')}
          mode="outlined"
          readOnly={checked ? true : false}
          style={screenStyles.inputContainer}
        />
      </>
    );
  };
  

  export default  AddressInput