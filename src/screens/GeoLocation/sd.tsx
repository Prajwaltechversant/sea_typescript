import { View, Text, PermissionsAndroid, Linking, Button, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';

export default function GeolocationComponent() {

    const [currentLocation, setCurrentLocation] = useState(null);

    const checkPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!granted) {
                    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    return response === PermissionsAndroid.RESULTS.GRANTED;
                }
                return true;
            } else {
                const response = await Geolocation.requestAuthorization();
                return response === 'granted';
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    useEffect(() => {
        checkPermission();
    }, []);

    const enableGPS = () => {
        Alert.alert(
            'Enable GPS',
            'GPS is required to get your current location. Please enable GPS in settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ],
            { cancelable: false }
        );
    };

    const getLocation = async () => {
        const hasPermission = await checkPermission();
        if (hasPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation(position);
                    console.log(position);
                },
                (error) => {
                    console.log(error);
                    if (error.code === 2) {
                        enableGPS();
                    }
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } else {
            Linking.openSettings();
        }
    };

    return (
        <View>
            <Text>Geolocation</Text>
            <Button title='Get Location' color={'blue'} onPress={getLocation} />
            {currentLocation && (
                <Text>
                    Latitude: {currentLocation.coords.latitude}, Longitude: {currentLocation.coords.longitude}
                </Text>
            )}
        </View>
    );
}
