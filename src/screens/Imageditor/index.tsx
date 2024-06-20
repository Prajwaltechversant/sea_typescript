import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, Dimensions, FlatList, Alert, PermissionsAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Blur, Canvas, FitBox, Group, Image, Path, SkImage, SkPath, Skia, useCanvasRef, useTouchHandler, Text as SkText, useFont, useFonts, TextAlign, Paragraph, SkData } from '@shopify/react-native-skia';
import ImageCropPicker from 'react-native-image-crop-picker';
import { tools } from './tools';
import Tools from '../../components/edting tools';
import styles from './style';
import { Modal, Portal, Provider as PaperProvider } from 'react-native-paper';
import { Slider } from '@react-native-assets/slider'
import colorPalette from '../../assets/colorPalette/colorPalette';
import SliderComponent from '../../components/slider';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import { Position } from '../GeoLocation';
import RNFS, { DownloadDirectoryPath } from 'react-native-fs'



export default function Editor() {
  const [image, setImage] = useState<SkImage | null>(null);
  const [rotate, setRotate] = useState(0);
  const { width } = Dimensions.get('screen');
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [blurValue, setBlurValue] = useState<number>(0);
  const imageRef = useCanvasRef();
  const [value, setValue] = useState(0);
  const [draw, setDraw] = useState<Boolean>(false)

  const [currenntLocation, setCurrentLocation] = useState<Position>()
  const [resultStatus, setResultStatus] = useState(false)


  const checkPermission = async () => {
    try {
      const res = await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')
      console.log('permission', res)

      if (!res) {
        const res = await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
        return true
      }
      else {
        return true
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    checkPermission()
  }, [])


  const getLocation = async () => {

    const hasPermission = await checkPermission()
    console.log(hasPermission, 'aka')
    if (hasPermission) {
      const hasGPS = await isLocationEnabled()

      if (hasGPS) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log("insidee fn", position)

            setCurrentLocation(position)
            setResultStatus(true)
          },
          (error) => {

            console.log(error)
            if (error.code === 2) {
              Alert.alert("Please turn on the Location")
              // Linking.openSettings()
            }
            Alert.alert(error.message)
          },
          { enableHighAccuracy: true }

        )
      } else {
        try {
          const enableResult = await promptForEnableLocationIfNeeded();
          console.log('enableResult', enableResult);

        } catch (err) {
          console.log(err)
        }
      }
      console.log(currenntLocation)

    } else {
      checkPermission()
    }
  }


  const font = useFont(require('../../assets/fonts/PlayfairDisplay-Black.ttf'), 12)
  const currentPath = useRef<SkPath | null>()
  // const [path, setPath] = useState(Skia.Path.Make())
  const [path, setPath] = useState<SkPath>(Skia.Path.Make())

  const getImageFromFile = async () => {
    try {
      const res: any = await ImageCropPicker.openPicker({ mediaType: 'photo', includeBase64: true, cropping: true });
      const data = Skia.Data.fromBase64(res.data);
      const skiaImage = Skia.Image.MakeImageFromEncoded(data);
      setImage(skiaImage);
    } catch (error) {
      console.error(error);
    }
  };

  const rotateImage = () => {
    setRotate(rotate + 90);
  };

  // const [paths, setPaths] = useState<any>([]);
  // const pan = Gesture.Pan()
  //   .onStart(({ x, y }) => {
  //     // console.log(x,y, 'started')
  //     // currentPath.current = Skia.Path.Make()
  //     // currentPath.current.moveTo(x, y)
  //     // console.log(currentPath.current)
  //     path.moveTo(x, y)
  //   })
  //   .onChange(({ x, y }) => {
  //     path.lineTo(x, y)
  //     // setPath(path.copy())
  //   })
  //   .onEnd(({ x, y }) => {
  //     // path.lineTo(x, y)
  //     // setPath(path.copy())
  //     path.lineTo(x, y)
  //   });

  // console.log(path)

  const touch = useTouchHandler({
    onStart(touchInfo) {
      const { x, y } = touchInfo
      path?.moveTo(x, y)
    },
    onActive(touchInfo) {
      const { x, y } = touchInfo
      path?.lineTo(x, y)
    },
    onEnd(touchInfo) {
    },

  })
  const resetAndOpenNewImage = async () => {
    setImage(null);
    getImageFromFile();
  };

  const resetPath = () => {
    path.reset()
  }

  // const convertToDate = () => {
  //   let time:any = currenntLocation?.timestamp
  //   const date = new Date(time)
  //   let readableDate = date.toTimeString()
  //   console.log(readableDate)
  //   setDate(readableDate)
  // }
  // useEffect(() => {
  //   convertToDate()
  // }, [currenntLocation])
  const paragraph = useMemo(() => {
    if (!font) {
      return null;
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center
    };
    const textStyle = {
      color: Skia.Color("white"),
      fontFamilies: [""],
      fontSize: 10,
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle)
      .pushStyle(textStyle)
      .addText(`${currenntLocation?.coords.latitude}`)
      .pushStyle({ ...textStyle, fontStyle: { weight: 500 } })
      .addText(`\n${new Date().toDateString()}`)
      .pop()
      .build();
  }, [font]);

  const saveImage = async () => {
    const imageValue: any = imageRef.current?.makeImageSnapshot().encodeToBase64();
    const date = new Date()
    const fileName = `${date.getTime()}_sample.jpeg`
    console.log(fileName)
    try {
      const path = `${RNFS.DownloadDirectoryPath}/${fileName}`
      await RNFS.mkdir(RNFS.DownloadDirectoryPath)
      await RNFS.writeFile(path, imageValue, 'base64')
      Alert.alert(`${fileName} saved at ${path.slice(5)}..`)
    } catch (error) {
      console.log(error, 'failed')
    }
  }   


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={resetAndOpenNewImage}>
          <MaterialCommunityIcons name="plus-circle-outline" size={40} color={colorPalette.imageEdior.btnGray} />
        </TouchableOpacity>
        {path && <TouchableOpacity
          onPress={resetPath}
        >
          <MaterialCommunityIcons name="undo-variant" size={40} color={colorPalette.imageEdior.btnGray} />
        </TouchableOpacity>}
        <TouchableOpacity
          onPress={saveImage}
        >
          <MaterialIcons name="save" color={colorPalette.imageEdior.btnGray} size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {!image && (
          <Pressable style={styles.pressableContainer} onPress={getImageFromFile}>
            <MaterialCommunityIcons name="plus-circle-outline" size={200} color={colorPalette.imageEdior.btnGray} />
            <Text style={styles.pressableText}>Tap anywhere to open a photo</Text>
          </Pressable>
        )}
        {image && (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            {/* <GestureHandlerRootView> */}
            {/* <GestureDetector gesture={pan} > */}
            <Canvas ref={imageRef} style={{ width: width - 40, height: width - 40 }}
              onTouch={touch}
            >
              <Group
                origin={{ x: (width - 40) / 2, y: (width - 40) / 2 }}
                transform={[{ rotate: (rotate * Math.PI) / 180 }]}
              >
                <Image x={0} y={0} image={image} width={width - 40} height={width - 40} fit="cover" />
                <Blur blur={blurValue} mode="clamp" />
                {
                  draw &&
                  <Path path={path} style={'stroke'} color={'red'} strokeWidth={2} />

                }
                {/* <SkText 
                font={font}
                x={5}
                y={width-48}
                color={'white'}          
                text={locationText}
                   /> */}
                <Paragraph paragraph={paragraph} x={150} y={320} width={300} />
              </Group>
            </Canvas>
            {/* </GestureDetector> */}
            {/* </GestureHandlerRootView> */}
          </View>
        )}
      </View>
      <PaperProvider>
        <Portal>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, width: width - 40, alignSelf: 'center' }}>
            <Modal visible={visible} onDismiss={hideModal}>
              <View style={{}} >
                <SliderComponent blurValue={blurValue} setBlurValue={setBlurValue} hideModal={hideModal} />
              </View>
            </Modal>
          </View>
        </Portal >
      </PaperProvider >
      {image && (
        <View style={styles.footerContainer}>
          <FlatList
            data={tools}
            renderItem={({ item }) => (
              <Tools
                item={item}
                rotateImage={rotateImage}
                setRotate={setRotate}
                showModal={showModal}
                hideModal={hideModal}
                setBlurValue={setBlurValue}
                setDraw={setDraw}
                draw={draw}
              />
            )}
            horizontal
          />
        </View>
      )
      }
    </View >
  );
}
