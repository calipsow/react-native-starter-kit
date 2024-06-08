import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

function useHandlePushNotifications() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      handlePushNotification(remoteMessage, navigation);
    });

    // When the app is started in the background
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handlePushNotification(remoteMessage, navigation);
        }
      });

    return unsubscribe;
  }, [navigation]);
}


function handlePushNotification(remoteMessage, navigation) {
  // if (!remoteMessage?.data?.data) return;
  try {
    const values = JSON.parse(remoteMessage.data.data);
    console.log('push notification data ->', values);
    if (values) {
      switch (true) {
        case !values.targetScreen:
          console.warn('no targetScreen was specified in the push notification data')
          break;
        case !values.params:
          navigation.navigate(values.targetScreen);
          break;
        default:
          navigation.navigate(values.targetScreen, values.params);
          break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default useHandlePushNotifications;
