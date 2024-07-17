import { View, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useScreenContext } from '../../../context/ScreenContextProvider';
import styles from './style';
import BackgroundService from 'react-native-background-actions';
import ProgressLoader from '../../../components/progressLoader';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const downloadFile = async (taskDataArguments) => {
  const { url } = taskDataArguments;
  const date = new Date();
  const fileName = `${date.getTime()}_sample.pdf`;
  const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  const res = RNFS.downloadFile({
    fromUrl: url,
    toFile: path,
    background: true,
    progressDivider: 1,
    begin: (res) => {
      console.log('Download has begun');
    },
    progress: (res) => {
      const progress = (res.bytesWritten / res.contentLength) * 100;
      console.log(`Progress: ${(progress / 100).toFixed(2)}%`);
      taskDataArguments.onProgress((progress / 100).toFixed(2));
    },
  });

  res.promise
    .then(res => {
      console.log('File downloaded successfully:', res);
      BackgroundService.stop();
    })
    .catch(err => {
      console.error('File download error:', err);
      BackgroundService.stop();
    });

  while (BackgroundService.isRunning()) {
    await sleep(1000);
  }
};

const BackgroundTask = () => {
  const { colors } = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const downloadRef = useRef(null);
  const [cancelFn, setCancelFn] = useState(null);

  const fetchBlob = async (taskDataArguments) => {
    const { url } = taskDataArguments;
    let dirs = ReactNativeBlobUtil.fs.dirs;
    const date = new Date();
    const fileName = `${date.getTime()}_sample.pdf`;
    const filePath = `${dirs.DocumentDir}/${fileName}`;

    console.log('Download has begun');
    setStatus('Download has begun');

    const task = ReactNativeBlobUtil
      .config({
        path: filePath,
        addAndroidDownloads: {
          useDownloadManager: true, 
          notification: true,
          description: 'File downloaded by download manager.',
          
      }
      })
      .fetch('GET', url);

    task.progress((received, total) => {
      let progress = (received / total) * 100;
      setProgress(progress.toFixed(2));
      console.log(`Progress: ${progress.toFixed(2)}%`);
      taskDataArguments.onProgress((progress / 100).toFixed(2));
    });

    downloadRef.current = task.cancel

    try {
      const response = await task;

      if (response.info().status === 200) {
        console.log('Download successful');
        console.log(`File saved to: ${response.path()}`);
        setStatus('Download successful');
      } else {
        console.log('Download failed with status:', response.info().status);
        setStatus(`Download failed with status: ${response.info().status}`);
      }
    } catch (error) {
      if (error.message === 'Task has been cancelled') {
        console.log('Download canceled');
        setStatus('Download canceled');
      } else {
        console.error('Download error:', error.message);
        setStatus(`Download error: ${error.message}`);
      }
    }
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'Downloading File',
    taskDesc: 'Downloading In Background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      url: 'https://ia600502.us.archive.org/2/items/NASA_NTRS_Archive_19760019130/NASA_NTRS_Archive_19760019130.pdf',
      onProgress: setProgress,
    },
  };

  const download = async () => {
    await BackgroundService.start(downloadFile, options);
  };

  const fetchBlobMethod = async () => {
    await BackgroundService.start(fetchBlob, options);
  };

  const cancelDownload = async () => {

    if (downloadRef.current) {
      downloadRef.current()
    }
  };

  return (
    <View style={screenStyles.container}>
      <TouchableOpacity style={screenStyles.downloadBtn} onPress={download}>
        <Text>Download using RNFS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={screenStyles.downloadBtn} onPress={fetchBlobMethod}>
        <Text>Download using Fetch Blob</Text>
      </TouchableOpacity>

      <TouchableOpacity style={screenStyles.downloadBtn} onPress={()=>cancelDownload()}>
        <Text>Cancel Fetch Blob Download</Text>
      </TouchableOpacity>

      {/* <ProgressLoader progress={progress} /> */}
      <Text>Status: {status}</Text>
    </View>
  );
};

export default BackgroundTask;
