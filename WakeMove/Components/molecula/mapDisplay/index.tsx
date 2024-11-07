import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from "@/API/Context/LocationProvider"
import {styles} from "./styles"

export const MapDisplay = () => {
    const location = useLocation();

    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Você está aqui"
                    />
                </MapView>
            ) : (
                <Text>Aguardando localização...</Text>
            )}
        </View>
    );
}
