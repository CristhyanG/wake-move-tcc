import React from "react";
import {} from "@/Components/mapView/index"

export const LocationScreen = () => {

    return (
        <View>
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

