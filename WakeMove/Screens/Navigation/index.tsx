import React, { useState } from 'react';
import { View, Vibration, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Speech from 'expo-speech';
import { useFetchRoute } from '@/Api/Google/Directions/FetchRoutes';
import MapViewComponent from '@/Components/molecula/MapView';
import NotificationConfig from '@/Components/molecula/NotificationConfigure';
import LocationTracker from '@/Components/molecula/LocationTracker';

const NavigationScreen: React.FC = () => {
  const { routeCoordinates } = useFetchRoute(); // Garantir que routeCoordinates está sendo desestruturado corretamente
  const [alarmActive, setAlarmActive] = useState(false);

  // Função para verificar a posição do usuário e disparar o alarme se necessário
  const checkPosition = (userLatitude: number, userLongitude: number): void => {
    if (routeCoordinates && routeCoordinates.length > 1) {
      // Encontrar o último ponto de TRANSIT
      const lastTransitIndex = routeCoordinates.map(point => point.color).lastIndexOf('red');
      const lastTransitPoint = routeCoordinates[lastTransitIndex];

      const distanceToLastTransit = getDistance(
        userLatitude,
        userLongitude,
        lastTransitPoint.latitude,
        lastTransitPoint.longitude
      );

      // Adicionar log para verificar a distância ao último ponto de TRANSIT
      console.log('Distância até o último ponto de TRANSIT:', distanceToLastTransit);

      // Ativa o alarme se a distância for menor que os limites estabelecidos
      if (distanceToLastTransit < 100) {
        activateAlarm();
      }
    }
  };

  // Função para ativar o alarme com vibração, TTS, notificações e alerta visual
  const activateAlarm = () => {
    if (!alarmActive) {
      console.log('Alarme ativado'); // Adiciona log para verificar a ativação do alarme
      setAlarmActive(true);

      // 1. Disparar vibração personalizada
      const vibrationPattern = [500, 1000, 500]; // Vibra 500ms, pausa 1s, vibra 500ms
      Vibration.vibrate(vibrationPattern, true); // "true" para vibração contínua

      // 2. Disparar Text-to-Speech
      Speech.speak('Você está próximo do seu destino. Prepare-se para descer.', {
        language: 'pt-BR',
        rate: 1.0, // Velocidade da fala
      });

      // 3. Disparar notificação persistente
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Atenção!',
          body: 'Você está próximo do seu destino. Prepare-se para descer.',
          sound: true,
          sticky: true, // Notificação persistente
        },
        trigger: null, // Disparo imediato
      });

      // 4. Exibir alerta visual (extra para redundância)
      Alert.alert(
        'Atenção!',
        'Você está próximo do destino. Prepare-se para descer.',
        [
          {
            text: 'Entendido',
            onPress: () => {
              setAlarmActive(false); // Desativa alarme ao confirmar
              Vibration.cancel(); // Cancela a vibração contínua
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  // Função para calcular a distância entre dois pontos usando a fórmula de Haversine
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Retorna a distância em metros
  };

  return (
    <View style={{ flex: 1 }}>
      <NotificationConfig />
      <LocationTracker checkPosition={checkPosition} />
      <MapViewComponent
        routeCoordinates={routeCoordinates} // Passa as coordenadas da rota
      />
    </View>
  );
};

export default NavigationScreen;
