import { Platform, UIManager } from 'react-native';

import AppView from './AppView';
import React, { useEffect } from 'react';

const ComposeAppUIState = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  return  <AppView />;
};

export default ComposeAppUIState;
