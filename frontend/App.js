import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles/colors'; // TODO dark light mode

import { persistor, store } from './src/redux/store';

import { app, auth, db, storage } from './config/firebase-client'; // TODO remove storage by default
import AppView from './src/modules/AppViewContainer';

import { PermissionsAndroid } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import useCheckAppVersionCompatibility from './src/hooks/app/use-check-app-version-compatibilty'; // TODO remove this dep
import { BugReportProvider } from './src/modules/bug-report/BugReportProvider'; // TODO remove debug context
import {
  BugReportButton,
  ModalContent,
} from './src/modules/bug-report/ReportComponents'; // TODO remove 
import { ModalProvider } from './src/modules/provider/ModalProvider';
// TODO dont call it that way
Platform.OS === 'android' &&
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const Firebase = createContext({
  auth: null,
  db: null,
  storage: null, // todo renove 
  app: null,
});

function App({ top = 0, right = 0 }) {
  const [firebase, setFirebase] = useState({});
  useEffect(() => {
    if (firebase.auth && firebase.db && firebase.storage) return; // todo remove storage
    setFirebase({
      auth,
      db,
      storage, // todo remove
      app,
    });
  }, [auth, db, storage]); // todo

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
    backgroundColor: 'white', // todo possible unwanted static bg
  },
});

export default App;
