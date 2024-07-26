import {View, Text, AppState, Vibration, TouchableOpacity} from 'react-native';
import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import TimePicker, {Time} from '../../components/timePicker';
import moment from 'moment';
import 'moment-timer';
import BackgroundService from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from 'console';
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import ProgressLoader from '../../components/progressLoader';
import {Button} from 'react-native-paper';
import {Circle, Svg} from 'react-native-svg';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const sleep = time =>
  new Promise<void>(resolve => setTimeout(() => resolve(), time));

// const veryIntensiveTask = async taskDataArguments => {
//   const {delay, timeIns} = taskDataArguments;

//   const format = seconds => {
//     const duration = moment.duration(seconds, 'seconds');
//     const hours = duration.hours().toString().padStart(2, '0');
//     const minutes = duration.minutes().toString().padStart(2, '0');
//     const secs = duration.seconds().toString().padStart(2, '0');
//     return `${hours} h: ${minutes} m: ${secs} s`;
//   };

//   let newT = timeIns;

//   await new Promise<void>(async resolve => {
//     for (let i = timeIns; i >= 0; i--) {
//       newT - 1;
//       await sleep(delay);
//       await BackgroundService.updateNotification({
//         taskDesc: `timer left:${format(newT)} `,
//         progressBar: {value: 10, max: 0, indeterminate: false},
//       });
//     }
//     resolve();
//   });

//   if (newT === 0) {
//     BackgroundService.stop();

//     Vibration.vibrate();
//     AsyncStorage.removeItem('currTime');
//     AsyncStorage.removeItem('timertime');
//   }
// };

