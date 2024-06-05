// Importieren der Firebase-App und der benötigten Dienste
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyB2hWsIxsLjsW_kSRXVYfmpDMn7t-SetXo',
  authDomain: 'fir-zsw.firebaseapp.com',
  projectId: 'fir-zsw',
  storageBucket: 'fir-zsw.appspot.com',
  messagingSenderId: '387763673538',
  appId: '1:387763673538:android:83259df8a92601ab979e5b',
};

// Initialisieren von Firebase
const app = initializeApp(firebaseConfig);

// Initialisieren der Firebase-Dienste
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
