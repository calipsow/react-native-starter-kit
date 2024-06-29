import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';
import replaceUndefinedWithNull from '../../helpers/replace-undef-with-null';

/**

* Writes or updates a document in Firestore.

* @param {string} collectionID - The ID of the collection in which the document is written or updated.

* @param {string} docID - The ID of the document to be written or updated.

* @param {object} data - The object with the data to be stored or updated in the document.

* @param {boolean} merge - Specifies whether the data should be merged (updated) or overwritten.

* @returns {Promise<void>} A promise that is completed when the operation was successful.

*/
const writeDocument = async (collectionID, docID, data, merge = false) => {
  const db = getFirestore();
  const docRef = doc(db, collectionID, docID); // Erstellt eine Referenz zum Dokument

  try {
    if (merge) {
      await updateDoc(docRef, replaceUndefinedWithNull(data)); // Aktualisiert das Dokument mit den neuen Daten
    } else {
      await setDoc(docRef, replaceUndefinedWithNull(data)); // Schreibt die Daten in das Dokument, überschreibt existierende Daten
    }

  } catch (error) {
    console.error('Error writing document: ', error);
    throw error; 
  }
};

export default writeDocument;
