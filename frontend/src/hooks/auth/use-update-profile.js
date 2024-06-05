import { updateProfile } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Firebase } from '../../../App';

const useUserProfile = (accountCtx, setAccountCtx) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(Firebase);

  const updateUsername = async username => {
    setLoading(true);
    setSuccess(false);
    try {
      if (!accountCtx) return;
      await updateProfile(auth.currentUser, { displayName: username?.trim() });
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async imageUrl => {
    setLoading(true);
    setSuccess(false);
    try {
      if (!accountCtx) return;
      await updateProfile(auth.currentUser, { photoURL: imageUrl });
      setAccountCtx(prev => ({
        ...prev,
        firebase_auth_data: {
          ...prev.firebase_auth_data,
          photoURL: imageUrl,
        },
      }));
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
