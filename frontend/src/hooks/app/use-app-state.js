import React, { useRef, useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
/**
 *
 * @param {*} onForeGroundCB Callback called if the app after the initial boot comes to the foreground
 * @param {*} onBackgroundCB Callback called if the app after the initial boot goes to the background in state background
 *
 * @returns {*}  returning an object with the current appStateVisible and the react reference to current app state
 */
const useAppStateChangeTrigger = ({
  onForeGroundCB = function () {},
  onBackgroundCB = function () {},
}) => {
  const [isFirstBoot, setIsFirstBoot] = useState(true);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  // callback trigger
  useEffect(() => {
    if (!appStateVisible) return;
    if (isFirstBoot) {
      setIsFirstBoot(false);
      return;
    }
    switch (appStateVisible) {
      case 'active':
        console.log('triggering the foregroundCB');
        onForeGroundCB();
        break;
      case 'background':
        console.log('triggering the onBackgroundCB');
        onBackgroundCB();
        break;
      default:
        console.log('no cb implemented for', appStateVisible);
        break;
    }
  }, [appStateVisible]);

  return {
    appState,
    appStateVisible,
  };
};

export default useAppStateChangeTrigger;
