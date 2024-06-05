import '@react-native-firebase/functions';
import functions from '@react-native-firebase/functions';
import { useState } from 'react';
import FirebaseAuthCacheController from '../../controller/cache/firebase-auth-controller';

const useFetchPublicUserData = () => {
  const [userData, setUserData] = useState(null);
  const [fetchUserError, setError] = useState(null);
  const [loadingUser, setLoading] = useState(false);

  const fetchUserData = async uid => {
    setLoading(true);
    setError(null);
    try {
      const getUserData = functions().httpsCallable('getUserData');
      const response = await FirebaseAuthCacheController.fetchQuery(
        uid,
        async () => await getUserData({ uid }),
      );
      if (response?.data) setUserData(response.data);
      else {
        setUserData({
          displayName: 'Zusammen Stehen Wir · Nutzer',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fapp%2Fimages%2Fdefault-avatar.png?alt=media&token=567b6e03-58d7-44b9-a065-4c2fa7341324',
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message || 'Failed to fetch user data');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return { userData, fetchUserError, loadingUser, fetchUserData, setUserData };
};

export default useFetchPublicUserData;
