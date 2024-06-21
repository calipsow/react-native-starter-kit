import { useState } from 'react';
import functions from '@react-native-firebase/functions';
import '@react-native-firebase/functions';
import { fbImage } from '../../constants/constants';

/**
 * A custom React hook to manage the process of sending push notifications via Firebase Functions.
 * Supports broadcasting notifications to all app users and sending targeted notifications to individual users.
 *
 * returns  An object containing functions for sending notifications, and states indicating the operation status.
 */
const useBroadcastPushNotification = () => {
  const [loading, setLoading] = useState(false); // Indicates if the notification request is in progress
  const [succeed, setSucceed] = useState(false); // Indicates if the notification request was successful
  const [error, setError] = useState(null); // Holds any error that occurs during the notification request process

  /**
   * Sends a push notification to all app users.
   *
   * @param {Object} params - Parameters for the notification.
   * @param {string} params.title - Title of the notification.
   * @param {string} params.body - Body text of the notification.
   * @param {string} params.imageUrl - URL of the image to display in the notification (defaults to a constant image).
   * @param {Object} params.data - Additional data to accompany the notification for handling app navigation or other actions.
   */
  const broadcastNotification = async ({
    title = 'Ship Native',
    body = 'Ship Native notifications',
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

  /**
   * Sends a targeted push notification to a specific user.
   *
   * @param {Object} params - Parameters for the targeted notification.
   * @param {string} params.imageUrl - URL of the image for the notification.
   * @param {string} params.body - Body text of the notification.
   * @param {Object} params.data - Additional data for the notification. That object need to contain `targetScreen: string` for routing the user if he clicks on the notification and the `params: object` value containing additional params you may want to pass the navigation
   * @param {string} params.token - Firebase Cloud Messaging token of the target user.
   * @param {string} params.title - Title of the notification.
   * @param {string} params.sendToUserUID - UID of the user to whom the notification is being sent.
   */
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
          'You cant send push notification to user without a token or valid data.',
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
