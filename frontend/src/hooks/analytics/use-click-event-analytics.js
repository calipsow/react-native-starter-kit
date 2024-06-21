import analytics from '@react-native-firebase/analytics';
import { useEffect, useState } from 'react';

/**
 * Custom hook for handling click and custom event analytics using Firebase Analytics.
 * This hook abstracts the complexity of logging analytics events and handles errors.
 *
 * returns  An object containing functions to log different types of analytics events.
 */
const useClickAnalytics = () => {
  const [error, setError] = useState(null); // State to store any error that occurs during event logging.

  /**
   * Logs a 'select content' event in Firebase Analytics, typically used for tracking item selections.
   *
   * @param {Object} params - Parameters for the event.
   * @param {string} params.content_type - Type of content being interacted with (default: 'clothing').
   * @param {string} params.item_id - ID of the item selected (default: 'abcd').
   */
  const logClickEvent = async ({
    content_type = 'clothing',
    item_id = 'abcd',
  }) => {
    try {
      setError(null); // Reset any previous errors.
      await analytics().logSelectContent({
        content_type,
        item_id,
      });
    } catch (error) {
      setError(error); // Set error if logging fails.
    }
  };

  /**
   * Logs a custom event in Firebase Analytics, allowing for a flexible set of parameters.
   *
   * @param {Object} params - Parameters for the custom event.
   * @param {string} params.event_name - The name of the custom event (default: 'example').
   * @param {string} params.event_id - The identifier for the event (default: 'some_id').
   * @param {string} params.event_title - Title of the event (default: 'example event').
   * @param {Array|string} params.event_description - Description of the event (default: ['example', 'event']).
   * @param {string} params.event_sub_description - Additional details about the event (default: 'Eu quis officia magna aute.').
   */
  const logCustomEvent = async ({
    event_name = 'example',
    event_id = 'some_id',
    event_title = 'example event',
    event_description = ['example', 'event'],
    event_sub_description = 'Eu quis officia magna aute.',
  }) => {
    try {
      setError(null); // Reset any previous errors.
      await analytics().logEvent(event_name, {
        id: event_id,
        title: event_title,
        description: event_description,
        size: event_sub_description,
      });
    } catch (error) {
      setError(error); // Set error if logging fails.
    }
  };

  useEffect(() => {
    // Log any errors to the console.
    if (error) {
      console.error('Failed to send analytics:', error.message);
    }
  }, [error]);

  return {
    logClickEvent,
    logCustomEvent,
  };
};

export default useClickAnalytics;
