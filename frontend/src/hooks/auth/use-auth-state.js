import { useState, useEffect, useContext } from 'react';
import { Firebase } from '../../../App';
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  getAuth,
  updateProfile,
} from 'firebase/auth/react-native';
import { firebase } from '@react-native-firebase/auth';
import { app } from '../../../config/firebase-client';
import { resolveRole } from './use-auth-listener';
import { ModalContext } from '../../modules/provider/ModalProvider';

const useAuthState = () => {
  const { auth } = useContext(Firebase);
  const [authStatus, setAuthStatus] = useState('loading'); // 'loading', 'authenticated', 'unauthenticated'
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [currentUserJSON, setCurrentUserJSON] = useState(null);
  const [firebaseAccountCtx, setFirebaseAccountCtx] = useState(null);
  const { showModalAlert } = useContext(ModalContext);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        // Nutzer ist angemeldet
        setAuthStatus('authenticated');
        setUser(currentUser);
        setCurrentUser(currentUser);
        // Versuche, die Rolle des Nutzers abzurufen (angepasst an Ihr Datenmodell)
        // console.log(result);
        setCurrentUserJSON(currentUser.toJSON());
        setFirebaseAccountCtx(currentUser.toJSON());
        const role = await resolveRole(currentUser.uid);
        setRole(role === 'admin' ? 'Admin' : 'Nutzer'); // Standardrolle ist 'user', falls keine Rolle definiert ist
      } else {
        // Nutzer ist nicht angemeldet
        setAuthStatus('unauthenticated');
        setUser(null);
        setCurrentUser(null);
        setRole('');
        setCurrentUserJSON(null);
        setFirebaseAccountCtx(null);
      }
    });

    // Bereinigen beim Unmount der Komponente
    return () => unsubscribe();
  }, [auth]);

  /**
   *
   * @param {*} newUsername the new username of the current logged in account
   * @returns {Promise} Promise an error if something goes wrong otherwise null
   */
  const changeUsername = async (newUsername = '') => {
    setFirebaseError('');
    if (!currentUser) {
      console.error('user is not authenticated can not update username');
      return 'user is not authenticated can not update username';
    }
    if (newUsername !== currentUser.displayName && newUsername) {
      try {
        await updateProfile(currentUser, {
          displayName: newUsername.trim(),
        });
        return null;
      } catch (error) {
        console.error(error);
        return error.message;
      }
    }
    return 'the provided username can not be updated';
  };

  // exception handling listener
  useEffect(() => {
    if (!firebaseError) return;
    console.log('checking error type', firebaseError);
    switch (true) {
      case firebaseError.toString().includes('(auth/requires-recent-login)'):
        showModalAlert(
          'Erneutes Einloggen notwendig',
          'Deine Sitzung ist abgelaufen, bitte logge dich erneut ein bevor du fortfährst.',
          logout,
        );
        break;
      default:
        console.error(firebaseError);
        break;
    }
  }, [firebaseError]);

  const logout = async () => {
    try {
      setFirebaseError('');
      await signOut(auth);
      setAuthStatus('unauthenticated');
      setUser(null);
      setCurrentUser(null);
      setRole('');
      setCurrentUserJSON(null);
      setFirebaseAccountCtx(null);
    } catch (error) {
      console.warn('Fehler beim Ausloggen:', error);
      setFirebaseError(error);
    }
  };

  const deleteAccount = async () => {
    try {
      setFirebaseError('');
      console.log('deleting user account..');
      let firebaseAuth = getAuth(app);
      await deleteUser(firebaseAuth.currentUser);
      setAuthStatus('unauthenticated');
      setUser(null);
      setCurrentUser(null);
      setRole('');
      setCurrentUserJSON(null);
      setFirebaseAccountCtx(null);
    } catch (error) {
      console.warn('Fehler beim Löschen des Accounts:', error);
      setFirebaseError(error);
    }
  };

  const changePassword = async (currentPasswd, newPasswd) => {
    setFirebaseError('');
    const emailCred = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser,
      currentPasswd,
    );
    firebase
      .auth()
      .currentUser?.reauthenticateWithCredential(emailCred)
      .then(() => {
        return firebase.auth().currentUser?.updatePassword(newPasswd);
      })
      .catch(error => {
        console.error(error);
        setFirebaseError(error);
      });
  };

  useEffect(() => {
    if (!user?.uid || role) return;
    resolveRole(user.uid).then(role => {
      setRole(role === 'admin' ? 'Admin' : 'Nutzer');
    });
  }, [user]);

  return {
    currentUser,
    authStatus,
    user,
    role,
    logout,
    deleteAccount,
    changePassword,
    firebaseError,
    currentUserJSON,
    firebaseAccountCtx,
    changeUsername,
  };
};

export default useAuthState;
