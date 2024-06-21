import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useEffect } from 'react';
import parseRouteAndParams from '../../helpers/parse-deeplink';
import useDeepLink from './use-deep-link';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Custom hook to manage deep linking in a React Native application. This hook handles storing
 * unresolved deep links when the app cannot navigate immediately, and resolves these links
 * once the application state allows for navigation (e.g., when user authentication is confirmed).
 *
 * @param {*} accountCtx - The current user account context used to verify if there is an active session.
 */
const useDeepLinkResolver = accountCtx => {
  const initialUrl = useDeepLink(); // Hook to retrieve the initial deep link URL
  const navigation = useNavigation(); // Hook to access navigation functionality
  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name, // Retrieve the current active route name
  );

  /**
   * Stores deep link data persistently in AsyncStorage.
   *
   * @param {string} route - The navigation route associated with the deep link.
   * @param {string} params - Parameters for the route.
   */
  const storeDeepLinkData = async (route, params) => {
    console.log(route, params); // Log route and parameters for debugging
    await AsyncStorage.setItem(
      'unresolved-deeplink',
      JSON.stringify({ route, params }),
    ).catch(e => console.log('Error storing deep link data:', e));
  };

  /**
   * Handles unresolved deep links by attempting to navigate to the target route if the conditions allow.
   */
  const handleUnresolvedDeeplink = async () => {
    const unresolvedLinkRaw = await AsyncStorage.getItem(
      'unresolved-deeplink',
    ).catch(e => console.log('Error retrieving unresolved deep link:', e));
    if (!unresolvedLinkRaw) return; // Exit if no unresolved link is stored

    console.log('Found unresolved deep link, attempting to navigate...');
    await AsyncStorage.removeItem('unresolved-deeplink').catch(e =>
      console.log('Error removing unresolved deep link:', e),
    );

    let unresolvedLink;
    try {
      unresolvedLink = JSON.parse(unresolvedLinkRaw); // Parse the stored JSON string
      console.log('Parsed unresolved deep link:', unresolvedLink);
    } catch (error) {
      console.warn(
        'Error parsing unresolved deep link JSON:',
        unresolvedLinkRaw,
      );
      return;
    }

    const { route, params } = unresolvedLink;
    if (currentRouteName === route) {
      console.log(
        'Current route is already active, ignoring deep link:',
        route,
      );
      return;
    }

    console.log('Navigating to unresolved deep link:', route);
    // Navigate based on the route
    switch (route) {
      case 'event':
        navigation.navigate('Single Event', { event_id: params });
        break;
      case 'article':
        navigation.navigate('Single Article', { article_id: params });
        break;
      default:
        console.warn('No navigation route found for:', route);
        break;
    }
  };

  useEffect(() => {
    if (initialUrl) {
      const [route, params] = parseRouteAndParams(initialUrl); // Parse the initial URL
      console.log('Received deep link:', route, 'with params:', params);
      if (!route || !params) return; // Check if the URL is valid
      if (!accountCtx) {
        console.log(
          'Storing deep link data due to no active session:',
          route,
          params,
        );
        storeDeepLinkData(route, params);
      }
    }
  }, [initialUrl]);

  useEffect(() => {
    if (accountCtx) {
      handleUnresolvedDeeplink(); // Handle unresolved deep links if there is an active session
    }
  }, [accountCtx]);
};

export default useDeepLinkResolver;
