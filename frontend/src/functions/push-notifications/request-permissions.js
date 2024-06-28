import messaging from '@react-native-firebase/messaging';
import writeDocument from '../firestore/write-document-async';
import { PUSH_NOTIFICATION_TOKEN } from '../../constants/firestore-schemes';
import { Platform } from 'react-native';
import { resolveRole } from '../../hooks/auth/use-auth-listener';

async function requestUserPermission(accountCtx) {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled && accountCtx && accountCtx?.uid) {

      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('refresh push token to', token);
      PUSH_NOTIFICATION_TOKEN.token = token;
      PUSH_NOTIFICATION_TOKEN.created_at = new Date(new Date().getTime());
      PUSH_NOTIFICATION_TOKEN.device_type = Platform.OS;
      PUSH_NOTIFICATION_TOKEN.uid = accountCtx.uid;
      
      await writeDocument(
        'Notification_Tokens',
        accountCtx.uid,
        PUSH_NOTIFICATION_TOKEN,
      );
    }

    return enabled;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export default requestUserPermission;
