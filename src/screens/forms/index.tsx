import {
  Alert,
  KeyboardAvoidingView,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import InputBox from '../../components/InputElement';
import DatePickerComponent from '../../components/datePicker';
import {Checkbox} from 'react-native-paper';
import {useOrientationChange} from 'react-native-orientation-locker';
import {Button} from 'react-native';
import Education from './Education';

type Form = {
  name: string;
  dob: Date | undefined;
  age: number | null;
  temporaryAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number | null;
  };
  permanentAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number | null;
  };
  mobile: number | null;
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: Date | null;
    endDate: Date | null;
  };
};

const Forms: React.FC = () => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );

  const [checked, setChecked] = useState(false);

  const [addEducation, setAddEducation] = useState(false);

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<Form>({
    name: '',
    mobile: null,
    permanentAddress: {
      address: '',
      city: '',
      country: '',
      pincode: null,
      state: '',
    },
    temporaryAddress: {
      address: '',
      city: '',
      country: '',
      pincode: null,
      state: '',
    },
    dob: undefined,
    age: null,
    education: {
      degree: '',
      endDate: null,
      field: '',
      school: '',
      startDate: null,
    },
  });

  const handleInputChange = useCallback(
    (field: keyof Form, value: any, subField?: string, index?: number) => {
      setFormData(prevFormData => {
        if (
          field === 'permanentAddress' ||
          field === 'temporaryAddress' ||
          field === 'education'
        ) {
          return {
            ...prevFormData,
            [field]: {
              ...prevFormData[field],
              [subField!]: value,
            },
          };
        } else {
          return {
            ...prevFormData,
            [field]: value,
          };
        }
      });
    },
    [],
  );

  useEffect(() => {
    if (formData.dob) {
      const userAge = currentYear - formData.dob.getFullYear();
      setFormData(prevFormData => ({
        ...prevFormData,
        age: userAge,
      }));
    }
  }, [formData.dob, currentYear]);

  useOrientationChange(() => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear', property: 'scaleXY'},
      update: {type: 'spring', springDamping: 90},
      delete: {type: 'linear', property: 'opacity'},
    });
  });

  // const handleAddEducation = () => {
  //   setAddEducation(true);
  //   handleInputChange('education', '', '', formData.education);
  // };

  return (
    <ScrollView>
      <KeyboardAvoidingView enabled style={screenStyles.container}>
        <View id="content" style={screenStyles.contentContainer}>
          <InputBox
            label="Name"
            onChangeText={value => handleInputChange('name', value)}
            placeholder="Enter your name"
            value={formData.name}
          />
          <InputBox
            label="Mobile"
            onChangeText={value => handleInputChange('mobile', value)}
            placeholder="Enter your mobile number"
            value={formData.mobile?.toString() || ''}
          />
          <View style={screenStyles.inputContainer}>
            <DatePickerComponent
              setNewDate={value => handleInputChange('dob', value)}
            />
          </View>
          {formData.age !== null && (
            <View>
              <Text style={{color: colors.text, textAlign: 'left'}}>
                {formData.age} Years
              </Text>
            </View>
          )}

          <>
            <InputBox
              label="address"
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'address')
              }
              value={formData.permanentAddress.address}
            />
            <InputBox
              label="city"
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'city')
              }
              value={formData.permanentAddress.city}
            />
            <InputBox
              label="state"
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'state')
              }
              value={formData.permanentAddress.state}
            />
            <InputBox
              label="country"
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'country')
              }
              value={formData.permanentAddress.country}
            />
            <InputBox
              label="pincode"
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'pincode')
              }
              value={formData.permanentAddress.pincode}
            />
          </>
          <Checkbox.Item
            label="Copy Permanent address"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
          {!checked && (
            <>
              <InputBox
                label="address"
                onChangeText={value =>
                  handleInputChange('temporaryAddress', value, 'address')
                }
                value={
                  checked
                    ? formData.permanentAddress.address
                    : formData.temporaryAddress.address
                }
              />
              <InputBox
                label="city"
                onChangeText={value =>
                  handleInputChange('temporaryAddress', value, 'city')
                }
                value={
                  checked
                    ? formData.permanentAddress.city
                    : formData.temporaryAddress.city
                }
              />
              <InputBox
                label="state"
                onChangeText={value =>
                  handleInputChange('temporaryAddress', value, 'state')
                }
                value={formData.permanentAddress.state}
              />
              <InputBox
                label="country"
                onChangeText={value =>
                  handleInputChange('temporaryAddress', value, 'country')
                }
                value={
                  checked
                    ? formData.permanentAddress.country
                    : formData.temporaryAddress.country
                }
              />
              <InputBox
                label="pincode"
                onChangeText={value =>
                  handleInputChange('temporaryAddress', value, 'pincode')
                }
                value={
                  checked
                    ? formData.permanentAddress.pincode
                    : formData.temporaryAddress.pincode
                }
              />
            </>
          )}

          <Text>Education</Text>
          <Button title="Add Education" onPress={() => setAddEducation(true)} />
          {addEducation && <Education />}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default React.memo(Forms);
