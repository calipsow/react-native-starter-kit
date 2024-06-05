import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useEffect } from 'react';
import parseRouteAndParams from '../../helpers/parse-deeplink';
import SecureStorage from '../../helpers/secure-storage';
import useDeepLink from './use-deep-link';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * This hook will try to store all deeplink data persistent in case the app is not able to redirect to the target and it will also try to navigate to the screen if an running auth session is found and an stored deep link is found
 *
 * @param {*} accountCtx current accountCtx to check if the app is loaded and an active session exists
 */
const useDeepLinkResolver = accountCtx => {
  const initialUrl = useDeepLink();
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const storeDeepLinkData = async (route, params) => {
    console.log(route, params);
    await AsyncStorage.setItem(
      'unresolved-deeplink',
      JSON.stringify({
        route: route,
        params: params,
      }),
    ).catch(e => console.log(e));
  };
  const handleUnresolvedDeeplink = async () => {
    const unresolvedLinkRaw = await AsyncStorage.getItem(
      'unresolved-deeplink',
    ).catch(e => console.log(e));
    if (!unresolvedLinkRaw) return;
    console.log('found unresolved deeplink, try to navigate to target...');

    await AsyncStorage.removeItem('unresolved-deeplink').catch(e =>
      console.log(e),
    );
    let unresolvedLink;
    try {
      unresolvedLink = unresolvedLinkRaw ? JSON.parse(unresolvedLinkRaw) : null;
      console.log(unresolvedLink);
    } catch (error) {
      console.warn(
        'error while parsing unresolved deeplink string to json obj: raw data',
        unresolvedLinkRaw,
      );
      unresolvedLink = null;
    }
    if (!unresolvedLink) return;
    const { route, params } = unresolvedLink;
    if (currentRouteName === route) {
      console.log(
        'deleting unresolved deeplink because the required screen is already shown up',
      );
      return;
    } else {
      console.log('navigate to unresolved deeplink');
      switch (route) {
        case 'event':
          navigation.navigate('Single Event', {
            event_id: params,
          });
          break;
        case 'article':
          navigation.navigate('Single Article', {
            article_id: params,
          });
          break;
        default:
          console.warn('No Route found for', route);
          break;
      }
    }
  };

  useEffect(() => {
    if (initialUrl) {
      // Parse the URL to find the route and parameters
      // Beispiel: zsw://event/1234
      const [route, params] = parseRouteAndParams(initialUrl);
      console.log('got deeplink:', route, 'params', params);
      if (!route || !params) return;
      // Stelle sicher, dass alle notwendigen Daten geladen sind
      if (!accountCtx) {
        console.log('storing deeplink data:', route, 'params', params);
        storeDeepLinkData(route, params);
      }
    }
  }, [initialUrl]);

  useEffect(() => {
    if (!accountCtx) return;
    handleUnresolvedDeeplink();
  }, [accountCtx]);
};

export default useDeepLinkResolver;
