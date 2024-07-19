import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useScreenContext} from '../../../../context/ScreenContextProvider';
import {useTheme} from '@react-navigation/native';
import styles from './style';
// import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProgressLoader from '../../../../components/progressLoader';
type TimeInputType = {
  hour: number | string;
  minute: number | string;
  seconds: number | string;
};

type ActiveInputField = 'h' | 'm' | 's';

const ActionTimer = () => {
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

  const [input, setInput] = useState<TimeInputType>({
    hour: '00',
    minute: '00',
    seconds: '00',
  });

  const [activeField, setActiveField] = useState<ActiveInputField>('h');
  const [visible, setVisble] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive,setIsTimerActive] = useState(false)
  const showModal = () => setVisble(true);
  const hideModal = () => setVisble(false);

  const handleInput = (value: number | string) => {
    if (activeField === 'h') {
      setInput({...input, hour: value});
    } else if (activeField === 'm') {
      setInput({...input, minute: value});
    } else {
      setInput({...input, seconds: value});
    }
  };

  const startTimer = () => {
    const {hour, minute, seconds} = input;

    if (hour !== 0 || minute !== 0 || seconds !== 0) {
      const totalSeconds =
        parseInt(hour.toString()) * 3600 +
        parseInt(minute.toString()) * 60 +
        parseInt(seconds.toString());

      setTimer(totalSeconds);
    }
  };

  const handleTimer = () => {
    showModal();
    startTimer();
    setIsTimerActive(true)
  };

  useMemo(() => {
    let interval;
    if (timer > 0 && isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false)   
     }

    return () => clearInterval(interval);
  }, [timer])


  const progress = timer/100;
  console.log('====================================');
  console.log(progress);
  console.log('====================================');
  return (
    <View style={screenStyles.container}>
      <View>
        <View style={screenStyles.timeContainer}>
          <TouchableOpacity
            style={{borderWidth: 1}}
            onPress={() => setActiveField('h')}>
            <TextInput
              numberOfLines={1}
              maxLength={2}
              editable={false}
              value={input.hour.toString()}
            />
          </TouchableOpacity>
          <Text>:</Text>
          <TouchableOpacity
            style={{borderWidth: 1}}
            onPress={() => setActiveField('m')}>
            <TextInput
              numberOfLines={1}
              maxLength={2}
              editable={false}
              value={input.minute.toString()}
            />
          </TouchableOpacity>
          <Text>:</Text>
          <TouchableOpacity
            style={{borderWidth: 1}}
            onPress={() => setActiveField('s')}>
            <TextInput
              numberOfLines={1}
              maxLength={2}
              editable={false}
              value={input.seconds.toString()}
            />
          </TouchableOpacity>
        </View>

        <View id="numPad" style={screenStyles.numPadContainer}>
          <FlatList
            style={screenStyles.numPad}
            data={Array(9)}
            numColumns={3}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={screenStyles.numKey}
                onPress={() => handleInput(index + 1)}>
                <Text>{index + 1}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={screenStyles.numKey}
                  onPress={() => handleInput(0)}>
                  <Text>0</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={screenStyles.numKey}>
                  <Text>X</Text>
                </TouchableOpacity> */}
              </View>
            }
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>

        <View style={screenStyles.startIcon}>
          <TouchableOpacity onPress={handleTimer}>
            <AntDesign name="play" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Modal visible={visible} style={{}} transparent>
          <View
            style={{
              backgroundColor: colors.background,
              borderWidth: 1,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity style={{width:50, height:50, borderWidth:1, justifyContent:'center',alignItems:'center'}}>
              <Text onPress={hideModal}>X</Text>
              </TouchableOpacity>
              <Text>{timer}</Text>
              {/* <ProgressLoader progress={0.5} /> */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ActionTimer;
