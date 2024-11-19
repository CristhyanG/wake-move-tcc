import { useEffect, useState } from 'react';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { useFinalAddress, useCurrentAddress } from '@/Api/Context/AddressContext';

export const useFetchRoute = () => {
  const { finalAddress } = useFinalAddress();
  const { currentAddress } = useCurrentAddress();
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; color: string }[]>([]);
  const [lastTransitPoint, setLastTransitPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [secondLastTransitPoint, setSecondLastTransitPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [intermediateTransitPoint, setIntermediateTransitPoint] = useState<{ latitude: number; longitude: number } | null>(null); // Novo ponto intermediário
  const [transitPoints, setTransitPoints] = useState<{ latitude: number; longitude: number }[]>([]);

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

          if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const legs = route.legs[0];

            let fullRoute: { latitude: number; longitude: number; color: string }[] = [];
            let transitPoints: { latitude: number; longitude: number }[] = [];

            legs.steps.forEach((step: any) => {
              const points = step.polyline ? step.polyline.points : '';
              if (points) {
                const decodedRoute = polyline.decode(points).map((point: number[]) => ({
                  latitude: point[0],
                  longitude: point[1],
                  color: step.travel_mode === 'WALKING' ? 'blue' : step.travel_mode === 'TRANSIT' ? 'red' : 'gray'
                }));

                fullRoute = [...fullRoute, ...decodedRoute];

                // Adiciona pontos de TRANSIT ao array transitPoints
                if (step.travel_mode === 'TRANSIT') {
                  decodedRoute.forEach((point: { latitude: number; longitude: number }) => {
                    transitPoints.push({ latitude: point.latitude, longitude: point.longitude });
                  });
                  console.log(`TRANSPORT TYPE: TRANSIT`);
                } else if (step.travel_mode === 'WALKING') {
                  console.log(`TRANSPORT TYPE: WALKING`);
                } else {
                  console.log(`TRANSPORT TYPE: ${step.travel_mode}`);
                }
              }
            });

            setRouteCoordinates(fullRoute);

            // Identificar o último, penúltimo e intermediário ponto de TRANSIT
            if (transitPoints.length >= 3) {
              const lastTransit = transitPoints[transitPoints.length - 1];
              const secondLastTransit = transitPoints[transitPoints.length - 9];
              const intermediateTransit = transitPoints[transitPoints.length -7]; // Ponto intermediário

              setLastTransitPoint(lastTransit);
              setSecondLastTransitPoint(secondLastTransit);
              setIntermediateTransitPoint(intermediateTransit); // Configurar o ponto intermediário
            }

            // Definir os pontos de trânsito para o retorno
            setTransitPoints(transitPoints);
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
    lastTransitPoint, 
    secondLastTransitPoint, 
    intermediateTransitPoint, // Retornar o ponto intermediário
    transitPoints 
  };
};