const veryIntensiveTask = async taskDataArguments => {
  const {delay, timeIns} = taskDataArguments;

  const formatTime = seconds => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const secs = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  let remainingTime = timeIns;

  await new Promise<void>(async resolve => {
    while (remainingTime > 0 && BackgroundService.isRunning()) {
      await BackgroundService.updateNotification({
        taskDesc: `Time left: ${formatTime(remainingTime)}`,
        progressBar: {
          value: timeIns - remainingTime,
          max: timeIns,
          indeterminate: false,
        },
      });

      await sleep(delay);
      remainingTime -= 1;

      if (remainingTime <= 0) {
        remainingTime = 0;

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          sound: 'notify3',
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          vibration: false,
          lights: true,
          lightColor: AndroidColor.MAGENTA,
        });

        await notifee.displayNotification({
          title: 'Timer',
          body: 'completed',

          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            badgeCount: 2,
            sound: 'notify3',
            visibility: AndroidVisibility.PUBLIC,
            pressAction: {
              id: 'default',
            },
          },
        });
        await AsyncStorage.removeItem('currTime');
        await AsyncStorage.removeItem('timertime');
        BackgroundService.stop();
      }
    }
    resolve();
  });
};
const Timer = () => {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth < screenContext.windowHeight;

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

  const [timer, setTimer] = useState<Time>({h: '0', m: '0', s: '0'});
  const [stopWatchTimer, setStopWatchTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<any>(null);

  const [totalTime, setTotaltime] = useState<number>(0);
  const [isStopped, setIlsStopped] = useState(false);

  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(({translationY, x, y}) => {
      if (translateX.value === 0) {
        translateX.value = x;
      }
    })
    .onChange(({x}) => {
      if (translateX.value > 0) {
        translateX.value = x;
      }
    })
    .onEnd(({x, velocityX}) => {
      if (translateX.value && (translateX.value >= 150 || velocityX > 950)) {
        translateX.value = 291;
        stopTimer()
      } else {
        translateX.value = 0;
      }
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value)}],
  }));

  const startTimer = useCallback(async (value: Time) => {
    setTimer(value);
    const {h, m, s} = value;
    let timeIns = Number(h) * 3600 + Number(m) * 60 + Number(s);
    await AsyncStorage.setItem('timertime', timeIns.toString());
    setStopWatchTimer(timeIns);
    setTotaltime(timeIns);
    if (timerRef.current) {
      timerRef.current.stop();
    }

    if (timeIns > 0) {
      const duration: any = moment.duration(1, 'second');

      timerRef.current = duration.timer({loop: true}, () => {
        setStopWatchTimer(prev => {
          const newTime = prev - 1;
          setIsRunning(true);
          if (newTime <= 0) {
            timerRef.current.stop();
            BackgroundService.stop();
            return 0;
            setIsRunning(false);
          }
          return newTime;
        });
      });
      await AsyncStorage.setItem('currTime', new Date().toISOString());
      await AsyncStorage.setItem('totalTime', timeIns.toString());
      await BackgroundService.start(veryIntensiveTask, {
        ...options,
        parameters: {delay: 1000, timeIns},
      });
    }
  }, []);

  useEffect(() => {
    async function checkTimer() {
      const storedTime = await AsyncStorage.getItem('currTime');
      if (storedTime) {
        const storedTimestamp = new Date(storedTime).getTime();
        const currentTimestamp = Date.now();
        const elapsedTime = Math.floor(
          (currentTimestamp - storedTimestamp) / 1000,
        );
        const timertime = await AsyncStorage.getItem('timertime');
        setTotaltime(Number(timertime));
        setStopWatchTimer(Number(timertime) - elapsedTime);

        const duration: any = moment.duration(1, 'second');
        timerRef.current = duration.timer({loop: true}, () => {
          setStopWatchTimer(prev => {
            const newTime = prev - 1;
            setIsRunning(true);
            if (newTime <= 0) {
              timerRef.current.stop();
              BackgroundService.stop();
              AsyncStorage.removeItem('currTime');
              setIsRunning(false);
              return 0;
            }
            return newTime;
          });
        });
      }
    }
    if (BackgroundService.isRunning()) {
      checkTimer();
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const secs = duration.seconds().toString().padStart(2, '0');
    return `${hours} h: ${minutes} m: ${secs} s`;
  }, []);

  const options = {
    taskName: 'Timer is Running',
    taskTitle: 'Timer',
    taskDesc: 'Custom timer',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
  };

  const [progress, setProgress] = useState(0);

  const stopTimer = async () => {
    await AsyncStorage.setItem('currTime', new Date().toISOString());
    await AsyncStorage.setItem('totalTime', stopWatchTimer.toString());
    await setIlsStopped(!isStopped);

    BackgroundService.stop();
  };
  useMemo(() => {
    if (Number(stopWatchTimer) >= 0) {
      let progress = 1 - stopWatchTimer / totalTime;
      progress = Math.max(0, Math.min(progress, 1));
      setProgress(progress);
    }
  }, [Number(stopWatchTimer), totalTime]);

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <Text style={screenStyles.headerText}>Timer</Text>
        <View>
          <TimePicker startTimer={startTimer} isRunning={isRunning} />
        </View>
      </View>
      {isRunning && (
        <View style={screenStyles.timerInputBox}>
          {/* <Text style={{textAlign: 'center'}}>{formatTime(stopWatchTimer)}</Text> */}

          <View style={screenStyles.loaderBox}>
            <ProgressLoader
              // progress={0.6}
              progress={progress}
            />

            <View style={screenStyles.swipeBtnContainer}>
              <GestureHandlerRootView>
                <View style={screenStyles.swipeBtn}>
                  <GestureDetector gesture={pan}>
                    <View
                      style={
                        {
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // flexDirection: 'row',
                        }
                      }>
                      <Animated.View
                        style={[
                          screenStyles.circle,
                          animatedStyles,
                        ]}></Animated.View>
                    </View>
                  </GestureDetector>
                  <Text style={screenStyles.swipeBtnText}>Stop Timer</Text>
                </View>
              </GestureHandlerRootView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Timer;
