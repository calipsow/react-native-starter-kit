import { useState, useContext, useCallback } from 'react';
import { Firebase } from '../../../App'; // Ensure this path is correctly set to import Firebase context
import { signInWithEmailAndPassword } from 'firebase/auth/react-native';

/**
 * Custom React hook for handling user sign-in with Firebase Authentication.
 * Manages sign-in status, loading state, any error messages, and the ID token of the authenticated user.
 *
 * returns  An object containing the sign-in function and states related to the sign-in process.
 */
const useSignIn = () => {
  const { auth } = useContext(Firebase); // Access Firebase Authentication context
  const [succeeded, setSucceeded] = useState(false); // State to indicate if the sign-in was successful
  const [error, setError] = useState(''); // State to store any error messages from the sign-in process
  const [idToken, setIdToken] = useState(''); // State to store the ID token of the authenticated user
  const [loading, setLoading] = useState(false); // State to indicate if the sign-in process is ongoing

  /**
   * Function to authenticate a user with email and password.
   *
   * @param {Object} param0 - Object containing the email and password for authentication.
   * @param {string} param0.email - User's email address.
   * @param {string} param0.password - User's password.
   */
  const signIn = useCallback(
    async ({ email = '', password = '' }) => {
      setSucceeded(false); // Reset success state
      setError(''); // Clear any previous errors
      setIdToken(''); // Reset ID token state
      setLoading(true); // Indicate that the sign-in process has started

      try {
        // Attempt to sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        // Retrieve the ID token from the signed-in user
        const token = await userCredential.user.getIdToken();
        setIdToken(token); // Store the ID token
        setSucceeded(true); // Update state to reflect successful sign-in
      } catch (err) {
        // Handle any errors that occur during sign-in
        console.error(err, 'Failed to login'); // Log error
        setError(err.message); // Store the error message
        setSucceeded(false); // Update state to reflect unsuccessful sign-in
      } finally {
        setLoading(false); // Indicate that the sign-in process has completed
      }
    },
    [auth],
  );

  return { signIn, succeeded, error, idToken, loading }; // Return the function and states
};

export default useSignIn;
