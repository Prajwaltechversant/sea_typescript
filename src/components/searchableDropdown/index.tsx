import { useTheme } from '@react-navigation/native';
import { color } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    data:{label:string, value:string}[];
    label:string;
    icon:string;
}
const DropdownComponent = ({data, label,icon}:Props) => {

  const [value, setValue] = useState(null);

  const {colors} = useTheme()

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={label}
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item?.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color={colors.text} name={icon} size={20} />
      )}
      
      renderItem={(item)=>{
        console.log(item)
        return(
            <View style={{height:40,backgroundColor:colors.secondary,borderWidth:0.2}}>
                <Text style={{color:colors.text}}>{item.label}</Text>
            </View>
        )
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
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
    fontSize: 16,color:'black'
  },
  item: {
    fontSize: 16,

  },
});
