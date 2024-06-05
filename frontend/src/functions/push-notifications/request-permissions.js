import messaging from '@react-native-firebase/messaging';
import writeDocument from '../firestore/write-document-async';
import { Push_Notification_Token } from '../../constants/firestore-schemes';
import { Platform } from 'react-native';
import { resolveRole } from '../../hooks/auth/use-auth-listener';

async function requestUserPermission(accountCtx) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled && accountCtx && accountCtx?.uid) {
    // console.log('Authorization status:', authStatus);
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('refresh push token to', token);
    Push_Notification_Token.token = token;
    Push_Notification_Token.created_at = new Date(new Date().getTime());
    Push_Notification_Token.device_type = Platform.OS;
    Push_Notification_Token.uid = accountCtx.uid;
    Push_Notification_Token.user_role = await resolveRole(accountCtx.uid);
    Push_Notification_Token.username =
      accountCtx?.firebase_auth_data?.displayName;

    await writeDocument(
      'Notification_Tokens',
      accountCtx.uid,
      Push_Notification_Token,
    );
  }

  return enabled;
}

export default requestUserPermission;
