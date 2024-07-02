import { View, Text, ScrollView, BackHandler, DevSettings } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-assets/slider'
import SliderComponent from '../../components/slider'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Alert } from 'react-native';
import DropdownLn from '../../components/dropdownLn';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import SampleChart from '../chart';
import { TextInput } from 'react-native-paper';
// import {useBackHandler} from '@react-native-community/hooks'

export default function Data() {
  const [selected, setSelected] = useState('');



  const navigation = useNavigation()

  // useBackHandler(() => {
  //   if (shouldBeHandledHere) {
  //     Alert.alert("Back Button Pressed")
  //     return true
  //   }
  //   // let the default thing happen
  //   return false
  // })

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Confirm Exit !', 'are you sure want exit', [
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ]);
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation])
  );

  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
          }}

          style={{
            borderWidth: 1,
            borderRadius: 10

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
      <Button title='reload' onPress={() => DevSettings.reload()} />

        <TextInput placeholder='name'  textColor='red'  />
  

      <DropdownLn />



    </View>
  )
}