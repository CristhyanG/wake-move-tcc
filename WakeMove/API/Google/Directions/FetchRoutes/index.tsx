import { useEffect, useState } from 'react';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { useFinalAddress, useCurrentAddress } from '@/Api/Context/AddressContext';

export const useFetchRoute = () => {
  const { finalAddress } = useFinalAddress();
  const { currentAddress } = useCurrentAddress();
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; color: string }[]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (currentAddress && finalAddress) {
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
              key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY', // Substitua pela sua chave da API
              origin: currentAddress,
              destination: finalAddress,
              mode: 'transit',
              transit_mode: 'bus',
            }
          });

          if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const legs = route.legs[0];

            let fullRoute: { latitude: number; longitude: number; color: string }[] = [];

            legs.steps.forEach((step: any) => {
              const points = step.polyline ? step.polyline.points : '';
              if (points) {
                console.log('Step travel mode:', step.travel_mode); // Log para verificar o modo de viagem
                const decodedRoute = polyline.decode(points).map((point: number[]) => ({
                  latitude: point[0],
                  longitude: point[1],
                  color: step.travel_mode === 'WALKING' ? 'blue' : step.travel_mode === 'TRANSIT' ? 'red' : 'gray'
                }));
                fullRoute = [...fullRoute, ...decodedRoute];
              }
            });

            setRouteCoordinates(fullRoute);
            // console.log('Full Route:', fullRoute); // Log para verificar a rota completa
          } else {
            console.error('No routes found');
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    };

    fetchRoute();
  }, [currentAddress, finalAddress]);

  return { routeCoordinates };
};
