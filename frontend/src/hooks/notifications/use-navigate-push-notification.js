import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

/**
 * Custom hook to handle incoming push notifications and navigate accordingly.
 * It listens to notifications that open the app and notifications received while the app has started.
 */
function useHandlePushNotifications() {
  const navigation = useNavigation(); // Hook from React Navigation to control navigation stack

  useEffect(() => {
    // Listen for notifications that caused the app to open from a quit state
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      handlePushNotification(remoteMessage, navigation);
    });

    // Check whether an initial notification exists when the app is launched from a terminated state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handlePushNotification(remoteMessage, navigation);
        }
      });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);
}

/**
 * Handles the action when a push notification is received.
 * Parses the notification data and navigates to the specified screen with parameters if provided.
 *
 * @param {object} remoteMessage - Object representing the received push notification.
 * @param {object} navigation - Navigation object from React Navigation to perform navigation actions.
 */
export function handlePushNotification(remoteMessage, navigation) {
  try {
    // Extract and parse the data from the push notification
    const values = JSON.parse(remoteMessage.data.data);
    console.log('Push notification data ->', values);

    if (values) {
      // Determine navigation action based on the data received
      switch (true) {
        case !values.targetScreen:
          console.warn(
            'No targetScreen was specified in the push notification data',
          );
          break;
        case !values.params:
          // Navigate to the specified screen without parameters if none are provided
          navigation.navigate(values.targetScreen);
          break;
        default:
          // Navigate to the specified screen with parameters
          navigation.navigate(values.targetScreen, values.params);
          break;
      }
    }
  } catch (error) {
    console.error(
      'An error occurred while handling incoming push notification:',
      error.message,
    );
  }
}

export default useHandlePushNotifications;
