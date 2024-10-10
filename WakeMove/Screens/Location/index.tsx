import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
} from "expo-location";

export const LocationScreen = () => {
    const [location, setLocation] = useState<LocationObject | null>(null);

    async function permissaoUsuario() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            try {
                const currentPosition = await getCurrentPositionAsync();
                setLocation(currentPosition);
                console.log("Localização atual: ", currentPosition);
            } catch (error) {
                console.error("Erro ao obter localização: ", error);
            }
        } else {
            console.log("Não foi possível acessar a localização");
        }
    }

    useEffect(() => {
        permissaoUsuario();
    }, []); // Adicionado array vazio para evitar chamadas infinitas

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});