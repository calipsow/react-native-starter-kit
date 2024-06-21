import { useState, useContext, useEffect } from 'react';
import SecureStorage from '../../helpers/secure-storage'; // Import secure storage for any secure data handling
import { Firebase } from '../../../App'; // Ensure this path is correctly set to import Firebase context
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

/**
 * Custom React hook to register a new user with Firebase Authentication.
 * Handles the creation of user accounts, setting user profile information, sending email verifications, and managing state related to the registration process.
 *
 * @param {Object} params - Parameters for user registration.
 * @param {string} params.email - The email address for the new user.
 * @param {string} params.username - The username for the new user.
 * @param {string} params.role - The role assigned to the new user.
 * @param {string} params.passwd - The password for the new user account.
 * @returns {Object} An object containing functions and states related to the registration process.
 */
const useRegisterUser = ({ email, username, role, passwd }) => {
  const { auth } = useContext(Firebase); // Access Firebase Authentication context
  const [accountCreatedSuccessfully, setAccountCreatedSuccessfully] =
    useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [idToken, setIdToken] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState('UNCONFIRMED');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset internal states whenever the input parameters change
    setFirebaseError('');
    setEmailConfirmed('UNCONFIRMED');
    setIdToken('');
    setAccountCreatedSuccessfully(false);
  }, [email, username, role, passwd]);

  /**
   * Function to register a new user in Firebase Authentication.
   * This function will also handle user profile updates and send an email verification.
   *
   * @param {string} name - The user's name, used for the display name in the user profile.
   * @param {string} email - The user's email, used for registration.
   * @param {string} passwd - The password for the new user account.
   */
  const registerUser = async (name = '', email = '', passwd = '') => {
    if (passwd.length < 10) {
      setFirebaseError(
        'Password is too short. (10 characters minimum required)',
      );
      return;
    }

    try {
      setLoading(true); // Indicate that the registration process has started
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        passwd,
      );
      const user = userCredential.user;

      // Set the display name in the user profile
      await user.updateProfile({
        displayName: username?.trim() || name?.trim(),
      });

      // Send an email verification to the user
      await user.sendEmailVerification();
      setEmailConfirmed('PENDING'); // Update the email confirmed status

      const token = await user.getIdToken(); // Retrieve the ID token for the new user
      setIdToken(token);
      setAccountCreatedSuccessfully(true); // Indicate that the account was created successfully
    } catch (error) {
      setFirebaseError(error.message); // Store any errors that occur
      setIdToken(''); // Reset the ID token state
      setEmailConfirmed('UNCONFIRMED'); // Reset the email confirmation status
    } finally {
      setLoading(false); // Indicate that the registration process has completed
    }
  };

  return {
    registerUser,
    accountCreatedSuccessfully,
    firebaseError,
    idToken,
    loading,
    emailConfirmed,
  };
};

export default useRegisterUser;
