import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import moment from 'moment-timezone/moment-timezone.js';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../../context/ScreenContextProvider';
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

  const [date, setDate] = useState(moment().format('LLLL'));
  const [locale, setLocale] = useState('en');
  const [time, setTime] = useState(moment().format('HH : mm : ss A'));

  const deviceTimeZone = RNLocalize.getTimeZone();
  // moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');

  useEffect(() => {
    moment.locale(locale);
    const interval = setInterval(() => {
      // setTime(moment().tz(deviceTimeZone).format('HH : mm : ss A'));
      setTime(moment().format('HH : mm : ss A'));
      // console.log(
      //   moment.tz.zone('Asia/kolkata'),
      // );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale, deviceTimeZone]);

  useEffect(() => {
    setDate(moment().format('DD - MM - YYYY'));
  }, [locale]);
  //   var june = moment("2014-06-01T12:00:00Z");
  // console.log('====================================');
  // console.log(june.tz('America/New_York').format('ha z'));
  // console.log('====================================');
  return (
    <View style={screenStyles.container}>
      <Text>TimeZone -- Momentum</Text>
      <View style={screenStyles.clockView}>
        <Text>{date}</Text>
        <View style={screenStyles.timeView}>
          <Text style={{fontSize: 30}}>{time}</Text>
        </View>
        <View>
          <Button title="France" color="blue" onPress={() => setLocale('fr')} />
        </View>

        <View>
          <Button
            title="Spanish"
            color="blue"
            onPress={() => setLocale('es')}
          />
        </View>

        <View>
          <Button
            title="English"
            color="blue"
            onPress={() => setLocale('en')}
          />
        </View>
      </View>
    </View>
  );
};

export default MomentumT;
