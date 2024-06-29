import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase-client';
import FirebaseAuthCacheController from '../../controller/cache/firebase-auth-controller';

/**

* Loads all documents from a specified Firestore collection

* @param {string} collectionName The name of the Firestore collection

* @returns {Promise<Array>} A promise that returns an array of document data upon success

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
