import {
  getAuth,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth/react-native';
import { useContext, useEffect } from 'react';
import { USER_SCHEME } from '../../constants/firestore-schemes';
import getDocument from '../../functions/firestore/get-document-async';
import writeDocument from '../../functions/firestore/write-document-async';
import SecureStorage from '../../helpers/secure-storage';
import { Firebase } from '../../../App';
import { app } from '../../../config/firebase-client';

export const resolveRole = async uid => {
  const admin = await getDocument('Admins', uid);
  return admin ? 'admin' : 'user';
};

export const resolveAdminAccessLevel = async uid => {
  const admin = await getDocument('Admins', uid);
  if (!admin) return 'none';
  else return admin.access_level;
};

const useAuthListener = (accountCtx, setAccountCtx = function (state) {}) => {
  const { db } = useContext(Firebase);
  useEffect(() => {
    if (!db) return;
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        // Wenn der Benutzer authentifiziert ist, überprüfen, ob das Benutzerdokument geladen ist
        if (!accountCtx) {
          // Wenn das Benutzerdokument noch nicht geladen ist, lade es aus der Firestore-DB
          try {
            const userDocument = await getDocument('Users', user.uid); // Funktion zum Abrufen des Benutzerdokuments aus Firestore
            if (!userDocument) {
              let username = await SecureStorage.get('username');
              if (username) {
                await updateProfile(user, { displayName: username.trim() });
                USER_SCHEME.username = username;
                await SecureStorage.remove('username');
              }
              USER_SCHEME.uid = user.uid;
              USER_SCHEME.firebase_uid = user.uid;
              USER_SCHEME.role = await resolveRole(user.uid);

              await writeDocument('Users', user.uid, USER_SCHEME, false);
              USER_SCHEME.firebase_auth_data = { ...user.toJSON() };
              setAccountCtx(USER_SCHEME);
            } else
              setAccountCtx({
                ...userDocument,
                username: user.displayName,
                firebase_auth_data: { ...user.toJSON() },
              });
          } catch (error) {
            console.error('Error fetching user document:', error);
          }
        }
      } else {
        // Wenn der Benutzer nicht authentifiziert ist, setze den accountCtx auf null
        setAccountCtx(null);
        console.log('ACCOUNT CTX =>', accountCtx);
      }
    });

    return () => unsubscribe(); // Aufräumen bei Komponentenabbau
  }, [accountCtx, setAccountCtx, app]);

  return null; // Diese Hook gibt nichts zurück, da sie nur Nebeneffekte hat
};

export default useAuthListener;
