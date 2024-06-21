import { useEffect, useState, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import requestUserPermission from '../../functions/push-notifications/request-permissions';
import { AccountContext } from '../../modules/AppView';
import { useNavigation } from '@react-navigation/native';
import { useToastNotify } from '../screen/use-toast-notification';
import { ModalContext } from '../../modules/provider/ModalProvider';
import { handlePushNotification } from './use-navigate-push-notification';

/**
 * Hook that manages push notifications for a React Native app using Firebase Messaging.
 * It handles requesting permissions, receiving new notifications, and user interactions with them.
 *
 * returns  An object containing the last notification and states related to notification handling.
 */
const usePushNotification = () => {
  const { showToastNotification } = useToastNotify();
  const [enabled, setEnabled] = useState(null);
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const { showModalConfirmation } = useContext(ModalContext);
  const [newNotificationArrived, setNewNotificationArrived] = useState(false);
  const [lastNotification, setLastNotification] = useState(null);
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  /**
   * Check and request notification permissions based on the user's account context.
   */
  const getPermissionState = async () => {
    let enabledState = await requestUserPermission(accountCtx);
    setEnabled(enabledState);
  };

  useEffect(() => {
    // Request permissions when account context is available and user is logged in
    if (enabled === null && accountCtx && accountCtx.uid) {
      getPermissionState();
    }
  }, [accountCtx]);

  useEffect(() => {
    // Subscribe to incoming messages while the app is in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setData(JSON.parse(remoteMessage.data.data)); // Parse data payload from notification
      console.log(
        'Notification data received:',
        JSON.parse(remoteMessage.data.data),
      );
      setLastNotification(remoteMessage); // Store the last notification
      setNewNotificationArrived(true); // Set state to trigger modal dialog
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    // Show modal confirmation when a new notification arrives
    if (newNotificationArrived) {
      showModalConfirmation(
        `${lastNotification.notification.title}\n${lastNotification.notification.body}`,
        `See more`,
        () => handlePushNotification(lastNotification, navigation), // Navigate based on notification
      );
      setNewNotificationArrived(false); // Reset state after handling
    }
  }, [newNotificationArrived]);

  return {
    lastNotification,
    newNotificationArrived,
  };
};

export default usePushNotification;
