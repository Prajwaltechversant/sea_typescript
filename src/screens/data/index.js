import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-assets/slider'
import SliderComponent from '../../components/slider'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Alert } from 'react-native';
import DropdownLn from '../../components/dropdownLn';

export default function Data() {
  const [selected, setSelected] = useState('');

  return (
    <View style={{padding:10}}>
      <ScrollView>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}

        style={{
          borderWidth:1,
          borderRadius:10
          
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
        }}

      />
      </ScrollView>
      <DropdownLn />

     

    </View>
  )
}