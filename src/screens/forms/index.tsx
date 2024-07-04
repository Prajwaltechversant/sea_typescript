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
import React, {useMemo, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import InputBox from '../../components/InputElement';
import DatePickerComponent from '../../components/datePicker';
import {Checkbox, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useOrientationChange } from 'react-native-orientation-locker';


const MemoTextInput = React.memo(TextInput)
type Form = {
  name: string;
  // lname: string;
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

  const [isDate, setisDate] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const currentYear = new Date().getFullYear();

  // console.log(currentYear)

  const [formData, setFormData] = useState<Form>({
    name: '',
    // lname: '',
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

  const handleInputChange = (
    field: keyof Form,
    value: any,
    subField?: string,
  ) => {
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
  };

  useMemo(() => {
    if (formData.dob) {
      let userAge = currentYear - formData?.dob?.getFullYear();
      setFormData(prevFormData => ({
        ...prevFormData,
        age: userAge,
      }));
    }
  }, [formData.dob]);

  
  useOrientationChange((o)=>{
    LayoutAnimation.configureNext({
        duration: 500,
        create: {type: 'linear', property: 'scaleXY'},
        update: {type: 'spring', springDamping:90},
        delete: {type: 'linear', property: 'opacity'},
      });    })

  return (
    <ScrollView
    
  
    >
      <KeyboardAvoidingView
        enabled
        style={screenStyles.container}
        // keyboardVerticalOffset={0}
      >
        {/* <View id="addNewBox" style={screenStyles.addBtnContainer}>
          <TouchableOpacity style={screenStyles.addbtn}>
            <Text style={{color: colors.text, fontSize: 15}}>
              Add New Details
            </Text>
          </TouchableOpacity>
        </View> */}

        <View id="content" style={screenStyles.contentContainer}>
          {/* name */}
          <TextInput
            label="Name"
            placeholder="name"
            mode="outlined"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            style={screenStyles.inputContainer}
          />
          {/* mob */}
          <TextInput
            label="Mobile"
            placeholder="Mobile Number"
            value={formData.mobile?.toString()}
            onChangeText={value => handleInputChange('mobile', value)}
            mode="outlined"
            style={screenStyles.inputContainer}
             
          />
          {/* dob */}
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
          {/* permanent address */}
          <>
            <TextInput
              label="address"
              value={formData.permanentAddress.address?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'address')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="city"
              value={formData.permanentAddress.city?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'city')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="state"
              value={formData.permanentAddress.state?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'state')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="country"
              value={formData.permanentAddress.country?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'country')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="pincode"
              value={formData.permanentAddress.pincode?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'pincode')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
          </>
          <Checkbox.Item
            label="Copy Permanent address"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          {/* current address */}
          <>
            <TextInput
              label="address"
              value={
                checked
                  ? formData.permanentAddress.address?.toString()
                  : formData.temporaryAddress.address?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'address')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="city"
              value={
                checked
                  ? formData.permanentAddress.city?.toString()
                  : formData.temporaryAddress.city?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'city')
              }
              readOnly={checked ? true : false}
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="state"
              value={
                checked
                  ? formData.permanentAddress.state?.toString()
                  : formData.temporaryAddress.state?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'state')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="country"
              value={
                checked
                  ? formData.permanentAddress.country?.toString()
                  : formData.temporaryAddress.country?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'country')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="pincode"
              value={
                checked
                  ? formData.permanentAddress.pincode?.toString()
                  : formData.temporaryAddress.pincode?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'pincode')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
          </>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};


export default React.memo(Forms)