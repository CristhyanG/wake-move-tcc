import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NotificationConfig: React.FC = () => {
  useEffect(() => {
    // Solicita permissões para notificações
    const requestPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões para notificações para isso funcionar!');
        return;
      }
    };

    requestPermissions();

    // Configura o comportamento das notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    return () => {
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, []);

  return null;
};

export default NotificationConfig;
