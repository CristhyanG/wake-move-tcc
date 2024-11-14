// FetchRoute.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { useFinalAddress, useCurrentAddress } from '@/Api/Context/AddressContext';

export const useFetchRoute = () => {
  const { finalAddress } = useFinalAddress();
  const { currentAddress } = useCurrentAddress();
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; }[]>([]);

  useEffect(() => {
    const fetchBusRoutes = async () => {
      if (currentAddress && finalAddress) {
        try {
          console.log('Current Address:', currentAddress);
          console.log('Final Address:', finalAddress);

          const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
              key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
              origin: currentAddress,
              destination: finalAddress,
              mode: 'transit',
              transit_mode: 'bus'
            }
          });

          console.log('API Response:', response.data);

          if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
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

  return routeCoordinates;
};
