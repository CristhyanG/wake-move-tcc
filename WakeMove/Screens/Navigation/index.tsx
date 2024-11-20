import React, { useEffect, useState } from 'react';
import { View, Alert, Vibration } from 'react-native';
import { useFetchRoute } from '@/Api/Google/Directions/FetchRoutes';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import * as Notifications from 'expo-notifications';
import { getDistance } from '@/Components/Atomo/CalcDistance'; // Função para calcular a distância
import MapViewComponent from '@/Components/molecula/MapView'; // Importando o MapViewComponent
import { useFinalAddress, useCurrentAddress } from '@/Api/Context/AddressContext'; // Importando os hooks do contexto de endereços
import { createFavorite } from '@/data/services/CreateFavorite'; // Função para criar favorito
import { Btn } from '@/Components/Atomo/Button'; // Importando o componente Btn

const NavigationScreen: React.FC = () => {
  const { routeCoordinates, lastTransitPoint, secondLastTransitPoint, intermediateTransitPoint } = useFetchRoute();
  const [alarmActive, setAlarmActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const { finalAddress } = useFinalAddress();  // Pegando o endereço final
  const { currentAddress } = useCurrentAddress();  // Pegando o endereço atual

  // Função para verificar a posição do usuário e disparar o alarme se necessário
  const checkPosition = (userLatitude: number, userLongitude: number): void => {
    console.log(`Verificando a posição do usuário: Latitude: ${userLatitude}, Longitude: ${userLongitude}`);

    if (intermediateTransitPoint) {
      const distanceToIntermediate = getDistance(
        userLatitude,
        userLongitude,
        intermediateTransitPoint.latitude,
        intermediateTransitPoint.longitude
      );

      console.log(`Distância até o ponto intermediário: ${distanceToIntermediate} metros`);

      if (distanceToIntermediate < 10 && !alarmActive) {
        console.log('A distância até o ponto intermediário é menor que 10 metros, ativando o alarme.');
        activateAlarm();
      }
    }
  };

  // Função para ativar o alarme
  const activateAlarm = () => {
    if (alarmActive) return; // Evita múltiplas ativações
    setAlarmActive(true);

    console.log('Alarme ativado');
    const vibrationPattern = [1000, 500, 1000]; // Vibração longa com pausas curtas
    Vibration.vibrate(vibrationPattern, true); // Vibração contínua

    const repeatSpeech = () => {
      if (!alarmActive) return; // Para se o alarme foi cancelado
      Speech.speak('Alerta! Ponto próximo. Prepare-se para descer!', { language: 'pt-BR' });
      setTimeout(repeatSpeech, 5000); // Repete a mensagem a cada 5 segundos
    };

    repeatSpeech();

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alerta Importante!',
        body: 'Ponto próximo! Prepare-se para descer.',
        sound: true,
        sticky: true, // Notificação persistente
      },
      trigger: null,
    });

    Alert.alert('Atenção!', 'Ponto próximo! Prepare-se para descer.', [
      { text: 'Cancelar Alarme', onPress: stopAlarm },
    ]);

    // Cancela automaticamente após 3 minutos
    setTimeout(() => {
      if (alarmActive) stopAlarm();
    }, 180000);
  };

  // Função para cancelar o alarme
  const stopAlarm = () => {
    console.log('Alarme cancelado');
    Vibration.cancel(); // Cancela a vibração
    setAlarmActive(false);
  };

  // Função para obter as atualizações de localização do usuário
  const getUserLocation = async () => {
    console.log('Tentando obter a localização do usuário...');
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Alta precisão
      });
      console.log(`Localização do usuário: Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
      setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
      checkPosition(coords.latitude, coords.longitude);
    } else {
      Alert.alert('Permissões', 'Permissão para acessar a localização foi negada.');
      console.log('Permissão para acessar a localização foi negada.');
    }
  };

  useEffect(() => {
    console.log('Obtendo a localização inicial...');
    getUserLocation();

    // Atualiza a localização a cada 5 segundos
    const locationInterval = setInterval(() => {
      console.log('Atualizando a localização do usuário...');
      getUserLocation();
    }, 5000);

    return () => {
      clearInterval(locationInterval); // Limpa o intervalo quando o componente for desmontado
      console.log('Intervalo de localização limpo');
    };
  }, [intermediateTransitPoint]); // Agora monitora o ponto intermediário

  // Função para salvar os endereços como favoritos
  const saveFavorite = async () => {
    if (currentAddress && finalAddress) {
      const userId = 'user123'; // Exemplo de userId
      const success = await createFavorite(userId, currentAddress, finalAddress); // Chama createFavorite e espera o resultado
  
      if (success) {
        console.log("Favorito salvo com sucesso!");
        // Execute o callback ou outras ações após o sucesso
        handleCallback(); // Chama a função callback local
      } else {
        console.log("Falha ao salvar o favorito.");
      }
    } else {
      Alert.alert('Endereços Incompletos', 'Por favor, verifique os endereços antes de salvar.');
    }
  };

  // Função do callback local
  const handleCallback = () => {
    console.log("Callback executado!");
    // Coloque aqui qualquer outra lógica que você queira executar no callback
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Passando as informações para o MapViewComponent */}
      <MapViewComponent
        intermediateTransitPoint={intermediateTransitPoint}
        radius={10}
        routeCoordinates={routeCoordinates}
        lastTransitPoint={lastTransitPoint}
        secondLastTransitPoint={secondLastTransitPoint}
      />
      
      {/* Botão para salvar os endereços como favoritos */}
      <Btn title="Salvar como Favorito" onPress={saveFavorite} />
    </View>
  );
};

export default NavigationScreen;
