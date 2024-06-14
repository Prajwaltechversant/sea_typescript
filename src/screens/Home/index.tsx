import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Camera, CameraDevice, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import styles from './style'

export default function Home() {
  const { hasPermission, requestPermission } = useCameraPermission()
  console.log(hasPermission)
  const device:any = useCameraDevice('back')
  // console.log(device)
  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [])


  return (
    <View>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  )
}