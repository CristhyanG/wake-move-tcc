import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useGeocode } from '@/Api/Google/Geocoding/Context';

interface MapViewProps {
  routeCoordinates: Array<{ latitude: number; longitude: number }>;
}

const MapViewComponent: React.FC<MapViewProps> = ({ routeCoordinates }) => {
  const { origin, destination } = useGeocode();

  const initialRegion = {
    latitude: origin ? origin.latitude : -23.55052,
    longitude: origin ? origin.longitude : -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
      >
        {origin && (
          <Marker
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="Origem"
            pinColor="green"
          />
        )}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Destino"
            pinColor="red"
          />
        )}

        {/* Rota */}
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={2}
          strokeColor="blue"
        />
      </MapView>
    </View>
  );
};

export default MapViewComponent;
