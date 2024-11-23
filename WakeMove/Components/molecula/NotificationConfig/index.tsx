import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const NotificationConfig: React.FC = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Solicita permissões de notificação e configurações específicas por plataforma
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões para notificações para isso funcionar!');
          return;
        }

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'Default Notifications',
            importance: Notifications.AndroidImportance.HIGH,
            sound: 'default',
            vibrationPattern: [1000, 500, 1000],
            enableVibrate: true,
          });
        }
      } catch (error) {
        console.error('Erro ao configurar notificações:', error);

        // Verificação de tipo para tratar o erro corretamente
        if (error instanceof Error) {
          console.error('Erro ao configurar notificações:', error.message);
        } else {
          console.error('Erro desconhecido ao configurar notificações');
        }
      }
    };

    setupNotifications();

    // Configura o comportamento padrão das notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    return () => {
      // Cancela todas as notificações ao desmontar o componente
      Notifications.cancelAllScheduledNotificationsAsync().catch(error => {
        console.error('Erro ao cancelar notificações:', error);

        // Verificação de tipo para tratar o erro corretamente
        if (error instanceof Error) {
          console.error('Erro ao cancelar notificações:', error.message);
        } else {
          console.error('Erro desconhecido ao cancelar notificações');
        }
      });
    };
  }, []);

  return null;
};

export default NotificationConfig;
