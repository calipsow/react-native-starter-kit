import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles/colors';

import { persistor, store } from './src/redux/store';

import { app, auth, db, storage } from './config/firebase-client';
import AppView from './src/modules/AppViewContainer';

import { PermissionsAndroid } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import useCheckAppVersionCompatibility from './src/hooks/app/use-check-app-version-compatibilty';
import { BugReportProvider } from './src/modules/bug-report/BugReportProvider';
import {
  BugReportButton,
  ModalContent,
} from './src/modules/bug-report/ReportComponents';
import { ModalProvider } from './src/modules/provider/ModalProvider';

Platform.OS === 'android' &&
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const Firebase = createContext({
  auth: null,
  db: null,
  storage: null,
  app: null,
});

function App({ top = 0, right = 0 }) {
  const [firebase, setFirebase] = useState({});
  useEffect(() => {
    if (firebase.auth && firebase.db && firebase.storage) return;
    setFirebase({
      auth,
      db,
      storage,
      app,
    });
  }, [auth, db, storage]);

  return (
    <BugReportProvider>
      {/* Bug Reporting Formular */}
      <BugReportButton right={right} top={top} />
      <ModalContent />
      <ModalProvider>
        <Firebase.Provider value={{ ...firebase }}>
          <Provider store={store}>
            <PersistGate
              loading={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <View style={styles.container}>
                  <ActivityIndicator color={colors.red} />
                </View>
              }
              persistor={persistor}
            >
              <AppView />
            </PersistGate>
          </Provider>
        </Firebase.Provider>
      </ModalProvider>
    </BugReportProvider>
  );
}

export function AppWrapperSafeArea() {
  const { top, right } = useSafeArea();
  return <App top={top} right={right} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
