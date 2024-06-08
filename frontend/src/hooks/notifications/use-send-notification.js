import { useState } from 'react';
import functions from '@react-native-firebase/functions';
import '@react-native-firebase/functions';
import { fbImage } from '../../constants/constants';

const useBroadcastPushNotification = () => {
  const [loading, setLoading] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState(null);

  const broadcastNotification = async ({
    title = 'ship native',
    body = 'ship native notifications',
    imageUrl = fbImage,
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
  };
};

export default useBroadcastPushNotification;
