import '@react-native-firebase/functions';
import functions from '@react-native-firebase/functions';
import { useState } from 'react';
import FirebaseAuthCacheController from '../../controller/cache/firebase-auth-controller';
import { fbImage } from '../../constants/constants';

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
          displayName: 'ship native dev',
          photoURL: fbImage,
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
