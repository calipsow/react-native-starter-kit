import analytics from '@react-native-firebase/analytics';
import { useRef, useState } from 'react';

const useFirebaseAnalytics = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  const onRouteStateChange = async () => {
    if (!routeNameRef.current) return;
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    routeNameRef.current = currentRouteName;
  };

  const onReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  return {
    routeNameRef,
    navigationRef,
    onRouteStateChange,
    onReady,
  };
};

export default useFirebaseAnalytics;
