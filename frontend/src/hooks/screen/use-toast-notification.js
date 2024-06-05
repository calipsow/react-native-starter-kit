import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';

// normal | success | warning | danger | custom
// slide-in | zoom-in
export const useToastNotify = () => {
  const [shownToastIDs, setShownTostIDs] = useState([]);
  const toast = useToast();

  const showToastNotification = ({
    msg = 'some toasty notification',
    type = 'normal',
    placement = 'top',
    duration = 5000,
    offset = 30,
    animationType = 'slide-in',
  }) => {
    let id = toast.show(msg || 'Task finished successfully', {
      type: type || 'normal',
      placement: placement || 'bottom',
      duration: duration || 4000,
      offset: offset || 30,
      animationType: animationType || 'slide-in',
    });
    setShownTostIDs([...shownToastIDs, id]);
    return id;
  };

  const hideToasts = ({ hideAll = false, id = '' }) => {
    if (shownToastIDs.length < 1) {
      console.log('no toasts to hide with this instance');
      return;
    }
    if (!id && !hideAll) {
      console.log('you need to provide a toast id or clear every toast');
      return;
    }
    if (hideAll) {
      toast.hideAll();
      return;
    }
    if (id) {
      shownToastIDs.includes(id)
        ? toast.hide(id)
        : console.log('id', id, 'was not found in this toast instance');
      return;
    }
  };
  return {
    showToastNotification,
    hideToasts,
    toast,
  };
};
