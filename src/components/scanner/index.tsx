import { View, Text, StyleSheet, Alert, Linking, ActivityIndicator, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraDevice, CodeScanner, useCameraDevice, useCameraPermission, useSkiaFrameProcessor } from 'react-native-vision-camera'
import styles from '../InputElement/style'
import Icon from 'react-native-vector-icons/Fontisto'

import Flash from 'react-native-vector-icons/Entypo'
import { Skia } from '@shopify/react-native-skia'



type Props = {
    checkPermission: () => void;
    setOpenScanner: (value: boolean) => void
}
export default function Scanner({ checkPermission, setOpenScanner }: Props) {

    const [loading, setLoading] = useState(false)

    const [result, setResult] = useState<unknown>()
    const device: any | null = useCameraDevice('back')
    // console.log(device.hasTorch, 'yuf')

    const [error, setError] = useState('')

    const codeScanner: CodeScanner = {
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes, frames) => {
            if (!frames) {
                setError('Please Place the qr in the camera view')
            } else {
                setError('')
            }
            for (const code of codes) {
                setResult(code)
                Alert.alert('Success', 'Click to open the result', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Ok', onPress: () => Linking.openURL(`${code.value}`),
                        style: 'destructive'
                    },
                ]);
                setLoading(true)
                if (loading && flash) {
                    setFlash(false)
                }
                setOpenScanner(false)

            }
        },
    }
    if (device === null) {
        return (
            <Text style={{ color: 'red' }}>No device Found</Text>
        )
    }
    useEffect(() => {
        checkPermission()
        setResult('')
    }, [])
    const { width, height } = Dimensions.get('screen')
    const [flash, setFlash] = useState(false)
    console.log(result)

    // const frameProcessor = useSkiaFrameProcessor((frame) => {
    //     'worklet'
    //     frame.render()
    //     const centerX = frame.width / 2
    //     const centerY = frame.height / 2
    //     const rect = Skia.XYWHRect(centerX, centerY, 150, 150)
    //     const paint = Skia.Paint()
    //     paint.setColor(Skia.Color('red'))
    //     frame.drawRect(rect, paint)
    //   }, [])
    return (
        <View style={{ flex: 1 }} >
            <Camera
                style={{ width, height, }}
                device={device}
                // photo={true}
                isActive={true}
                codeScanner={codeScanner}
                enableZoomGesture={true}
                torch={flash ? 'on' : 'off'}
                // frameProcessor={frameProcessor}
            />
            {
                !loading &&
                <ActivityIndicator color={'red'} style={{ position: 'absolute', alignSelf: 'center', top: '55%' }} />
            }
            <View style={{ position: 'absolute', right: 30, top: 20, zIndex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 50 }} >
                <Flash name='flash' color={'black'} size={30} onPress={() => setFlash(!flash)} onLongPress={() => setFlash(false)} />
            </View>
            <Text style={{ color: 'red', position: 'absolute', top: '60%', left: '50%', zIndex: 1, backgroundColor: 'yellow', textAlign: 'center' }}>{error}</Text>
            <Icon name='close' color={'white'} style={{ position: 'absolute', right: 20, bottom: 30, }} size={40} onPress={() => setOpenScanner(false)} />
            <Image source={require('./scanImg.png')} style={{ zIndex: 1, position: 'absolute', alignSelf: 'center', top: height / 6, width: '100%' }} />
        </View>
    )
}