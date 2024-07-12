import {useTheme} from '@react-navigation/native';
import {color} from '@rneui/base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Form} from '../../screens/forms';
import {useScreenContext} from '../../context/ScreenContextProvider';

// const data = [
//   { label: 'HTML', value: '1' },
//   { label: 'CSS', value: '2' },
//   { label: 'Javascript', value: '3' },
//   { label: 'python', value: '4' },
//   { label: 'java', value: '5' },
//   { label: 'c/c++', value: '6' },
//   { label: '.net', value: '7' },
//   { label: 'React', value: '8' },
// ]

type Props = {
  data: {label: string; value: string}[];
  label: string;
  icon: string;
  formData?: Form;
  setFormData?: (value: any) => void;
};
const DropdownComponent = ({
  data,
  label,
  icon,
  formData,
  setFormData,
}: Props) => {
  const {colors} = useTheme();

  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={screenStyles.dropdown}
      placeholderStyle={screenStyles.placeholderStyle}
      selectedTextStyle={screenStyles.selectedTextStyle}
      inputSearchStyle={screenStyles.inputSearchStyle}
      iconStyle={screenStyles.iconStyle}
      data={data}
      search
      mode="modal"
      // maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={label}
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item?.value);
        setFormData({...formData, skills: item?.label});
      }}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color={colors.text} name={icon} size={20} />
      // )}

      renderRightIcon={() => (
        <AntDesign
          style={screenStyles.icon}
          color={colors.text}
          name={icon}
          size={20}
        />
      )}
      renderItem={item => {
        console.log(item);
        return (
          <View
            style={{
              height: 40,
              backgroundColor: colors.secondary,
              borderWidth: 0.2,
            }}>
            <Text style={{color: colors.text}}>{item.label}</Text>
          </View>
        );
      }}
    />
  );
};

export default DropdownComponent;

const styles = (screenContext, width, height, colors) =>
  StyleSheet.create({
    dropdown: {
      marginHorizontal: screenContext.windowisPortrait ? height * 0.05 : height * 0.01,
      marginVertical: screenContext.windowisPortrait ? height * 0.02 : height * 0.01,
    },
    icon: {
      // marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'white',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'white',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: 'black',
    },
    item: {
      fontSize: 16,
    },
  });
