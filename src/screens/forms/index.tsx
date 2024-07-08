import {
  Alert,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import InputBox from '../../components/InputElement';
import DatePickerComponent from '../../components/datePicker';
import {Button, Checkbox} from 'react-native-paper';
import {useOrientationChange} from 'react-native-orientation-locker';
import {FlatList} from 'react-native-gesture-handler';
import DataArray from './DataArray';
import {DocumentPickerResponse, pick} from 'react-native-document-picker';
import PdfViewer from '../../components/pdfViewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import validator from 'validator';
import AddSign from '../../components/sign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchbleDropdown from '../../components/searchableDropdown';
import {showMessage, hideMessage} from 'react-native-flash-message';

export type Form = {
  name: string;
  dob: Date | undefined;
  age: number | null;
  email: string | null;
  temporaryAddress: string;
  temporaryCity: string;
  temporaryState: string;
  temporaryCountry: string;
  temporaryPincode: number;
  permanentAddress: string;
  permanentCity: string;
  permanentState: string;
  permanentCountry: string;
  permanentPincode: number;
  mobile: number | null;
  cv: any;
  profile: string | null;
  signature: string | null;
  skills: string[];
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  id: number | null;
}[];

type FormType = Form & {education: Education};

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

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<Form>({
    name: '',
    mobile: null,
    email: null,
    permanentAddress: '',
    permanentCity: '',
    permanentCountry: '',
    permanentState: '',
    permanentPincode: 0,
    temporaryAddress: '',
    temporaryCity: '',
    temporaryCountry: '',
    temporaryPincode: 0,
    temporaryState: '',
    dob: undefined,
    age: null,
    cv: '',
    profile: null,
    signature: null,
    skills: [],
  });

  const [error, setError] = useState({
    emailError: '',
    mobileError: '',
  });

  const [education, setEducation] = useState<Education>([
    {
      degree: '',
      endDate: null,
      field: '',
      school: '',
      startDate: null,
      id: null,
    },
  ]);

  const allInputs = [
    {key: 'name', label: 'Name', name: 'textInput', type: 'text'},
    {key: 'mobile', label: 'Mobile', name: 'textInput', type: 'tel'},
    {key: 'dob', name: 'date', label: 'Date of Birth'},
    {key: 'email', label: 'Email', name: 'textInput', type: 'email'},

    {
      key: 'temporaryAddress',
      label: 'Address',
      name: 'textInput',
      type: 'text',
    },
    {
      key: 'temporaryCity',
      label: 'City',
      name: 'textInput',
      type: 'text',
    },
    {
      key: 'temporaryState',
      label: ' State',
      name: 'textInput',
      type: 'text',
    },
    {
      key: 'temporaryCountry',
      label: 'Country',
      name: 'textInput',
      type: 'text',
    },
    {
      key: 'temporaryPincode',
      label: ' Pincode',
      name: 'textInput',
      type: 'text',
    },
    {key: 'skills', label: 'Skills', name: 'dropdown'},
    {
      key: 'education',
      label: 'Education',
      name: 'educationArray',
      type: 'array',
    },
    {key: 'cv', label: 'cv', name: 'filepicker', type: 'tel'},
    {key: 'profile', label: 'Profile', name: 'profilePicker'},
    {key: 'sign', label: 'Signature', name: 'sign'},
  ];

  const handleInputChange = useCallback((field: keyof Form, value: any) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  }, []);

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

  const addAnother = useCallback((tempData: Education[0]) => {
    const {degree, endDate, field, id, school, startDate} = tempData;
    if (!degree || !endDate || !field || school || !startDate) {
      showMessage({
        message: 'Please Add Details',
        type: 'info',
        duration: 1000,
        position: 'bottom',
      });
    } else {
      setEducation(prevEducation => [...prevEducation, tempData]);
    }
  }, []);

  const removeEducation = useCallback(
    (id: number) => {
      const newEd = education.filter(item => item.id !== id);
      setEducation(newEd);
    },
    [education],
  );

  type Picker = 'image' | 'file';

  const handleFilePicker = async (type: Picker) => {
    if (type === 'file') {
      try {
        const res: DocumentPickerResponse[] = await pick({
          allowMultiSelection: false,
          mode: 'import',
          type: DocumentPicker.types.pdf,
          copyTo: 'documentDirectory',
        });
        const size = res[0]?.size as number;
        if (size > 7000000) {
          Alert.alert('File size should be less than 8Mb');
        } else {
          try {
            const fileCopyUri = res[0]?.fileCopyUri as string;
            const uri = decodeURIComponent(fileCopyUri);
            setFormData({...formData, cv: uri});
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type === 'image') {
      try {
        const res = await pick({
          allowMultiSelection: false,
          mode: 'import',
          type: DocumentPicker.types.images,
          copyTo: 'documentDirectory',
        });
        const size = res[0]?.size as number;

        if (size > 10000000 || size < 2000000) {
          Alert.alert(
            'Max File size is 10Mb , Please Image between 2Mb and 10Mb ',
          );
        } else {
          try {
            const fileCopyUri = res[0]?.fileCopyUri as string;

            const uri = decodeURIComponent(fileCopyUri);
            setFormData({...formData, profile: uri});
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateInputs = () => {
    const {age, cv, dob, email, mobile, permanentPincode} = formData;

    if (email !== null) {
      if (validator.isEmail(email)) {
        setError({...error, emailError: ''});
        return true;
      } else {
        setError({...error, emailError: 'Invalid Email Address'});
      }
    }
  };

  useMemo(() => {
    validateInputs();
  }, [formData.email]);


  const handleFormSubmit = ()=>{
    const {age,cv,dob,email,mobile,name,permanentAddress,permanentCity,permanentCountry,permanentPincode,permanentState,profile,signature,skills,temporaryAddress,temporaryCity,temporaryCountry,temporaryPincode,temporaryState,} = formData;


  
    
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={screenStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ios: 60, android: 0})}>
        <View id="content" style={screenStyles.contentContainer}>
          <FlatList
            data={allInputs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              const {key, name, type, label} = item;
              return (
                <>
                  {name === 'textInput' ? (
                    <InputBox
                      label={label}
                      onChangeText={value =>
                        handleInputChange(key as keyof Form, value)
                      }
                      placeholder={`Enter your ${label}`}
                      value={formData[key as keyof Form] || ''}
                      type={type}
                      error={error.emailError}
                    />
                  ) : name === 'date' ? (
                    <>
                      <Text>{key}</Text>
                      <View style={screenStyles.inputContainer}>
                        <DatePickerComponent
                          setNewDate={value => handleInputChange('dob', value)}
                          name="dob"
                        />
                      </View>
                    </>
                  ) : name === 'educationArray' ? (
                    <DataArray
                      education={education}
                      setEducation={setEducation}
                      addAnother={addAnother}
                      removeEducation={removeEducation}
                    />
                  ) : name === 'filepicker' ? (
                    <>
                      <View style={screenStyles.inputContainer}>
                        <TouchableOpacity
                          onPress={() => handleFilePicker('file')}
                          style={screenStyles.pdfBtn}>
                          <Text style={{fontSize: 20}}>Upload Cv</Text>

                          <AntDesign name="pdffile1" size={30} />
                        </TouchableOpacity>
                      </View>
                      {formData.cv && <PdfViewer url={formData?.cv} />}
                    </>
                  ) : name === 'profilePicker' ? (
                    <View style={screenStyles.inputContainer}>
                      <TouchableOpacity
                        onPress={() => handleFilePicker('image')}
                        style={screenStyles.pdfBtn}>
                        <Text style={{fontSize: 20}}>Upload Image</Text>

                        <AntDesign name="user" size={30} />
                      </TouchableOpacity>
                    </View>
                  ) : name === 'sign' ? (
                    <View style={screenStyles.inputContainer}>
                      <AddSign setFormData={setFormData} formData={formData} />
                    </View>
                  ) : name === 'dropdown' ? (
                    <SearchbleDropdown
                      data={[
                        {label: 'HTML', value: '1'},
                        {label: 'CSS', value: '2'},
                        {label: 'Javascript', value: '3'},
                        {label: 'python', value: '4'},
                        {label: 'java', value: '5'},
                        {label: 'c/c++', value: '6'},
                        {label: '.net', value: '7'},
                        {label: 'React', value: '8'},
                      ]}
                      label={'Select language'}
                      icon="codesquareo"
                    />
                  ) : null}
                </>
              );
            }}
          />
          {formData.profile && (
            <View style={screenStyles.signview}>
              <Image
                source={{uri: `file://${formData.profile}`}}
                width={100}
                height={100}
              />
              <FontAwesome5
                name="trash"
                color={colors.text}
                size={20}
                onPress={() => setFormData({...formData, profile: null})}
              />
            </View>
          )}
        </View>
        <TouchableHighlight  style={screenStyles.formSubmitBtn}>
          <Text style={screenStyles.labelText}>Save</Text>
        </TouchableHighlight>

      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default React.memo(Forms);
