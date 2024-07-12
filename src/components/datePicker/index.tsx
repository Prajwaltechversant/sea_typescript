import {View, Text, Button, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface Props {
  setNewDate?: (value: any) => void;
  setYear?: (value: any) => void;
  name: string;
}

export default function DatePickerComponent({
  setNewDate,
  setYear,
  name,
}: Props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View >
      <Pressable
        style={{
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexDirection: 'row',
          paddingHorizontal: 2,
        }}
        onPress={() => setOpen(true)}>
        <Text>{date.toDateString()}</Text>
        <TouchableOpacity style={{justifyContent:'center'}}>
        <Fontisto name="date"  />
        </TouchableOpacity>

      </Pressable>
      {/* <DatePicker
        modal
        open={open}
        mode="date"
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          name === 'dob'
            ? setNewDate(date)
            : setYear(date.getFullYear().toString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </View>
  );
}
