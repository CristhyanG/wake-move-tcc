import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import polyline from '@mapbox/polyline'; // Importe o decodificador de polylines
import { useGeocode } from '@/Api/Google/Geocoding/Context'; // Importe o contexto de geocodificação
import { useFinalAddress, useCurrentAddress } from '@/Api/Context/AddressContext'; // Importe os hooks de endereço
import BusStops from '@/Api/Google/Places/BusStops'; // Importe o componente BusStops

interface BusStop {
  lat: number;
  lng: number;
  name: string;
}

const NavigationScreen = () => {
  const { origin, destination, locationsHistory } = useGeocode(); // Utilize o contexto de geocodificação
  const { finalAddress } = useFinalAddress(); // Utilize o endereço final do contexto
  const { currentAddress } = useCurrentAddress(); // Utilize o endereço atual do contexto
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; }[]>([]);
  const initialRegion = {
    latitude: origin ? origin.latitude : -23.55052,
    longitude: origin ? origin.longitude : -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const fetchBusRoutes = async () => {
      if (currentAddress && finalAddress) {
        try {
          console.log('Current Address:', currentAddress); // Log do endereço atual
          console.log('Final Address:', finalAddress); // Log do endereço final

          const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
              key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
              origin: currentAddress,
              destination: finalAddress,
              mode: 'transit'
            }
          });

          console.log('API Response:', response.data); // Log da resposta da API

          if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const legs = route.legs;

            // Log detalhado dos modos de transporte
            legs.forEach((leg: any) => {
              leg.steps.forEach((step: any) => {
                console.log('Travel Mode:', step.travel_mode);
              });
            });

            const points = route.overview_polyline.points;
            const decodedRoute = polyline.decode(points).map((point: number[]) => ({
              latitude: point[0],
              longitude: point[1]
            }));
            setRouteCoordinates(decodedRoute);
          } else {
            console.error('No routes found');
          }
        } catch (error) {
          console.error('Error fetching bus routes:', error);
        }
      }
    };

    fetchBusRoutes();
  }, [currentAddress, finalAddress]);

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

export default NavigationScreen;
