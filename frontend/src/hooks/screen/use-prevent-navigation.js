import { useContext, useEffect } from 'react';
import {
  CommonActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';

function usePreventNavigation(
  onAttemptToLeave = function () {
    return false;
  },
) {
  const navigation = useNavigation();
  const currentRoutes = useNavigationState(state => state.routes);

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener(
      'beforeRemove',
      e => {
        // Prüft, ob die Navigation verhindert werden soll
        const preventNavigation = onAttemptToLeave(); // expects a boolean in return or a
        if (preventNavigation) {
          e.preventDefault(); // Verhindert die Navigation
        }
      },
    );

    return unsubscribeBeforeRemove;
  }, [navigation, currentRoutes, onAttemptToLeave]); // Abhängigkeiten aktualisieren, wenn sich die Route oder der Callback ändert

  useEffect(() => {
    return () => {
      // Clean up listener when the component is unmounted or dependencies change
      navigation.removeListener('beforeRemove');
    };
  }, [navigation]);
}

export default usePreventNavigation;
