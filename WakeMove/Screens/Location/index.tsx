
import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useGeocode } from "@/Components/GeocodeProvider";
        
const LocationScreen: React.FC = () => {
  
  const { locations } = useGeocode();

  return (
    <View style={{ flex: 1 }}>
      {locations.length > 0 ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ 
                latitude: location.latitude, 
                longitude: location.longitude
              }}
              title={`Result ${index + 1}`}
            />
          ))}
        </MapView>
      ) : (
        <Text>Carregando localização...</Text>
      )}
    </View>
  );
};

export default LocationScreen;