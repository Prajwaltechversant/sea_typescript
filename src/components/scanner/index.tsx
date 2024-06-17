import { View, Text, StyleSheet, Alert, Linking, ActivityIndicator, Image, Dimensions, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraDevice, CodeScanner, useCameraDevice, useCameraPermission, useSkiaFrameProcessor } from 'react-native-vision-camera'
import Icon from 'react-native-vector-icons/Fontisto'
import Flash from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native'
import notifee, { AndroidColor, AndroidImportance, AndroidVisibility, TimestampTrigger, TriggerType } from '@notifee/react-native';
import RNQRGenerator from 'rn-qr-generator';
import Animated, { useSharedValue } from 'react-native-reanimated'


import RNFS, { DownloadDirectoryPath } from 'react-native-fs'

type Props = {
    checkPermission: () => void;
    setOpenScanner: (value: boolean) => void
}


const Scanner: React.FC<Props> = ({ checkPermission, setOpenScanner }) => {

    const [loading, setLoading] = useState(false)

    const [result, setResult] = useState<string>('')
    const device: any | null = useCameraDevice('back')
    // console.log(device.hasTorch, 'yuf')

    const [error, setError] = useState('')

    const [image, setImage] = useState<string>('')

    const codeScanner: CodeScanner = {
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes, frames) => {
            if (!frames) {
                setError('Please Place the qr in the camera view')
            } else {
                setError('')
            }
            for (const code of codes) {
                console.log(typeof (code.value))
                setResult(code.value ? code.value : '')
                Alert.alert('Success', 'Click to open the result', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Download',
                        onPress: () => downLoadResult(code.value ? code.value : ''),
                        style: 'destructive'
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

    console.log(result)
    const handleImageSelection = async () => {

        try {
            const res = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            })
            setImage(res?.path)
        }
        catch (err) {
            console.log("failed:", err);
        }
    }
    // console.log(image)

    const opacity = useSharedValue(1)
    const [downLoadingProgress, setDownLoadingProgress] = useState<string>('0')
    const scanImage = async () => {
        try {
            if (!image) {
                throw new Error('No image selected.');
            }
            const res = await RNQRGenerator.detect({
                uri: image,
            });
            setResult(res.values[0])
            if (res.values[0]) {
                Alert.alert('Success', 'Click to open the result', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Download',
                        onPress: () => downLoadResult(res.values[0] ? res.values[0] : ''),
                        style: 'destructive'
                    },
                    {
                        text: 'Ok', onPress: () => Linking.openURL(`${res.values[0]}`),
                        style: 'destructive'
                    },
                ]);
            } else {
                // opacity.value = 0.6
                ToastAndroid.showWithGravityAndOffset(
                    'Scanning Failed !, please try with another image',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
            setLoading(true)
            // console.log(rest)

        } catch (error) {
            console.log('QR Code detection error:', error);
        }
    };

    // console.log(opacity.value)


    const downLoadResult = async (url: string) => {
        console.log(result)  // '' empty
        const date = new Date()
        // console.log(date.getTime())
        const fileName = `${date.getTime()}_sample.pdf`
        await RNFS.mkdir(RNFS.DownloadDirectoryPath)
        const path = `${RNFS.DownloadDirectoryPath}/${fileName}`
        try {

            const downLoadedFile = await RNFS.downloadFile({
                fromUrl: result ? result : url,
                toFile: path,
                
            
                progress(res) {
                    let progressPercent = (res.bytesWritten / res.contentLength) * 100;
                    console.log(progressPercent.toFixed(2))
                    setDownLoadingProgress(progressPercent.toFixed(2))
                },
            })
            console.log(path)
            // await downLoadedFile.promise
            const res = await downLoadedFile.promise
            await notifee.requestPermission()
            if (res.statusCode === 200) {
                const channelId = await notifee.createChannel({
                    id: 'default',
                    name: 'Default Channel',
                    importance: AndroidImportance.HIGH,
                    vibration: true,
                    visibility: AndroidVisibility.PUBLIC

                });
                await notifee.displayNotification(
                    {
                        title: 'Download Completed',
                        body: `${fileName}`,
                        android: {
                            channelId: channelId,

                        },
                    },
                );
            }
        } catch (error) {
            console.log(error, 'failed')
        }
    }


    useEffect(()=>{
        console.log(downLoadingProgress,'...')
    }, [downLoadingProgress])
    return (
        <View style={{ backgroundColor: 'black', flex: 1, width }}>
            {!image ?
                <View style={{ flex: 1 }} >
                    <View >
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
                    </View>
                    {
                        !loading &&
                        <ActivityIndicator color={'red'} style={{ position: 'absolute', alignSelf: 'center', top: '55%' }} />
                    }
                    <View style={{ position: 'absolute', right: 30, top: 20, zIndex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 50 }} >
                        <Flash name={flash ?'flash-off' : 'flash'} color={'black'} size={30} onPress={() => setFlash(!flash)} onLongPress={() => setFlash(false)} />
                    </View>
                    <Text style={{ color: 'red', position: 'absolute', top: '60%', left: '50%', zIndex: 1, backgroundColor: 'yellow', textAlign: 'center' }}>{error}</Text>
                    <Icon name='close' color={'white'} style={{ position: 'absolute', right: 20, bottom: 30, }} size={40} onPress={() => setOpenScanner(false)} />
                    <Flash name='folder-multiple-image' color={'white'} style={{ position: 'absolute', left: 20, bottom: 30, }} size={40}
                        onPress={handleImageSelection}
                    />
                    <Image source={require('./scanImg.png')} style={{ zIndex: 1, position: 'absolute', alignSelf: 'center', top: height / 6, width: '100%' }} />
                </View>
                :
                <View style={{ backgroundColor: 'black', flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Image source={{
                        uri: image
                    }} style={{ width: '100%', height: height / 2 }} />
                    <TouchableOpacity style={{ backgroundColor: 'green', height: 40, width: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }} onPress={scanImage}>
                        <Text style={{ color: 'black' }}>Scan Qr</Text>
                    </TouchableOpacity>
                    <Flash name='images' color={'white'} style={{ position: 'absolute', left: 20, bottom: 30, }} size={40}
                        onPress={handleImageSelection}
                    />
                    <Icon name='close' color={'white'} style={{ position: 'absolute', right: 20, bottom: 30, }} size={40} onPress={() => setOpenScanner(false)} />
                </View>
            }
        </View>
    )
}


export default Scanner