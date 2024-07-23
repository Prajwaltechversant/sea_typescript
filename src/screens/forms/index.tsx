import {
  Alert,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import InputBox from '../../components/InputElement';
import DatePickerComponent from '../../components/datePicker';
import {Snackbar} from 'react-native-paper';
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
import {showMessage} from 'react-native-flash-message';
import {addFormData} from '../../redux/actions/formdata/action';
import {useAppDispatch} from '../../hooks/hooks';

export type Form = {
  name: string;
  dob:any;
  age: number | null;
  email: string | null;
  temporaryAddress: string;
  temporaryCity: string;
  temporaryState: string;
  temporaryCountry: string;
  temporaryPincode: number;
  // permanentAddress: string;
  // permanentCity: string;
  // permanentState: string;
  // permanentCountry: string;
  // permanentPincode: number;
  mobile: number | null;
  cv: string | null;
  profile: string | null;
  signature: string | null;
  skills: string | null;
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  id: number | null;
}[];

export type FormType = Form & {education: Education};

const Forms: React.FC = () => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const navigation:any = useNavigation();
  const dispatch = useAppDispatch();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;

  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );

  const currentYear = new Date().getFullYear();
  const [visible, setVisible] = React.useState(false);
  const [tempSign, setTempSign] = useState('');

  const onToggleSnackBar = (value: any) => {
    setTempSign(value);
    setVisible(!visible);
    setFormData({...formData, signature: null});
  };
  const onDismissSnackBar = () => setVisible(false);

  const [formData, setFormData] = useState<Form>({
    name: '',
    mobile: null,
    email: null,
    // permanentAddress: '',
    // permanentCity: '',
    // permanentCountry: '',
    // permanentState: '',
    // permanentPincode: 0,
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
    skills: null,
  });

  const [error, setError] = useState({
    emailError: '',
    mobileError: '',
  });

  const [education, setEducation] = useState<Education>([]);

  const allInputs = [
    {key: 'name', label: 'Name', name: 'textInput', type: 'text'},
    {key: 'mobile', label: 'Mobile', name: 'textInput', type: 'tel'},
    {key: 'dob', name: 'date', label: 'Date of Birth', type: 'date'},
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
      type: 'numeric',
    },
    {key: 'skills', label: 'Skills', name: 'dropdown', type: 'dropdown'},
    {
      key: 'education',
      label: 'Education',
      name: 'educationArray',
      type: 'array',
    },
    {key: 'cv', label: 'cv', name: 'filepicker', type: 'doc'},
    {key: 'profile', label: 'Profile', name: 'filepicker', type: 'img'},
    {key: 'sign', label: 'Signature', name: 'sign', type: 'sign'},
  ];

  const handleInputChange = useCallback((field: keyof Form, value: any) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    if (formData.dob) {
      const userAge = currentYear - formData.dob?.getFullYear();
      // let dobString = formData.dob?.toDateString()
      setFormData(prevFormData => ({
        ...prevFormData,
        age: userAge,
        // dob:dobString
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

    if (!degree || !endDate || !field || !school || !startDate) {
      showMessage({
        message: 'Please Add Details',
        type: 'info',
        duration: 1000,
        position: 'bottom',
      });
    } else {
      if (startDate > endDate) {
        showMessage({
          message: 'End date Should be greater than Start date',
          type: 'info',
          duration: 1000,
          position: 'top',
        });
      } else {
        setEducation(prevEducation => [...prevEducation, tempData]);
      }
    }
  }, []);

  const removeEducation = useCallback(
    (id: number) => {
      const newEd = education.filter(item => item.id !== id);
      setEducation(newEd);
    },
    [education],
  );




  const handleFilePicker = useCallback(async (type: string) => {
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
            setFormData(prevFormData => ({...prevFormData, cv: uri}));
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
            'Max File size is 10Mb , Please Image between 2Mb and 10Mb',
          );
        } else {
          try {
            const fileCopyUri = res[0]?.fileCopyUri as string;
            const uri = decodeURIComponent(fileCopyUri);
            setFormData(prevFormData => ({...prevFormData, profile: uri}));
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const validateInputs = () => {
    const {age, cv, dob, email, mobile} = formData;

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

  const handleFormSubmit = () => {
    let data = {...formData, education};
    dispatch(addFormData(data));
    navigation.navigate('profilepage');
    let isData = false;
  };

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
                  {name === 'textInput' ||
                  name === 'date' ||
                  name === 'dropdown' ||
                  name === 'filepicker' ||
                  name === 'sign' ? (
                    <>
                      <InputBox
                        label={label}
                        onChangeText={value =>
                          handleInputChange(key as keyof Form, value)
                        }
                        placeholder={`Enter your ${label}`}
                        value={formData[key as keyof Form] || ''}
                        type={type}
                        error={error.emailError}
                        name={name}
                        setNewDate={value => handleInputChange('dob', value)}
                        formData={formData}
                        setFormData={setFormData}
                        handleFilePicker={value => handleFilePicker(value)}
                        onToggleSnackBar={value => onToggleSnackBar(value)}
                        key={key}
                      />
                    </>
                  ) : name === 'educationArray' ? (
                    <DataArray
                      education={education}
                      setEducation={setEducation}
                      addAnother={addAnother}
                      removeEducation={removeEducation}
                    />
                  ) : name === 'sign' ? (
                    <View style={screenStyles.inputContainer}>
                      <AddSign setFormData={setFormData} formData={formData} />
                    </View>
                  ) : null}
                </>
              );
            }}
          />
          {formData.cv && <PdfViewer url={formData?.cv} />}

          <View style={{paddingHorizontal:10}} renderToHardwareTextureAndroid>
            <View style={{flexDirection: 'row'}}>
              {formData?.profile && (
                <View style={screenStyles.signview}>
                  <Image
                    source={{uri: `file://${formData.profile}`}}
                    width={150}
                    height={100}
                  />
                  <FontAwesome5
                    name="trash"
                    color={colors.text}
                    size={20}
                    style={{padding:10, backgroundColor:'red', borderRadius:50}}
                    onPress={() => setFormData({...formData, profile: null})}
                  />
                </View>
              )}
              {formData.signature && (
                <>
                  <View style={screenStyles.signview}>
                    <Image
                      source={{uri: `file://${formData.signature}`}}
                      width={100}
                      height={100}
                    />
                    <FontAwesome5
                      name="trash"
                      color={colors.text}
                      style={{padding:10, backgroundColor:'red', borderRadius:50}}
                      size={20}
                      onPress={() => onToggleSnackBar(formData?.signature)}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <TouchableHighlight
          style={screenStyles.formSubmitBtn}
          onPress={handleFormSubmit}>
          <Text style={screenStyles.labelText}>Save</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
      <Snackbar
        style={{}}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            setFormData({...formData, signature: tempSign});
          },
        }}>
        Deleted
      </Snackbar>
    </ScrollView>
  );
};

export default React.memo(Forms);
