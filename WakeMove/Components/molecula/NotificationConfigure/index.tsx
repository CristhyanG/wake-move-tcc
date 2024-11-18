import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const NotificationConfig: React.FC = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      // Solicita permissões de notificação
      if (Platform.OS === 'ios') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões para notificações para isso funcionar!');
        }
      } else if (Platform.OS === 'android') {
        // Cria canal de notificações para Android
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default Notifications',
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
          vibrationPattern: [0, 250, 250, 250],
          enableVibrate: true,
        });
      }
    };

    setupNotifications();

    // Configura o comportamento das notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    return () => {
      // Cancela todas as notificações ao desmontar o componente
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, []);

  return null;
};

export default NotificationConfig;
