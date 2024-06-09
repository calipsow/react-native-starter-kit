import AsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseAuthCacheController {
  static async getCachedQuery(query = '') {
    try {
      const cachedData = await AsyncStorage.getItem(query);
      if (cachedData) {
        const { response, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();

        if (now - timestamp < 300000 * 2) {
          // 300000ms = 5min
          return response;
        } else {
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error('Error while parsing cache:', error);
      return null;
    }
  }

  static async fetchQuery(query, fetchApiCallback = async function () {}) {
    const cachedResponse = await this.getCachedQuery(query);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        const response = await fetchApiCallback(); // method to execute if no cache is found

        await AsyncStorage.setItem(
          query,
          JSON.stringify({
            response: response,
            timestamp: new Date().getTime(),
          }),
        );

        return response;
      } catch (error) {
        console.error('Fehler bei Firestore-Abfrage', error);
        return null;
      }
    }
  }
}
const authCacheController = new FirebaseAuthCacheController();
export { authCacheController };
export default FirebaseAuthCacheController;
