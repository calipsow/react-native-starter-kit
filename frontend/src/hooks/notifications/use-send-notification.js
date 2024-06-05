import { useState } from 'react';
import functions from '@react-native-firebase/functions';
import '@react-native-firebase/functions';
import { ZSW_LOGO_SOURCE } from '../../constants/constants';

const useBroadcastPushNotification = () => {
  const [loading, setLoading] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState(null);

  const broadcastNotification = async ({
    title = 'Zusammen Stehen Wir',
    body = 'Sie haben eine neue Benachrichtigung',
    imageUrl = ZSW_LOGO_SOURCE,
    data,
  }) => {
    setLoading(true);
    setError(null);
    setSucceed(false);
    try {
      const sendMulticastNotification = functions().httpsCallable(
        'sendPushNotificationToAllAppUsers',
      );
      await sendMulticastNotification({
        title: title,
        body: body,
        imageUrl: imageUrl,
        data: data,
      });
      setLoading(false);
      setSucceed(true);
    } catch (error) {
      setLoading(false);
      setError(error);
      setSucceed(false);
    }
  };

  const sendAdminNotification = async ({
    imageUrl = '',
    body = '',
    data = {},
  }) => {
    setLoading(true);
    setError(null);
    setSucceed(false);
    try {
      const sendPushToAdmins = functions().httpsCallable('sendPushToAdmins');
      await sendPushToAdmins({ imageUrl: imageUrl, body: body, data: data });
      setLoading(false);
      setSucceed(true);
    } catch (error) {
      setLoading(false);
      setError(error);
      setSucceed(false);
    }
  };

  const sendSingleNotification = async ({
    imageUrl = '',
    body = '',
    data = {},
    token,
    title = '',
    sendToUserUID = '',
  }) => {
    setLoading(true);
    setError(null);
    setSucceed(false);
    try {
      if (!token || !Object.keys(data).length)
        throw new Error(
          'You cant sent push to user without a token or valid data',
        );
      const sendPushToUser = functions().httpsCallable('sendPushToUser');
      await sendPushToUser({
        imageUrl: imageUrl,
        body: body,
        title,
        data: data,
        token,
        sendToUserUID,
      });
      setLoading(false);
      setSucceed(true);
    } catch (error) {
      setLoading(false);
      setError(error);
      setSucceed(false);
    }
  };

  return {
    sendSingleNotification,
    broadcastNotification,
    loading,
    succeed,
    error,
    sendAdminNotification,
  };
};

export default useBroadcastPushNotification;
