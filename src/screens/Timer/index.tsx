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
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import ProgressLoader from '../../components/progressLoader';
import {IconButton} from 'react-native-paper';
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

        await AsyncStorage.removeItem('timerStatus');
        await AsyncStorage.removeItem('pausedTime');

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

        let status =
          (await AsyncStorage.getItem('timerStatus')) === 'paused'
            ? true
            : false;
        if (!status) await AsyncStorage.removeItem('timertime');
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
  const [progress, setProgress] = useState(0);
  const [resume, setIsResume] = useState(false);
  const [resumeToggle, setResumeToggle] = useState(false);
  const translateX = useSharedValue(0);
  const stopWatchTimerRef = useRef(stopWatchTimer);

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
        stopTimer();
        setIsResume(true);
      } else {
        translateX.value = 0;
      }
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value)}],
  }));

  const startTimer = useCallback(
    async (value?: any, pausedTime?: string) => {
      let timeIns;
      if (pausedTime) {
        timeIns = Number(pausedTime);
      } else {
        setTimer(value);
        const {h, m, s} = value;
        timeIns = Number(h) * 3600 + Number(m) * 60 + Number(s);
      }

      await AsyncStorage.setItem('timertime', timeIns.toString());
      setStopWatchTimer(timeIns);
      setTotaltime(timeIns);

      if (timerRef.current) {
        timerRef.current.stop();
        console.log(timerRef.current);
      }

      if (timeIns > 0 && !resume) {
        const duration: any = moment.duration(1, 'second');
        setIsRunning(true);

        timerRef.current = duration.timer({loop: true}, () => {
          setStopWatchTimer(prev => prev - 1);
          if (stopWatchTimerRef.current <= 0) {
            timerRef.current.stop();
            BackgroundService.stop();
            AsyncStorage.removeItem('timerStatus');
            setIsRunning(false);
            return 0;
          }
          return stopWatchTimer;
        });

        await AsyncStorage.setItem('currTime', new Date().toISOString());
        await AsyncStorage.setItem('totalTime', timeIns.toString());
        await BackgroundService.start(veryIntensiveTask, {
          ...options,
          parameters: {delay: 1000, timeIns},
        });
      }
    },
    [resume],
  );

  useEffect(() => {
    async function isPaused() {
      if ((await AsyncStorage.getItem('timerStatus')) === 'paused') {
        const pausedTime = Number(await AsyncStorage.getItem('pausedTime'));
        const total = Number(await AsyncStorage.getItem('timertime'));
        let newProgress = 1 - pausedTime / total;
        newProgress = Math.max(0, Math.min(newProgress, 1));
        setProgress(newProgress);
        setIsRunning(true);
        setStopWatchTimer(pausedTime);
      }
    }

    async function checkTimer() {
      const storedTime = await AsyncStorage.getItem('currTime');
      if (storedTime) {
        const storedTimestamp = new Date(storedTime).getTime();
        const currentTimestamp = Date.now();
        const elapsedTime = Math.floor(
          (currentTimestamp - storedTimestamp) / 1000,
        );
        const timertime = await AsyncStorage.getItem('timertime');
        const remainingTime = Number(timertime) - elapsedTime;
        setTotaltime(Number(timertime));
        setStopWatchTimer(remainingTime);
        let newProgress = 1 - remainingTime / Number(timertime);
        newProgress = Math.max(0, Math.min(newProgress, 1));
        setProgress(newProgress);

        const duration: any = moment.duration(1, 'second');
        setIsRunning(true);

        timerRef.current = duration.timer({loop: true}, () => {
          setStopWatchTimer(prev => prev - 1);
          if (stopWatchTimerRef.current <= 0) {
            timerRef.current.stop();
            BackgroundService.stop();
            AsyncStorage.removeItem('currTime');
            setIsRunning(false);
            return 0;
          }
          let newProgress = 1 - stopWatchTimer / Number(timertime);
          newProgress = Math.max(0, Math.min(newProgress, 1));
          setProgress(newProgress);
          return stopWatchTimer;
        });
      }
    }

    if (BackgroundService.isRunning()) {
      checkTimer();
    } else {
      isPaused();
    }
  }, []);
  useEffect(() => {
    stopWatchTimerRef.current = stopWatchTimer;
  }, [stopWatchTimer]);

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
    linkingURI: 'sea://timer',
  };

  const stopTimer = async () => {
    await AsyncStorage.setItem('currTime', new Date().toISOString());
    await AsyncStorage.setItem('pausedTime', stopWatchTimer.toString());
    await setIlsStopped(!isStopped);
    await AsyncStorage.setItem('timerStatus', 'paused');
    BackgroundService.stop();
    setIsResume(true);
    setResumeToggle(true);
    translateX.value = 0;
    if (timerRef.current) {
      timerRef.current.stop();
    }
  };

  async function pauseTimer() {
    let status =
      (await AsyncStorage.getItem('timerStatus')) === 'paused' ? true : false;
    let pausedTime = await AsyncStorage.getItem('pausedTime');
    setIsResume(false);
    setResumeToggle(false);
    if (status && pausedTime !== null) {
      startTimer(undefined, pausedTime);
    }
  }

  async function resetTimer() {
    setIsRunning(false);
    setResumeToggle(false);
    setStopWatchTimer(0);
    stopWatchTimerRef.current = 0;
    setProgress(0);
    setIsResume(false);
    await BackgroundService.stop();
    await AsyncStorage.removeItem('timerStatus');
    await AsyncStorage.removeItem('pausedTime');
    await AsyncStorage.removeItem('timertime');
    await AsyncStorage.removeItem('currTime');
    if (timerRef.current) {
      timerRef.current.stop();
      timerRef.current = null;
    }
  }

  useEffect(() => {
    async function changeProgress() {
      let isPaused =
        (await AsyncStorage.getItem('timerStatus')) === 'paused' ? true : false;
      if (isRunning && !resume) {
        if (Number(stopWatchTimer) >= 0 && !isPaused) {
          let progress = 1 - stopWatchTimer / totalTime;
          progress = Math.max(0, Math.min(progress, 1));
          setProgress(progress);
        } else if (Number(stopWatchTimer) >= 0 || isPaused) {
          let totalTimePaused = await AsyncStorage.getItem('timertime');
          setResumeToggle(true);
          let progress = 1 - stopWatchTimer / Number(totalTimePaused);
          progress = Math.max(0, Math.min(progress, 1));
          setProgress(progress);
        }
      }
    }
    changeProgress();
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
          <View style={screenStyles.loaderBox}>
            <ProgressLoader
              time={formatTime(stopWatchTimer)}
              progress={progress}
            />
            {/* <CircleProgressBar /> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {resumeToggle && (
                <>
                  <IconButton
                    icon="play"
                    mode="contained"
                    size={30}
                    onPress={pauseTimer}
                  />
                  <IconButton
                    icon="delete"
                    mode="contained"
                    size={30}
                    onPress={resetTimer}
                  />
                </>
              )}
            </View>

            <View style={screenStyles.swipeBtnContainer}>
              <GestureHandlerRootView>
                <View style={screenStyles.swipeBtn}>
                  <GestureDetector gesture={pan}>
                    <View>
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
