import { updateProfile } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Firebase } from '../../../App';

/**
 * Custom React hook for updating a user's profile information such as username and profile picture.
 * Manages state related to the update operations including success, error, and loading states.
 *
 * @param {object} accountCtx - The context or state representing the user's account information.
 * @param {function} setAccountCtx - Function to update the account context or state.
 */
const useUserProfile = (accountCtx, setAccountCtx) => {
  const [error, setError] = useState(null); // State to store any error that occurs during profile updates
  const [success, setSuccess] = useState(false); // State to indicate if the update was successful
  const [loading, setLoading] = useState(false); // State to indicate if an update operation is in progress
  const { auth } = useContext(Firebase); // Access the Firebase Auth context

  /**
   * Updates the username for the current user.
   *
   * @param {string} username - The new username to be set for the user.
   */
  const updateUsername = async username => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      if (!accountCtx) return; // Ensure there is a user context to update
      await updateProfile(auth.currentUser, { displayName: username?.trim() }); // Update user's display name in Firebase
      // Update local context with new username
      setAccountCtx(prev => ({
        ...prev,
        username: username,
        firebase_auth_data: {
          ...prev.firebase_auth_data,
          displayName: username,
        },
      }));
      setSuccess(true);
    } catch (error) {
      setError(error.message); // Capture and set any errors that occur
    } finally {
      setLoading(false); // Indicate that the operation has completed
    }
  };

  /**
   * Updates the profile picture for the current user.
   *
   * @param {string} imageUrl - The URL of the new profile picture to be set for the user.
   */
  const updateProfilePicture = async imageUrl => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      if (!accountCtx) return; // Ensure there is a user context to update
      await updateProfile(auth.currentUser, { photoURL: imageUrl }); // Update user's profile picture in Firebase
      // Update local context with new profile picture URL
      setAccountCtx(prev => ({
        ...prev,
        firebase_auth_data: {
          ...prev.firebase_auth_data,
          photoURL: imageUrl,
        },
      }));
      setSuccess(true);
    } catch (error) {
      setError(error.message); // Capture and set any errors that occur
    } finally {
      setLoading(false); // Indicate that the operation has completed
    }
  };

  return {
    updateUsername,
    updateProfilePicture,
    error,
    success,
    loading,
  };
};

export default useUserProfile;
