import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; // Ensure this path is correctly set to import Firebase context
import { sendPasswordResetEmail } from 'firebase/auth/react-native';

/**
 * Custom React hook for sending a password reset email to a user's email address.
 * Manages the state of the email sent status, loading status, and any errors that may occur during the process.
 *
 * returns  An object containing the function to initiate a password reset email, and states indicating the process status.
 */
const useResetPassword = () => {
  const { auth } = useContext(Firebase); // Access Firebase Authentication context
  const [emailSent, setEmailSent] = useState(false); // State to indicate if the password reset email has been sent
  const [error, setError] = useState(''); // State to store any error messages that occur
  const [loading, setLoading] = useState(false); // State to indicate if the process is currently loading

  /**
   * Function to send a password reset email to the provided email address.
   * Updates state based on the success or failure of the email sending operation.
   *
   * @param {string} email - The email address to which the password reset email will be sent.
   */
  const resetPassword = async email => {
    setLoading(true); // Indicate that the process has started
    setEmailSent(false); // Reset email sent state
    setError(''); // Clear any previous errors

    try {
      await sendPasswordResetEmail(auth, email); // Attempt to send the password reset email
      setEmailSent(true); // Update state to indicate the email was successfully sent
    } catch (err) {
      setError(err.message); // Capture and store any error messages
    } finally {
      setLoading(false); // Indicate that the process has completed, regardless of success or failure
    }
  };

  return { resetPassword, emailSent, error, loading }; // Return the function and states related to the process
};

export default useResetPassword;
