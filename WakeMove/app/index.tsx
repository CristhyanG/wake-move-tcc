import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function Index() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [alarmPlaying, setAlarmPlaying] = useState(false);

  // Função para tocar o alarme
  const playAlarm = async () => {
    if (sound) {
      // Se o som já estiver carregado, apenas o reproduza
      await sound.playAsync();
      setAlarmPlaying(true);
    } else {
      // Carrega e reproduz o arquivo de som do alarme
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/Olha O Menino.mp3'),
        { shouldPlay: true, isLooping: true } // Configura o som para repetir indefinidamente
      );
      setSound(sound);
      setAlarmPlaying(true);

      // Definir um limite de tempo de 10 segundos, por exemplo, para parar o alarme automaticamente
      setTimeout(() => {
        stopAlarm();
      }, 10000); // 10 segundos
    }
  };

  // Função para parar o alarme
  const stopAlarm = async () => {
    if (sound) {
      await sound.stopAsync();
      setAlarmPlaying(false);
    }
  };

  // Libera os recursos do som ao desmontar o componente
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      {alarmPlaying ? (
        <Button title="Parar Alarme" onPress={stopAlarm} />
      ) : (
        <Button title="Tocar Alarme" onPress={playAlarm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});