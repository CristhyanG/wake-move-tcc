import { useEffect, useState } from 'react';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { useFinalAddress, useCurrentAddress } from '@/API/Context/AddressContext';

interface BusRoute {
  line: string; //Linha Ônibus
  departureStop: string; //Ponto de partida
  arrivalStop: string; //Ponto de chegada

}

export const useFetchRoute = () => {
  const { finalAddress } = useFinalAddress();
  const { currentAddress } = useCurrentAddress();
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; color: string }[]>([]);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [lastTransitPoint, setLastTransitPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [secondLastTransitPoint, setSecondLastTransitPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [intermediateTransitPoint, setIntermediateTransitPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [transitPoints, setTransitPoints] = useState<{ latitude: number; longitude: number }[]>([]);
  const [duration, setDuration] = useState<string>('')

  useEffect(() => {
    const fetchRoute = async () => {
      if (currentAddress && finalAddress) {
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
              key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
              origin: currentAddress,
              destination: finalAddress,
              mode: 'transit',
              transit_mode: 'bus',
            }
          });

          console.log(response.data)

          if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const legs = route.legs[0];

            let fullRoute: { latitude: number; longitude: number; color: string }[] = [];
            let transitPoints: { latitude: number; longitude: number }[] = [];
            let busRoutes: BusRoute[] = [];

            legs.steps.forEach((step: any) => {
              const points = step.polyline ? step.polyline.points : '';
              if (points) {
                const decodedRoute = polyline.decode(points).map((point: number[]) => ({
                  latitude: point[0],
                  longitude: point[1],
                  color: step.travel_mode === 'WALKING' ? 'blue' : step.travel_mode === 'TRANSIT' ? 'red' : 'gray'
                }));

                fullRoute = [...fullRoute, ...decodedRoute];
                if (step.travel_mode === 'TRANSIT' && step.transit_details) {
  
                  transitPoints.push(...decodedRoute);
                  busRoutes.push({
                    line: step.transit_details.line.short_name,
                    departureStop: step.transit_details.departure_stop.name,
                    arrivalStop: step.transit_details.arrival_stop.name,
                  });
                }
              }
            });

            setRouteCoordinates(fullRoute);
            setBusRoutes(busRoutes);

            if (transitPoints.length >= 3) {
              const lastTransit = transitPoints[transitPoints.length - 1];
              const intermediateTransit = transitPoints[transitPoints.length - 6];

              setLastTransitPoint(lastTransit);
              setIntermediateTransitPoint(intermediateTransit);
            }

            setTransitPoints(transitPoints);

            const durationText = legs.duration.text;
            setDuration(durationText)

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

  return { 
    routeCoordinates, 
    busRoutes,
    lastTransitPoint, 
    secondLastTransitPoint, 
    intermediateTransitPoint,
    transitPoints,
    duration
  };
};
