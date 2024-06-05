import { useEffect, useState } from 'react';
import { Linking, Share } from 'react-native';
import { useToastNotify } from '../screen/use-toast-notification';

const useSharing = () => {
  const [sharingSucceed, setSharingSucceed] = useState(false);
  const [sharingError, setSharingError] = useState(null);
  const [loadingSharing, setLoadingSharing] = useState(false);
  const { showToastNotification } = useToastNotify();

  const updateStatus = (loading, error = null, succeed = false) => {
    setLoadingSharing(loading);
    setSharingError(error);
    setSharingSucceed(succeed);
  };

  const openLink = async (url, fallbackUrl, serviceName) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        if (serviceName !== 'SMS')
          console.log(`${serviceName} ist nicht installiert`);
        await Linking.openURL(fallbackUrl);
      }
      updateStatus(false, null, true);
    } catch (error) {
      console.warn(`can not open ${serviceName}`, error);
      updateStatus(false, `${serviceName} konnte nicht geöffnet werden.`);
    }
  };

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

  const handleSharingAction = (action_id, sharingMessage) => {
    if (!sharingMessage) {
      console.error('no sharingMessage provided!');
      return;
    }
    const action = actions[action_id];
    if (!action) {
      console.warn('no action defined for', action_id);
      return;
    }
    action(sharingMessage);
  };

  const actions = {
    share: shareDeepLink,
    whatsapp: shareToWhatsApp,
    messenger: shareToFbMessenger,
    sms: shareToSMS,
  };

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
