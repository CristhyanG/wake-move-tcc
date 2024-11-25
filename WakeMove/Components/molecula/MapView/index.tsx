import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';

type MapViewComponentProps = {
  routeCoordinates: { latitude: number; longitude: number; color: string }[]; // Coordenadas da rota
  lastTransitPoint: { latitude: number; longitude: number } | null; // Último ponto de trânsito
  intermediateTransitPoint:  { latitude: number; longitude: number } | null;
  radius: number;
};

const MapViewComponent: React.FC<MapViewComponentProps> = ({
  routeCoordinates,
  lastTransitPoint,
  intermediateTransitPoint,
  radius,
}) => {
  const [region, setRegion] = useState<any>(null);

  useEffect(() => {
    console.log('Último ponto de TRANSIT:', lastTransitPoint);

    if (routeCoordinates.length > 0) {
      const latitudes = routeCoordinates.map(point => point.latitude);
      const longitudes = routeCoordinates.map(point => point.longitude);

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLon = Math.min(...longitudes);
      const maxLon = Math.max(...longitudes);

      const latitudeDelta = maxLat - minLat;
      const longitudeDelta = maxLon - minLon;

      // Ajuste no cálculo da região para garantir um zoom adequado
      setRegion({
        latitude: (minLat + maxLat) / 2,
        longitude: (minLon + maxLon) / 2,
        latitudeDelta: Math.max(latitudeDelta * 1.5, 0.01), // Garantir que o zoom não fique muito apertado
        longitudeDelta: Math.max(longitudeDelta * 1.5, 0.01), // Garantir que o zoom não fique muito apertado
      });
    }
  }, [routeCoordinates]);

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
      {region && (
        <MapView
          provider={PROVIDER_GOOGLE} // Usando Google Maps
          style={{ flex: 1 }}
          region={region} // Define a região inicial
          showsUserLocation={true} // Mostra a localização atual do usuário
          followsUserLocation={true} // Fica centralizado na localização do usuário
          showsMyLocationButton={true} // Exibe o botão para centralizar na localização do usuário
        >
          {groupedRoutes.map((segment, index) => (
            <Polyline
              key={index}
              coordinates={segment.map(point => ({
                latitude: point.latitude,
                longitude: point.longitude,
              }))}
              strokeColor={segment[0].color} // Cor de cada segmento
              strokeWidth={6}
            />
          ))}

          {/* Marcadores para os pontos de último e penúltimo transit */}
          {lastTransitPoint && (
            <Marker
              coordinate={lastTransitPoint}
              pinColor="green"
              title="Último Ponto de TRANSIT"
            />
          )}

          {/* Círculo de ativação de 500 metros ao redor do último ponto de TRANSIT */}
          {intermediateTransitPoint && (
            <Circle
              center={intermediateTransitPoint} // Centro do círculo é o último ponto de TRANSIT
              radius={radius} // Raio de 500 metros
              strokeWidth={1}
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.2)"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

export default MapViewComponent;
