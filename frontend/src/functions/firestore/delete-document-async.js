import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  deleteDoc,
} from 'firebase/firestore';

/**

* Writes or updates a document in Firestore.

* @param {string} collectionID - The ID of the collection in which the document is located.

* @param {string} docID - The ID of the document to be deleted.

* @returns {Promise<void>} A promise that is completed when the operation was successful.

*/
const deleteDocument = async (collectionID, docID) => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, collectionID, docID));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

export default deleteDocument;
