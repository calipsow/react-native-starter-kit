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
import { Firebase } from '../../../App'; // Ensure the correct path is set
import { app } from '../../../config/firebase-client';

/**
 * Custom React hook that listens to the Firebase authentication state and manages user data.
 * It updates the account context based on the current user's authentication status and data.
 *
 * @param {object} accountCtx - Context or state representing the current user's account information.
 * @param {function} setAccountCtx - Function to update the account context or state.
 * @returns {null} Nothing is returned from this hook as it's solely for side effects.
 */
const useAuthContextListener = (
  accountCtx,
  setAccountCtx = function (state) {},
) => {
  const { db } = useContext(Firebase); // Access Firestore database instance from Firebase context

  useEffect(() => {
    if (!db) return; // Ensure the database instance is available
    const auth = getAuth(app); // Initialize Firebase Authentication

    // Listen for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        // Check if the user is authenticated and if account context needs to be loaded or updated
        if (!accountCtx) {
          try {
            const userDocument = await getDocument('Users', user.uid); // Fetch user document from Firestore
            if (!userDocument) {
              // If user document does not exist, handle new user setup
              let username = await SecureStorage.get('username'); // Retrieve username from secure storage if available
              if (username) {
                await updateProfile(user, { displayName: username.trim() }); // Update Firebase profile
                USER_SCHEME.username = username;
                await SecureStorage.remove('username'); // Clear username from secure storage after use
              }
              // Set initial values for a new user document based on predefined schema
              USER_SCHEME.uid = user.uid;
              USER_SCHEME.firebase_uid = user.uid;
              USER_SCHEME.role = 'user';

              // Write the new user document to Firestore
              await writeDocument('Users', user.uid, USER_SCHEME, false);
              USER_SCHEME.firebase_auth_data = user.toJSON(); // Include Firebase auth data in the user schema
              setAccountCtx(USER_SCHEME); // Update the account context with the new user schema
            } else {
              // Update the account context with data from the existing user document
              setAccountCtx({
                ...userDocument,
                username: user.displayName,
                firebase_auth_data: user.toJSON(),
              });
            }
          } catch (error) {
            console.error('Error fetching user document:', error); // Log errors related to fetching or updating user data
          }
        }
      } else {
        // Reset account context to null if the user is not authenticated
        setAccountCtx(null);
        console.log('ACCOUNT CTX =>', accountCtx); // Optionally log the current state of the account context
      }
    });

    return () => unsubscribe(); // Clean up by unsubscribing from the auth state listener on component unmount
  }, [accountCtx, setAccountCtx, app]);

  return null; // Return null as this hook is only for side effects
};

export default useAuthContextListener;
