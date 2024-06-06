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
  apiKey: "AIzaSyCmmd2hH5n0iu8-dqvgaRuiY1MUZNh8a1Q",
  authDomain: "ship-apps-fast.firebaseapp.com",
  projectId: "ship-apps-fast",
  storageBucket: "ship-apps-fast.appspot.com",
  messagingSenderId: "787015893641",
  appId: "1:787015893641:web:94602c9360ea6c3e337c58",
  measurementId: "G-W68GGYLSNN"
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
