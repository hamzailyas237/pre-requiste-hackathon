
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});





export default Location = () => {

    const [currentLatitude, setCurrentLatitude] = useState('')
    const [currentLongiitude, setCurrentLongiitude] = useState('')

    useEffect(() => {
        Geolocation.getCurrentPosition(((data) => {
            console.log();
            setCurrentLatitude(data.coords.latitude)
            setCurrentLongiitude(data.coords.longitude)
        }));
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: currentLatitude,
                    longitude: currentLongiitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: currentLatitude,
                        longitude: currentLongiitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                />

            </MapView>
        </View >
    )
}