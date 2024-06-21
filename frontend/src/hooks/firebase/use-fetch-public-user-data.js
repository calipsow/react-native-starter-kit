import '@react-native-firebase/functions';
import functions from '@react-native-firebase/functions';
import { useState } from 'react';
import FirebaseAuthCacheController from '../../controller/cache/firebase-auth-controller';
import { fbImage } from '../../constants/constants';

/**
 * A React hook for fetching public user data from Firebase using a cloud function.
 * Manages user data, error handling, and loading state.
 *
 * returns  Contains the user data, error state, loading state, and function to initiate user data fetching.
 */
const useFetchPublicUserData = () => {
  const [userData, setUserData] = useState(null); // State to store the user data fetched
  const [fetchUserError, setError] = useState(null); // State to store any errors that occur during the fetch
  const [loadingUser, setLoading] = useState(false); // State to indicate if the fetch operation is in progress

  /**
   * Fetches user data by a given UID and sets the user data into state.
   * Uses caching to optimize network usage.
   *
   * @param {string} uid - The unique identifier for the user.
   */
  const fetchUserData = async uid => {
    setLoading(true);
    setError(null);
    try {
      // Define the cloud function for getting user data
      const getUserData = functions().httpsCallable('getUserData');
      // Attempt to fetch cached data or execute the cloud function if cache is stale
      const response = await FirebaseAuthCacheController.fetchQuery(
        uid,
        async () => await getUserData({ uid }),
      );

      // Check if the response contains data and update state accordingly
      if (response?.data) {
        setUserData(response.data);
      } else {
        // Provide default data if no data is returned from the function
        setUserData({
          displayName: 'ship native dev',
          photoURL: fbImage,
        });
      }
    } catch (err) {
      // Handle errors and update error state
      console.error('Error fetching user data:', err);
      setError(err.message || 'Failed to fetch user data');
      setUserData(null);
    } finally {
      setLoading(false); // Ensure loading state is set to false when operation completes
    }
  };

  return { userData, fetchUserError, loadingUser, fetchUserData, setUserData };
};

export default useFetchPublicUserData;
