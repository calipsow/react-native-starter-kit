import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

// Funktion zum Umgang mit Push-Benachrichtigungen
function useHandlePushNotifications() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      handlePushNotification(remoteMessage, navigation);
    });

    // Wenn die App im Hintergrund gestartet wird
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log(remoteMessage);
          handlePushNotification(remoteMessage, navigation);
        }
      });

    return unsubscribe;
  }, [navigation]);
}

// Funktion zum Verarbeiten der Push-Benachrichtigung
function handlePushNotification(remoteMessage, navigation) {
  // if (!remoteMessage?.data?.data) return;
  try {
    const values = JSON.parse(remoteMessage.data.data);
    console.log('\n\n', values);
    if (values) {
      switch (values.type) {
        case 'admin':
          navigation.navigate(values.targetScreen, { screen: 'Home' });
          break;
        case 'event':
          navigation.navigate(values.targetScreen, values.params);
          break;
        case 'article':
          navigation.navigate(values.targetScreen, values.params);
          break;
        default:
          navigation.navigate(values.targetScreen);
          break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default useHandlePushNotifications;
