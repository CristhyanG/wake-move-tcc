import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const LOCATION_TASK_NAME = 'user-location-task';

const LocationTracker: React.FC<{ checkPosition: (lat: number, lon: number) => void }> = ({ checkPosition }) => {
  useEffect(() => {
    // Define a tarefa de localização
    TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: { data?: { coords: Location.LocationObjectCoords }, error?: any }) => {
      if (error) {
        console.error('Erro na tarefa de localização:', error);
        return;
      }

      if (!data || !data.coords) {
        console.warn('Dados de localização não disponíveis.');
        return;
      }

      const { latitude, longitude } = data.coords;
      checkPosition(latitude, longitude); // Chama a função para verificar a posição

      // Enviar notificação para debug (pode ser removido em produção)
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Localização Atualizada',
          body: `Latitude: ${latitude}, Longitude: ${longitude}`,
        },
        trigger: null, // Disparo imediato
      });
    });

    // Função para solicitar permissões de localização
    const requestLocationPermissions = async () => {
      try {
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
      } catch (error) {
        console.error('Erro ao solicitar permissões de localização:', error);
      }
    };

    // Função para iniciar atualizações de localização
    const startLocationUpdates = async () => {
      try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
        if (!isRegistered) {
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
          console.log('Atualizações de localização iniciadas');
        }
      } catch (error) {
        console.error('Erro ao iniciar atualizações de localização:', error);
      }
    };

    // Solicita permissões e inicia o rastreamento
    requestLocationPermissions();

    // Limpa as atualizações quando o componente é desmontado
    return () => {
      const stopUpdates = async () => {
        try {
          const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
          if (isRegistered) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
            console.log('Atualizações de localização paradas');
          }
        } catch (error) {
          console.error('Erro ao parar atualizações de localização:', error);
        }
      };

      stopUpdates();
    };
  }, [checkPosition]);

  return null; // Este componente não precisa renderizar nada
};

export default LocationTracker;
