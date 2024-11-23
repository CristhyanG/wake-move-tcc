import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissions: React.FC = () => {
  const [permissionStatus, setPermissionStatus] = useState('');

  useEffect(() => {
    // Função para solicitar permissões de localização
    const requestLocationPermissions = async () => {
      try {
        // Solicita permissão para acessar a localização em primeiro plano
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus !== 'granted') {
          console.log('Permissão de localização em primeiro plano negada');
          setPermissionStatus('Permissão de localização em primeiro plano negada');
          showPermissionAlert();
          return;
        }

        // Solicita permissão para acessar a localização em segundo plano
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
          console.log('Permissão de localização em segundo plano negada');
          setPermissionStatus('Permissão de localização em segundo plano negada');
          showPermissionAlert();
          return;
        }

        console.log('Permissões de localização concedidas');
        setPermissionStatus('Permissões de localização concedidas');
      } catch (error) {
        console.error('Erro ao solicitar permissões de localização:', error);
        
        // Verificação de tipo para tratar o erro corretamente
        if (error instanceof Error) {
          setPermissionStatus(`Erro: ${error.message}`);
        } else {
          setPermissionStatus('Erro desconhecido ao solicitar permissões de localização');
        }
      }
    };

    // Função para mostrar alerta de permissão
    const showPermissionAlert = () => {
      Alert.alert(
        'Permissões Necessárias',
        'Para usar este aplicativo, você precisa permitir o acesso à sua localização.',
        [
          { text: 'Tentar Novamente', onPress: requestLocationPermissions },
          { text: 'Cancelar', onPress: () => console.log('Permissão negada') }
        ],
        { cancelable: false }
      );
    };

    // Chama a função para solicitar permissões de localização
    requestLocationPermissions();
  }, []);

  return null
};

export default LocationPermissions;
