import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button} from 'react-native-paper';
import {log} from 'console';

export type Time = {
  h: number | string;
  m: number | string;
  s: number | string;
};

interface Props {
  setTimer?: (value: any) => void;
  startTimer: (value: any) => void;
  isRunning?: boolean;
}

const Timer: React.FC<Props> = ({setTimer, startTimer, isRunning}) => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth < screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );

  const [time, setTime] = useState<Time>({h: '', m: '', s: ''});
  const handleTimeUpdate = (value: string, input: keyof Time) => {
    const numericValue = Number(value);

    if (input === 'h') {
      if (numericValue > 24) {
        ToastAndroid.showWithGravity(
          'Max timer limit is 24h',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setTime({...time, h: '24'});
        return;
      } else if (numericValue === 24) {
        setTime({h: '24', m: '00', s: '00'});
        return;
      }
    }

    if (input === 'm') {
      if (numericValue >= 60) {
        let newHours = Number(time.h) + 1;
        setTime({
          ...time,
          h: newHours > 24 ? '24' : newHours.toString(),
          m: '00',
          s: '00',
        });
        return;
      }
    }

    if (input === 's') {
      if (numericValue >= 60) {
        let newMinutes = Number(time.m) + 1;
        setTime({
          ...time,
          m: newMinutes >= 60 ? '00' : newMinutes.toString(),
          s: '00',
        });
        if (newMinutes >= 60) {
          let newHours = Number(time.h) + 1;
          setTime({
            ...time,
            h: newHours > 24 ? '24' : newHours.toString(),
            m: '00',
            s: '00',
          });
        }
        return;
      }
    }
    setTime({...time, [input]: value});
  };

  const handleSubmit = () => {
    const {h, m, s} = time;

    startTimer(time);
  };
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.inputBox}>
        <TextInput
          style={screenStyles.inputField}
          inputMode="numeric"
          maxLength={2}
          value={time.h.toString()}
          onChangeText={e => handleTimeUpdate(e, 'h')}
          placeholder="00"
          textAlign="center"
          editable={isRunning ? false : true}
        />
        <TextInput
          style={screenStyles.inputField}
          inputMode="numeric"
          maxLength={2}
          onChangeText={e => handleTimeUpdate(e, 'm')}
          value={time.m.toString()}
          placeholder="00"
          textAlign="center"
          editable={isRunning ? false : true}
        />
        <TextInput
          style={screenStyles.inputField}
          inputMode="numeric"
          maxLength={2}
          value={time.s.toString()}
          onChangeText={e => handleTimeUpdate(e, 's')}
          placeholder="00"
          textAlign="center"
          editable={isRunning ? false : true}
        />
      </View>
      {!isRunning && (
        <Button icon="clock" mode="contained" onPress={handleSubmit}>
          Start
        </Button>
      )}
    </View>
  );
};

export default Timer;
