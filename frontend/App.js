import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles/colors'; // TODO dark light mode
import { persistor, store } from './src/redux/store';
import { app, auth, db, storage } from './config/firebase-client'; // TODO remove storage by default
import AppView from './src/modules/AppViewContainer';
import { ModalProvider } from './src/modules/provider/ModalProvider';


export const Firebase = createContext({
  auth: null,
  db: null,
  app: null,
  storage: null
});

function App() {
  const [firebase, setFirebase] = useState({});
  
  useEffect(() => { // init firebase recources
    if (firebase.auth && firebase.db) return; 
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
    backgroundColor: colors.primary, // todo possible unwanted static bg
  },
});

export default App;
