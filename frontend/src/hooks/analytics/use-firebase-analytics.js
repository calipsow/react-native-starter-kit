import analytics from '@react-native-firebase/analytics';
import { useRef } from 'react';

/**
 * A custom React hook that facilitates tracking screen views in a React Native application using Firebase Analytics.
 * It should be integrated with the navigation system to monitor and log changes in the screen navigation.
 *
 * returns  An object containing refs to track the current and previous route names, and functions to handle navigation state changes and initialization.
 */
const useScreenViewAnalytics = () => {
  const routeNameRef = useRef(); // Ref to keep track of the current route name for comparison
  const navigationRef = useRef(); // Ref to the navigation container to access current route information

  /**
   * Callback function to execute when the navigation state changes.
   * This function checks for changes in the route and logs screen views to Firebase Analytics if there's a change.
   */
  const onRouteStateChange = async () => {
    if (!routeNameRef.current) return; // Guard clause to ensure there is a previously stored route name
    const previousRouteName = routeNameRef.current; // Get the previous route name
    const currentRouteName = navigationRef.current.getCurrentRoute().name; // Get the current active route name

    // Log screen view if the route name has changed
    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }

    // Update the route name ref to the current route for future comparisons
    routeNameRef.current = currentRouteName;
  };

  /**
   * Initialization function to set the initial route name when the navigation system is ready.
   * This function should be called from the navigation container's onReady prop.
   */
  const onReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name; // Store the initial route name when the navigation is fully loaded
  };

  return {
    routeNameRef,
    navigationRef,
    onRouteStateChange,
    onReady,
  };
};

export default useScreenViewAnalytics;
