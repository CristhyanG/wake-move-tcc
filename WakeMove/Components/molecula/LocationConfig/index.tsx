import React, { useEffect } from 'react';
import * as Location from 'expo-location';

const LocationPermissions: React.FC = () => {
  useEffect(() => {
    // Função para solicitar permissões de localização
    const requestLocationPermissions = async () => {
      try {
        // Solicita permissão para acessar a localização em primeiro plano
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus !== 'granted') {
          console.log('Permissão de localização em primeiro plano negada');
          return;
        }

        // Solicita permissão para acessar a localização em segundo plano
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
          console.log('Permissão de localização em segundo plano negada');
          return;
        }

        console.log('Permissões de localização concedidas');
      } catch (error) {
        console.error('Erro ao solicitar permissões de localização:', error);
      }
    };

    // Chama a função para solicitar permissões de localização
    requestLocationPermissions();
  }, []);

  return null; // Este componente não precisa renderizar nada
};

export default LocationPermissions;
