import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import {TextInput} from 'react-native-paper';
import DatePickerComponent from '../datePicker';
import DatePicker from 'react-native-date-picker';
import SearchbleDropdown from '../../components/searchableDropdown';
import {Form} from '../../screens/forms';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddSign from '../sign';

type Picker = 'image' | 'file';

interface Props {
  placeholder?: string;
  onChangeText?: (value: any) => void;
  value?: string | number | null;
  secureTextEntry?: boolean;
  label?: string;
  style?: any;
  type?: string;
  error?: any;
  setNewDate?: (value: any) => void;
  setYear?: (value: any) => void;
  name?: string;
  rightComponent?: React.ReactNode;
  formData?: Form;
  setFormData?: (value: any) => void;
  handleFilePicker?: (value: Picker) => void;
  onToggleSnackBar?: (value: any) => void;
  icon?: string;
  key?: string;
}

const InputBox: React.FC<Props> = ({
  label,
  onChangeText,
  placeholder,
  value,
  secureTextEntry,
  style,
  type,
  error,
  name,
  setNewDate,
  setYear,
  rightComponent,
  formData,
  setFormData,
  handleFilePicker,
  onToggleSnackBar,
  key,
}) => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
    style,
  );

  const [open, setOpen] = useState(false);
  const rightIcon =
    type === 'date' ? (
      <TextInput.Icon icon={'calendar'} onPress={() => setOpen(!open)} />
    ) : type === 'dropdown' ? (
      <TextInput.Icon icon={'eye'} />
    ) : type === 'doc' ? (
      <TextInput.Icon icon={'file'} onPress={() => handleFilePicker('file')} />
    ) : type === 'img' ? (
      <TextInput.Icon
        icon={'image'}
        onPress={() => handleFilePicker('image')}
      />
    ) : null;

  if (type === 'dropdown') {
    return (
      <View style={screenStyles.container}>
        <TextInput
          style={screenStyles.inputContainer}
          mode="outlined"
          verticalAlign="middle"
          render={() => {
            return (
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
                formData={formData}
                setFormData={setFormData}
              />
            );
          }}
        />
      </View>
    );
  }
  if (type === 'sign') {
    return (
      <View style={screenStyles.container}>
        <TextInput
          style={screenStyles.inputContainer}
          mode="outlined"
          verticalAlign="middle"
          render={() => {
            return <AddSign setFormData={setFormData} formData={formData} />;
          }}
        />
      </View>
    );
  }
  const [date, setDate] = useState(new Date());

  return (
    <View style={screenStyles.container}>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        label={label}
        onChangeText={onChangeText}
        value={type === 'date' ? date.toDateString() : value?.toString()}
        secureTextEntry={secureTextEntry}
        style={screenStyles.inputContainer}
        readOnly={
          type === 'text' ||
          type === 'tel' ||
          type === 'numeric' ||
          type === 'email'
            ? false
            : true
        }
        inputMode={
          type === 'numeric'
            ? 'numeric'
            : type === 'email'
            ? 'email'
            : type === 'tel'
            ? 'tel'
            : 'text'
        }
        cursorColor="blue"
        right={rightIcon}
      />

      {type === 'email' && <Text>{error}</Text>}

      <DatePicker
        modal
        open={open}
        mode="date"
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          if (name === 'date') {
            setNewDate(date);
          } else {
            setYear(date.getFullYear().toString());
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default React.memo(InputBox);
