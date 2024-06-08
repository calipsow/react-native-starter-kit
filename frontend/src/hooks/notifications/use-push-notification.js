import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import requestUserPermission from '../../functions/push-notifications/request-permissions';
import { useContext } from 'react';
import { AccountContext } from '../../modules/AppView';
import { useNavigation } from '@react-navigation/native';
import { useToastNotify } from '../screen/use-toast-notification';
import { ModalContext } from '../../modules/provider/ModalProvider';

const usePushNotification = () => {
  const { showToastNotification } = useToastNotify();
  const [enabled, setEnabled] = useState(null);
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const { showModalConfirmation } = useContext(ModalContext);
  const [newNotificationArrived, setNewNotificationArrived] = useState();
  const [lastNotification, setLastNotification] = useState(null);
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  const getPermissionState = async () => {
    let enabledState = await requestUserPermission(accountCtx);
    setEnabled(enabledState);
  };

  useEffect(() => {
    if (enabled === null && accountCtx && accountCtx?.uid) {
      getPermissionState();
    }
  }, [accountCtx]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setData(JSON.parse(remoteMessage.data.data));
      console.log(JSON.parse(remoteMessage.data.data));
      setLastNotification(remoteMessage.notification);
      setNewNotificationArrived(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (newNotificationArrived) {
      showModalConfirmation(
        `${lastNotification.title}\n${lastNotification.body}`,
        `See more`,
        () => {
          navigation.navigate(data.targetScreen, data.params);
        },
      );
      setNewNotificationArrived(false);
    }
  }, [newNotificationArrived]);

  return {
    lastNotification,
    setNewNotificationArrived,
    newNotificationArrived,
  };
};

export default usePushNotification;
