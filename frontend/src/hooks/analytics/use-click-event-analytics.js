import analytics from '@react-native-firebase/analytics';
import { useEffect, useRef, useState } from 'react';

const useClickAnalytics = () => {
  const [error, setError] = useState(null);

  const logClickEvent = async ({
    content_type = 'clothing',
    item_id = 'abcd',
  }) => {
    try {
      setError(null);
      await analytics().logSelectContent({
        content_type,
        item_id,
      });
    } catch (error) {
      setError(error);
    }
  };

  const logCustomEvent = async ({
    event_name = 'basket',
    event_id = 'some-id',
    event_title = 'default event',
    event_description = ['round neck', 'long sleeved'],
    event_sub_description = 'event description text',
  }) => {
    try {
      setError(null);
      await analytics().logEvent(event_name, {
        id: event_id,
        title: event_title,
        description: event_description,
        size: event_sub_description,
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!error) return;
    console.error('failed to send analytics', error.message);
  }, [error]);

  return {
    logClickEvent,
    logCustomEvent,
  };
};

export default useClickAnalytics;
