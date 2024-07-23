import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video, {VideoRef} from 'react-native-video';
import axios from 'axios';
import {log} from 'console';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import styles from './style';
import ProgressLoader from '../../components/progressLoader';
import Loader from '../../components/loader';

export default function VideoStream() {
  const videoRef = useRef<VideoRef>(null);
  // const [allVideos, setAllVideos] = useState([]);

  const [isVideoBuffering, setIsVideoBuffering] = useState(false);

  const navigation = useNavigation();

  // const [pageNo, setPageNo] = useState(20);

  // const api_key = '7w5m55V3kEjfM539FbdiooTn5omqFe5TTI99Wauwysgz29Tmfr5Qors9';

  // const url = `https://api.pexels.com/videos/popular?per_page=${pageNo}`;
  // let uri =
  //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  // const getData = async () => {
  //   const response = await axios.get(url, {
  //     headers: {
  //       Authorization: `${api_key}`,
  //     },
  //   });
  //   const {data} = response;
  //   setAllVideos(data.videos);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  // // console.log(allVideos[0].url);

  useEffect(() => {
    navigation.setOptions({tabBarVisible: false,});
  }, []);

  const onError = (error: any) => {
    console.log(error);
  };
  const onBuffer = (buffer: any) => {
    const {isBuffering} = buffer;
    console.log(buffer, 'pofj');

    if (isBuffering) {
      setIsVideoBuffering(true);
    } else {
      setIsVideoBuffering(false);
    }
  };
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );

  console.log(isVideoBuffering);
  return (
    <View style={screenStyles.container}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        style={screenStyles.backgroundVideo}
        controls
        // controlsStyles={screenStyles.controlStyles}
        fullscreen
        fullscreenAutorotate
        audioOutput="speaker"
        showNotificationControls
        preferredForwardBufferDuration={2}
        playInBackground
        // bufferConfig={}

        minLoadRetryCount={100}
      />

      {isVideoBuffering && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader progress={0.5} />
        </View>
      )}
    </View>
  );
}
