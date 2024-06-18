import { View, Text, PermissionsAndroid, Linking, Button, Alert, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { isLocationEnabled } from 'react-native-android-location-enabler';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import MapView from 'react-native-maps';
// import UrlTile from 'react-native-maps'

interface Position {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number | null;
        accuracy: number;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    };
    timestamp: number;
}


export default function GeoLoaction() {



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
        // console.log(currenntLocation)
    }, [])




    const getLocation = async () => {

        const hasPermission = await checkPermission()
        console.log(hasPermission, 'aka')
        if (hasPermission) {
            const hasGPS = await isLocationEnabled()
            if (hasGPS) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        // console.log(position)
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

        } else {
            checkPermission()
        }
    }
    console.log(currenntLocation)
    console.log(resultStatus)
    const width = Dimensions.get('screen').width


    //    useEffect(()=>{
    //    Geolocation.watchPosition(
    //         (posistion)=>{
    //             setCurrentLocation(posistion)
    //         },
    //         (error)=>{
    //             console.log(error)
    //         },
    //     )
    //    },[])
    // console.log(currenntLocation)


    const openMap = async () => {
        let url = `geo:0,0?q=${currenntLocation?.coords.latitude},${currenntLocation?.coords.longitude}`
        await Linking.openURL(url)
    }

    const [date, setDate] = useState('')

    const convertToDate = () => {
        let time: Date | string = currenntLocation?.timestamp
        const date = new Date(time)
        let readableDate = date.toTimeString()
        console.log(readableDate)
        setDate(readableDate)
    }
    useEffect(() => {
        convertToDate()
    }, [currenntLocation])

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            (position) => {
                setCurrentLocation(position)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>GeoLoaction</Text>
            <TouchableOpacity style={{ backgroundColor: 'green', width: width / 2, borderRadius: 10, height: 40, justifyContent: 'center' }} onPress={getLocation}>
                <Text style={{ textAlign: 'center', color: 'white' }} >Print Location details</Text>
            </TouchableOpacity>
            {currenntLocation &&
                <>
                    <View style={{ backgroundColor: '#bce887', justifyContent: 'center', alignItems: 'center', height: 'auto', width: '100%', marginTop: 50 }}>
                        <Text style={[styles.text, { marginVertical: 30 }]}>Date & Time:{date}</Text>
                        <Text style={[styles.text]}>latitude:{currenntLocation.coords.latitude}</Text>
                        <Text style={styles.text}>altitude:{currenntLocation.coords.altitude}</Text>
                        <Text style={styles.text}>longitude:{currenntLocation.coords.longitude}</Text>
                        <Text style={styles.text}>accuracy:{currenntLocation.coords.accuracy}</Text>
                        <Text style={styles.text}>altitudeAccuracy:{currenntLocation.coords.altitudeAccuracy}</Text>
                        <Text style={styles.text}>Speed:{currenntLocation.coords.speed}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: 'green', width: width - 40, borderRadius: 10, height: 50, marginTop: 20, justifyContent: 'center' }} onPress={openMap} >
                        <Text style={{ textAlign: 'center', color: 'white' }} >View Your current location in Google Map</Text>
                    </TouchableOpacity>
                    {/* <MapView provider='google'
                    
                    initialRegion={{
                        latitude: currenntLocation.coords.latitude,
                        longitude: currenntLocation.coords.longitude,
                        // latitudeDelta:currenntLocation.coords.la,
                        // longitudeDelta: 0.0421,
                      }}
                      /> */}


                </>


            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        textAlign: 'left',
        fontSize: 20,
        textAlignVertical: 'center',
        alignSelf: 'auto'
    }
})