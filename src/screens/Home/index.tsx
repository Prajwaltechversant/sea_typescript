import { View, Text, StyleSheet, Alert, Linking, useColorScheme } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, CameraDevice, CodeScanner, useCameraDevice, useCameraDevices, useCameraPermission } from 'react-native-vision-camera'
import styles from './style'
import { Button } from '@rneui/base'
import Scanner from '../../components/scanner'
import { Image } from 'react-native'
import { RootStackParams } from '../../stack/MainStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTheme } from '@react-navigation/native'

type NavigaionProps = NativeStackScreenProps<RootStackParams,'TabStack' >

const Home= ({navigation}:NavigaionProps) => {

  const [openScanner, setOpenScanner] = useState(false)

  const { hasPermission, requestPermission } = useCameraPermission()

  const checkPermission = useCallback(async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus()
    if (cameraPermission !== 'granted') {
      Alert.alert('Permission', 'Please allow permission to continoue', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
    }
  }, [])


  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])
  // checkPermission()


  // console.log(openScanner)

  const theme = useColorScheme()
  const {colors} = useTheme()

  return (
    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {
          !openScanner &&
          <>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/021/115/776/original/qr-code-free-png.png'
              }} width={300} height={300}
            />
            <Button
              onPress={() => setOpenScanner(true)}
              title="Scan Now"
              icon={{
                name: 'qrcode',
                type: 'font-awesome',
                size: 15,
                color: colors.text,
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
          </>
        }
        {openScanner &&
          <Scanner checkPermission={checkPermission} setOpenScanner={setOpenScanner} navigation={navigation} />
        }
      </View>


    </View>
  )
}

export default Home