import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';

// Paste here your compied condigs from the firebase condole in
const firebaseConfig = {
  apiKey: 'AIzaSyCmmd2hH5n0iu8-dqvgaRuiY1MUZNh8a1Q',
  authDomain: 'ship-apps-fast.firebaseapp.com',
  projectId: 'ship-apps-fast',
  storageBucket: 'ship-apps-fast.appspot.com',
  messagingSenderId: '787015893641',
  appId: '1:787015893641:web:94602c9360ea6c3e337c58',
  measurementId: 'G-W68GGYLSNN',
};

// Firebase App
const app = initializeApp(firebaseConfig);

// REQUIRED: Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// REQUIRED: Firestore DB 
const db = getFirestore(app);

// OPTIONAL: storage is not required to run the app you can comment it out without worries 
const storage = getStorage(app);

// OPTIONAL: analytics is also not necessary 
const analytics = getAnalytics(app);

// if you dont want to use some services then declaire they instances with null
export { auth, db, storage, app, analytics };
