import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useFetchRoute } from '@/Api/Google/Directions/FetchRoutes';
import MapViewComponent from '@/Components/molecula/MapView';
import NotificationConfig from '@/Components/molecula/NotificationConfigure';
import LocationTracker from '@/Components/molecula/LocationTracker';

const NavigationScreen: React.FC = () => {
  const routeCoordinates = useFetchRoute();
  const [alarmActive, setAlarmActive] = useState(false);

  const checkPosition = (userLatitude: number, userLongitude: number): void => {
    if (routeCoordinates.length > 1) {
      const penultimatePoint = routeCoordinates[routeCoordinates.length - 2];
      const lastPoint = routeCoordinates[routeCoordinates.length - 1];

      const distanceToPenultimate = getDistance(
        userLatitude,
        userLongitude,
        penultimatePoint.latitude,
        penultimatePoint.longitude
      );
      const distanceToLast = getDistance(
        userLatitude,
        userLongitude,
        lastPoint.latitude,
        lastPoint.longitude
      );

      if (distanceToPenultimate < 100 && distanceToLast < 500) {
        activateAlarm();
      }
    }
  };

  const activateAlarm = () => {
    if (!alarmActive) {
      setAlarmActive(true);
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Atenção!',
          body: 'Você está próximo do seu destino.',
          sound: true,
        },
        trigger: null, // Trigger imediato
      });
    }
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3;
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon1 - lon2) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <View style={{ flex: 1 }}>
      <NotificationConfig />
      <LocationTracker checkPosition={checkPosition} />
      <MapViewComponent routeCoordinates={routeCoordinates} />
    </View>
  );
};

export default NavigationScreen;
