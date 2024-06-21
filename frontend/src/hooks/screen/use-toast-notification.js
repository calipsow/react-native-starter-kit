import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';

/**
 * A custom React hook for managing toast notifications within a React Native application.
 * It leverages the `react-native-toast-notifications` library to show and manage these notifications.
 *
 * @returns {Object} An object containing functions to show and hide toast notifications, and the toast instance itself.
 */
export const useToastNotify = () => {
  const [shownToastIDs, setShownToastIDs] = useState([]); // State to track the IDs of shown toasts
  const toast = useToast(); // Hook provided by 'react-native-toast-notifications' to interact with toast notifications

  /**
   * Displays a toast notification with customizable options.
   *
   * @param {Object} options - Configuration options for the toast notification.
   * @param {string} options.msg - Message to be displayed in the toast.
   * @param {string} options.type - Type of the toast (e.g., 'normal', 'success', 'warning', 'danger', 'custom').
   * @param {string} options.placement - Where to place the toast on the screen ('top', 'bottom', etc.).
   * @param {number} options.duration - Duration in milliseconds for which the toast is visible.
   * @param {number} options.offset - Margin between the toast and the edges of the screen.
   * @param {string} options.animationType - Type of animation for showing the toast ('slide-in', 'zoom-in').
   * @returns {string} The ID of the shown toast.
   */
  const showToastNotification = ({
    msg = 'some toasty notification',
    type = 'normal',
    placement = 'top',
    duration = 5000,
    offset = 30,
    animationType = 'slide-in',
  }) => {
    let id = toast.show(msg, {
      type,
      placement,
      duration,
      offset,
      animationType,
    });
    setShownToastIDs(prev => [...prev, id]); // Store the ID of the shown toast
    return id;
  };

  /**
   * Hides one or all toast notifications.
   *
   * @param {Object} options - Options for hiding toasts.
   * @param {boolean} options.hideAll - Whether to hide all toasts.
   * @param {string} options.id - The ID of a specific toast to hide.
   */
  const hideToasts = ({ hideAll = false, id = '' }) => {
    if (shownToastIDs.length < 1) {
      console.log('No toasts to hide with this instance');
      return;
    }
    if (!id && !hideAll) {
      console.log('You need to provide a toast ID or clear every toast');
      return;
    }
    if (hideAll) {
      toast.hideAll();
      setShownToastIDs([]); // Clear all stored toast IDs
    } else if (id) {
      if (shownToastIDs.includes(id)) {
        toast.hide(id);
        setShownToastIDs(prev => prev.filter(toastId => toastId !== id)); // Remove the ID from the stored list
      } else {
        console.log('ID', id, 'was not found in this toast instance');
      }
    }
  };

  return {
    showToastNotification,
    hideToasts,
    toast,
  };
};
