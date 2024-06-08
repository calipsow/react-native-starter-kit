import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles/colors'; // TODO dark light mode
import { persistor, store } from './src/redux/store';
import { app, auth, db, storage } from './config/firebase-client';
import AppView from './src/modules/AppViewContainer';
import { ModalProvider } from './src/modules/provider/ModalProvider';

// creates an firebase context ensures that fb has loaded before rendering main components
// firebase will initialized in config/firebase-client.js
// make sure you have setup your firebase account before starting the app
// the app uses these fb free services:
// -------------------------------------------
// Firestore (document based database)
// Authentication (used to handle user logins and sessions)
// Storage CDN (used to up- and download files)
// Firebase Analytics
// Firebase Functions

export const Firebase = createContext({
  auth: null,
  db: null,
  app: null,
  storage: null,
});

function App() {
  const [firebase, setFirebase] = useState({});

  useEffect(() => {
    // init firebase resources
    if (firebase.auth && firebase.db && firebase.storage) return;
    // prettier-ignore
    setFirebase({auth, db, app, storage});
  }, [auth, db]);

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default App;
