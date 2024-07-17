import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import moment from 'moment-timezone/moment-timezone.js';
import {DataTable} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../../context/ScreenContextProvider';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import 'moment-timezone/data/packed/latest.json';

const MomentumT: React.FC = () => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[
      screenContext.windowisPortrait ? 'windowWidth' : 'windowHeight'
    ],
    screenContext[
      screenContext.windowisPortrait ? 'windowHeight' : 'windowWidth'
    ],
    colors,
  );

  const [date, setDate] = useState(moment().format('DD - MM - YYYY'));
  // const [time, setTime] = useState(moment())
  // let t = moment().format('LT')
  // let t =moment().calendar(null, {
  //     sameDay: '[Today]',
  //     nextDay: '[Tomorrow]',
  //     nextWeek: 'dddd',
  //     lastDay: '[Yesterday]',
  //     lastWeek: '[Last] dddd',
  //     sameElse: 'DD/MM/YYYY'
  // });

  // let t = moment.isDate()

  const [time, setTime] = useState(moment().format('HH : MM : SS A'));

//   let t = moment().format('HH : MM : SS A');


  const deviceTimeZone = RNLocalize.getTimeZone();

  useEffect(() => {
    const interval = setTimeout(() => {
      setTime(moment().tz(deviceTimeZone).format('LT'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <View style={screenStyles.container}>
      <Text>TimeZone -- Momentum</Text>
      <View style={screenStyles.clockView}>
        <Text>{date}</Text>
        <View style={screenStyles.timeView}>
          <Text style={{fontSize: 30}}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MomentumT;
