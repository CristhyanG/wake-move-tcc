import React from 'react';
import { View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

type MapViewComponentProps = {
  routeCoordinates: { latitude: number; longitude: number; color: string }[];
};

const MapViewComponent: React.FC<MapViewComponentProps> = ({ routeCoordinates }) => {
  const groupedRoutes = routeCoordinates.reduce((acc, point) => {
    if (acc.length === 0 || acc[acc.length - 1][0].color !== point.color) {
      acc.push([point]);
    } else {
      acc[acc.length - 1].push(point);
    }
    return acc;
  }, [] as { latitude: number; longitude: number; color: string }[][]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE} // Usando Google Maps
        style={{ flex: 1 }}
        showsUserLocation={true} // Mostra a localização atual do usuário
        followsUserLocation={true} // Fica centralizado na localização do usuário
        showsMyLocationButton={true} // Exibe o botão para centralizar na localização do usuário
      >
        {groupedRoutes.map((segment, index) => (
          <Polyline
            key={index}
            coordinates={segment.map(point => ({ latitude: point.latitude, longitude: point.longitude }))}
            strokeColor={segment[0].color} // Cor de cada segmento de acordo com o tipo de transporte
            strokeWidth={6}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapViewComponent;
