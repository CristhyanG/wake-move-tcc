import React, { useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import axios from 'axios';

interface BusStopProps {
  location: { latitude: number; longitude: number };
}

interface BusStop {
  lat: number;
  lng: number;
  name: string;
}

const BusStops: React.FC<BusStopProps> = ({ location }) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);

  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
          params: {
            key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
            location: `${location.latitude},${location.longitude}`,
            radius: 700, // Raio de busca em metros
            type: 'bus_station'
          }
        });

        const data = response.data.results.map((place: any) => ({
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          name: place.name
        }));

        setBusStops(data);
        console.log('Bus stops:', data);
      } catch (error) {
        console.error('Error fetching bus stops:', error);
      }
    };

    fetchBusStops();
  }, [location]);

  return (
    <>
      {busStops.length > 0 && busStops.map((busStop, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: busStop.lat,
            longitude: busStop.lng,
          }}
          title={busStop.name || 'Bus Stop'}
        />
      ))}
    </>
  );
};

export default BusStops;
