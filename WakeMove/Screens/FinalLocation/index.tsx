import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import polyline from '@mapbox/polyline'; // Importe o decodificador de polylines
import { useGeocode } from '@/Api/Google/Geocoding/Context'; // Importe o contexto de geocodificação
import BusStops from '@/Api/Google/Places/BusStops'; // Importe o componente BusStops

interface BusStop {
  lat: number;
  lng: number;
  name: string;
}

const FinalLocationScreen = () => {
  const { origin, destination, locationsHistory } = useGeocode(); // Utilize o contexto de geocodificação
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; }[]>([]);
  const initialRegion = {
    latitude: origin ? origin.latitude : -23.55052,
    longitude: origin ? origin.longitude : -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const fetchBusRoutes = async () => {
      if (origin && destination) {
        try {
          console.log('Origin:', origin); // Log da origem
          console.log('Destination:', destination); // Log do destino

          const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
              key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
              origin: `${origin.latitude},${origin.longitude}`,
              destination: `${destination.latitude},${destination.longitude}`,
              mode: 'transit'
            }
          });

          console.log('API Response:', response.data); // Log da resposta da API

          if (response.data.routes && response.data.routes.length > 0) {
            const points = response.data.routes[0].overview_polyline.points;
            const route = polyline.decode(points).map((point: number[]) => ({
              latitude: point[0],
              longitude: point[1]
            }));
            setRouteCoordinates(route);
          } else {
            console.error('No routes found');
          }
        } catch (error) {
          console.error('Error fetching bus routes:', error);
        }
      }
    };

    fetchBusRoutes();
  }, [origin, destination]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
      >
        {/* Paradas de ônibus */}
        {origin && <BusStops location={origin} />}

        {/* Marcadores de origem e destino */}
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

export default FinalLocationScreen;
