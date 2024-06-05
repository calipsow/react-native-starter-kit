import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase-client';
import FirebaseAuthCacheController from '../../controller/cache/firebase-auth-controller';

/**
 * Lädt alle Dokumente aus einer angegebenen Firestore-Kollektion
 * @param {string} collectionName Der Name der Firestore-Kollektion
 * @returns {Promise<Array>} Ein Promise, das beim Erfolg ein Array von Dokumentdaten zurückgibt
 */
async function getDocsFromCollection(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error('Fehler beim Laden der Dokumente:', error);
    throw error;
  }
}
export default getDocsFromCollection;
