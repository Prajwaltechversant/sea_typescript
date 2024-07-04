import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, Linking, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScreenContext } from '../../context/ScreenContextProvider';
import { useTheme } from '@react-navigation/native';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { addTrack, setupPlayer } from '../../../musicPlayerService';
import { ActivityIndicator } from 'react-native-paper';
import SliderComponent from '../../components/slider';
import TrackPlayer, { PlaybackState, State, useActiveTrack, usePlaybackState, useProgress } from 'react-native-track-player';
import axios from 'axios';
import options from '../../services/songs';

import Blemanager from 'react-native-ble-manager'

const Screen2: React.FC = () => {

  const screenContext = useScreenContext();
  const { colors } = useTheme();

  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(screenContext, screenContext[isPortrait ? 'windowWidth' : 'windowHeight'], screenContext[isPortrait ? 'windowHeight' : 'windowWidth'], colors);


  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const playBackState = usePlaybackState()
  // console.log(playBackState)

  const { position, buffered, duration } = useProgress()

  const activeTrack = useActiveTrack()


  const [connectedDevices, setConnectedDevices] = useState([]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      const allGranted = Object.values(permissions).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
      return allGranted;
    }
    return true;
  };
  const initializeBluetooth = async () => {
    try {
      const permissionGranted = await requestPermissions();
      if (!permissionGranted) {
        console.log('Permissions not granted');
        return;
      }

      await Blemanager.start({ showAlert: false });
      console.log('Bluetooth initialized');

      setTimeout(() => {
        getConnectedDevices();
      }, 2000); 
    } catch (error) {
      console.error('Error initializing Bluetooth:', error);
    }
  };

  const getConnectedDevices = async () => {
    try {
      // const peripheralsArray = await Blemanager.scan([],2000,true)
      const peripheralsArray = await Blemanager.getConnectedPeripherals([])
      console.log('Connected devices:', peripheralsArray);
    } catch (error) {
      console.error('Error fetching connected devices:', error);
    }
  };

  useEffect(() => {
    initializeBluetooth();
  }, []);


  // next song
  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext()

    } catch (error) {
      console.log(error)

    }
  }

  //previous song
  const skipToPrevious = async () => {

    try {
      await TrackPlayer.skipToPrevious()

    } catch (error) {
      console.log(error)
    }
  }

  const togglePlayBack = async (playback: State) => {
    try {
      const currentTrack = await TrackPlayer.getActiveTrackIndex();
      if (currentTrack !== undefined && currentTrack !== null) {
        const { state }: any = playback
        if (state === State.Paused || state === State.Ready) {
          try {
            await TrackPlayer.play();
          } catch (error) {
            console.log(error);
          }
        } else if (state === State.Playing) {
          await TrackPlayer.pause();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const setupPlayerReady = async () => {
    let isSetup = await setupPlayer()
    if (isSetup) {
      await addTrack()
    }
    setIsPlayerReady(isSetup)
  }

  // const getConnectedDevices = async () => {
  //   const permission = PermissionsAndroid.check('android.permission.BLUETOOTH_CONNECT')
  //   const requestPermissions =
  //     await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  //     ]);
  //     console.log(requestPermissions)
  //     try {
  //       Blemanager.start({ showAlert: false });
  
  //       setTimeout(() => {
  //         Blemanager.getConnectedPeripherals([]).then((peripheralsArray) => {
  //           console.log(peripheralsArray, 'connected devices');
  //           // setConnectedDevices(peripheralsArray);
  //         });
  //       }, 2000); 
  //     } catch (error) {
  //       console.error('Error fetching connected devices:', error);
  //     }
  // }

  useEffect(() => {
    setupPlayerReady()
    // getConnectedDevices()
  }, [])

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )

  }

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.headerText} >Spotify</Text>

      <View style={screenStyles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          pagingEnabled

        >

          <View style={screenStyles.imageContainer}>
            <Image source={{ uri: activeTrack?.artwork }} style={screenStyles.thumbnail} />

          </View>

          <View id='player' style={screenStyles.playerContainer}>
            <Text>{activeTrack?.title}</Text>
            <Text>{activeTrack?.artist}</Text>
            <View>

              <SliderComponent progress={position} duration={duration} />
            </View>

            <View style={screenStyles.playerOptionsContainer}>

              <TouchableOpacity>
                <AntDesign name='heart' style={screenStyles.optionIcon} />

              </TouchableOpacity>
              <TouchableOpacity onPress={skipToPrevious}>
                <MaterialCommunityIcons name='skip-previous' style={screenStyles.optionIcon} />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
                <AntDesign
                  name={playBackState.state == State.Playing ? "pause" : 'play'}
                  style={[screenStyles.optionIcon, { fontSize: 50 }]} />

              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext}>
                <MaterialCommunityIcons name='skip-next' style={screenStyles.optionIcon} />

              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name='remove-circle-outline' style={screenStyles.optionIcon} />

              </TouchableOpacity>
            </View>
            <View style={[screenStyles.moreInfoContainer,]}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name='headphones' style={screenStyles.optionIcon} color={'green'} />
                <Text style={{ color: 'green' }}>airpodes 141</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name='share' style={screenStyles.optionIcon} />

              </TouchableOpacity>
            </View>

            <View style={screenStyles.lyricsContainer}>

            </View>
            <View style={screenStyles.lyricsContainer}>

            </View>


          </View>

        </ScrollView>

      </View>
    </View>
  )
}


export default Screen2