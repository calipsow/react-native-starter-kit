import { useState, useEffect, useContext } from 'react';
import { Firebase } from '../../../App';
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  getAuth,
  updateProfile,
} from 'firebase/auth/react-native';
import { ModalContext } from '../../modules/provider/ModalProvider';
import { firebase } from '@react-native-firebase/auth';

/**
 * Custom React hook to manage and track Firebase authentication status and user details.
 * Provides functionality for handling login state, user information, and performing account actions like logout, delete, and updating credentials.
 *
 * returns  An object containing various states and functions related to Firebase authentication.
 */
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
  const [succeeded, setSucceeded] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const setError = err => {
    console.error(err);
    setFirebaseError(err);
    setSucceeded(false);
    setLoading(false);
  };
  const resetStates = () => {
    setFirebaseError('');
    setSucceeded(false);
    setLoading(true);
  };

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
        setRole('user'); // Standardrolle ist 'user', falls keine Rolle definiert ist
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

    return () => unsubscribe();
  }, [auth]);

  /**
   *
   * @param {*} newUsername the new username of the current logged in account
   * @returns {Promise} Promise an error if something goes wrong otherwise null
   */
  const changeUsername = async (newUsername = '') => {
    resetStates();
    if (!currentUser)
      return setError('user is not authenticated can not update username');
    if (newUsername !== currentUser.displayName && newUsername) {
      try {
        await updateProfile(currentUser, {
          displayName: newUsername.trim(),
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    } else setError('the provided username can not be updated');
  };

  // exception handling listener
  useEffect(() => {
    if (!firebaseError) return;
    console.log('checking error type', firebaseError);
    switch (true) {
      case firebaseError.toString().includes('(auth/requires-recent-login)'):
        showModalAlert(
          'Log in again necessary',
          'Your session has expired, please log in again before continuing.',
          logout,
        );
        break;
      default:
        console.warn(firebaseError);
        break;
    }
  }, [firebaseError]);

  const logout = async () => {
    try {
      resetStates();
      await signOut(auth);
      setSucceeded(true);
      setAuthStatus('unauthenticated');
      setUser(null);
      setCurrentUser(null);
      setRole('');
      setCurrentUserJSON(null);
      setFirebaseAccountCtx(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteAccount = async () => {
    try {
      resetStates();
      console.log('deleting user account..');
      const auth = getAuth();
      if (!auth.currentUser) throw Error('user is not signed in!');
      await deleteUser(auth.currentUser);
      setSucceeded(true);
      setAuthStatus('unauthenticated');
      setUser(null);
      setCurrentUser(null);
      setRole('');
      setCurrentUserJSON(null);
      setFirebaseAccountCtx(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const changePassword = async _email => {
    resetStates();
    try {
      const auth = firebase.auth();
      if (!_email) throw Error('Your email is incorrect.');
      await auth.sendPasswordResetEmail(_email);
      setLoading(false);
      setSucceeded(true);
    } catch (error) {
      setError(error.message);
    }
  };

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
    succeeded,
    isLoading,
  };
};

export default useAuthState;
