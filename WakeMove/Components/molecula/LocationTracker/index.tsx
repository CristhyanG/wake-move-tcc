import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const LOCATION_TASK_NAME = 'user-location-task';

const LocationTracker: React.FC<{ checkPosition: (lat: number, lon: number) => void }> = ({ checkPosition }) => {
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }
    };

    requestLocationPermission();

    TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: { data: { coords: Location.LocationObjectCoords }, error: any }) => {
      if (error) {
        console.error('Erro na tarefa de localização:', error);
        return;
      }

      if (data) {
        const { coords } = data;
        checkPosition(coords.latitude, coords.longitude);
      }
    });

    const startLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        });
      }
    };

    startLocationUpdates();

    return () => {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    };
  }, [checkPosition]);

  return null;
};

export default LocationTracker;
