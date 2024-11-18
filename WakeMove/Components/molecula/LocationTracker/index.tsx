import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const LOCATION_TASK_NAME = 'user-location-task';

const LocationTracker: React.FC<{ checkPosition: (lat: number, lon: number) => void }> = ({ checkPosition }) => {
  useEffect(() => {
    // Definir a tarefa de localização antes de qualquer coisa
    TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: { data: { coords: Location.LocationObjectCoords }, error: any }) => {
      if (error) {
        console.error('Erro na tarefa de localização:', error);
        return;
      }

      if (data) {
        const { coords } = data;
        checkPosition(coords.latitude, coords.longitude); // Chama a função de verificação de posição
      }
    });

    const requestLocationPermissions = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        console.log('Permissão de localização em primeiro plano negada');
        return;
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        console.log('Permissão de localização em segundo plano negada');
        return;
      }

      console.log('Permissões de localização concedidas');
      await startLocationUpdates();
    };

    const startLocationUpdates = async () => {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // Atualiza a cada 1 segundo
        distanceInterval: 10, // Atualiza a cada 10 metros
        foregroundService: {
          notificationTitle: 'Wake Move',
          notificationBody: 'Rastreamento da localização em andamento.',
          notificationColor: '#000',
        },
      });
    };

    requestLocationPermissions();

    return () => {
      const stopUpdates = async () => {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
        if (isRegistered) {
          Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).catch((error) => console.error('Erro ao parar atualizações de localização:', error));
        }
      };

      stopUpdates();
    };
  }, [checkPosition]);

  return null; // Este componente não precisa renderizar nada
};

export default LocationTracker;
