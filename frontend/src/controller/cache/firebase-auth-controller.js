import AsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseAuthCacheController {
  static async getCachedQuery(query = '') {
    try {
      const cachedData = await AsyncStorage.getItem(query);
      if (cachedData) {
        const { response, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        // Prüfe, ob die Daten noch innerhalb des 5-Minuten Zeitfensters sind
        if (now - timestamp < 300000 * 2) {
          // 600000ms = 10 Minuten
          // console.log('resolving response from cache..');
          return response;
        } else {
          // console.log('deleting expired response from cache..');
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error('Fehler beim Lesen des Caches', error);
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

        // console.log('storing request to cache.. key:', query, response);
        // Speichere die neue Antwort im Cache
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
