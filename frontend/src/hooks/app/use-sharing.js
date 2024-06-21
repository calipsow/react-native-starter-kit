import { useEffect, useState } from 'react';
import { Linking, Share } from 'react-native';
import { useToastNotify } from '../screen/use-toast-notification';

/**
 * Custom hook to manage and handle sharing content to various services including SMS, WhatsApp,
 * Facebook Messenger, and more generic sharing interfaces provided by the device.
 *
 * returns  An object containing functions for initiating shares to different services,
 * and states indicating the outcome of these sharing actions.
 */
const useSharing = () => {
  const [sharingSucceed, setSharingSucceed] = useState(false); // Indicates if the last sharing action was successful
  const [sharingError, setSharingError] = useState(null); // Stores any error that occurs during a sharing action
  const [loadingSharing, setLoadingSharing] = useState(false); // Indicates if a sharing action is currently in progress
  const { showToastNotification } = useToastNotify(); // Custom hook to show toast notifications for feedback

  /**
   * Updates the sharing status.
   *
   * @param {boolean} loading - Indicates if the sharing process is loading.
   * @param {string|null} error - Error message if an error occurred.
   * @param {boolean} succeed - Indicates if the sharing was successful.
   */
  const updateStatus = (loading, error = null, succeed = false) => {
    setLoadingSharing(loading);
    setSharingError(error);
    setSharingSucceed(succeed);
  };

  /**
   * Tries to open a given URL and falls back to another URL if the first cannot be opened.
   *
   * @param {string} url - Primary URL intended to open.
   * @param {string} fallbackUrl - Fallback URL if the primary URL fails.
   * @param {string} serviceName - The name of the service for logging purposes.
   */
  const openLink = async (url, fallbackUrl, serviceName) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        if (serviceName !== 'SMS')
          // Do not log for SMS as it's a common case
          console.log(`${serviceName} is not installed`);
        await Linking.openURL(fallbackUrl);
      }
      updateStatus(false, null, true);
    } catch (error) {
      console.warn(`Cannot open ${serviceName}:`, error);
      updateStatus(false, `${serviceName} could not be opened.`);
    }
  };

  // Helper functions for sharing via specific services
  const shareToSMS = (text = '') =>
    openLink(
      `sms:?body=${encodeURIComponent(text)}`,
      `sms:?body=${encodeURIComponent(text)}`,
      'SMS',
    );

  const shareToFbMessenger = (text = '') => {
    const url = `fb-messenger://share?link=${encodeURIComponent(text)}`;
    const fallbackUrl = `https://m.me/share?link=${encodeURIComponent(text)}`;
    openLink(url, fallbackUrl, 'Facebook Messenger');
  };

  const shareToWhatsApp = (text = '') => {
    const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
    const fallbackUrl = `https://wa.me/send?text=${encodeURIComponent(text)}`;
    openLink(url, fallbackUrl, 'WhatsApp');
  };

  /**
   * Handles sharing content using the system's share sheet.
   *
   * @param {string} text - The text to share.
   * @param {string} title - The title for the shared content.
   */
  const shareDeepLink = async (text = '', title = 'ZSW APP') => {
    updateStatus(true);
    try {
      const result = await Share.share({
        title: title,
        message: text,
      });

      if (result.action === Share.sharedAction) {
        setSharingSucceed(true);
      } else {
        console.log('Sharing dismissed');
        setSharingSucceed(false);
      }
      updateStatus(false);
    } catch (error) {
      console.error('Error sharing:', error);
      updateStatus(false, error.message, false);
    }
  };

  /**
   * Executes a sharing action based on an identifier.
   *
   * @param {string} action_id - Identifier for the action to execute.
   * @param {string} sharingMessage - Message to be shared.
   */
  const handleSharingAction = (action_id, sharingMessage) => {
    if (!sharingMessage) {
      console.error('No sharing message provided!');
      return;
    }
    const action = actions[action_id];
    if (!action) {
      console.warn('No action defined for:', action_id);
      return;
    }
    action(sharingMessage);
  };

  // Object to map action identifiers to corresponding sharing functions
  const actions = {
    share: shareDeepLink,
    whatsapp: shareToWhatsApp,
    messenger: shareToFbMessenger,
    sms: shareToSMS,
  };

  // Effect to show toast notifications if there is a sharing error
  useEffect(() => {
    if (sharingError) {
      showToastNotification({ msg: sharingError, type: 'normal' });
    }
  }, [sharingError]);

  return {
    sharingSucceed,
    sharingError,
    loadingSharing,
    shareDeepLink,
    shareToWhatsApp,
    shareToFbMessenger,
    shareToSMS,
    handleSharingAction,
  };
};

export default useSharing;
