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
 * Schreibt oder aktualisiert ein Dokument in Firestore.
 * @param {string} collectionID - Die ID der Sammlung, in der das Dokument sich befindet.
 * @param {string} docID - Die ID des Dokuments, das gelöscht werden soll.
 * @returns {Promise<void>} Ein Promise, das abgeschlossen wird, wenn die Operation erfolgreich war.
 */
const deleteDocument = async (collectionID, docID) => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, collectionID, docID));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error; // Weitergabe des Fehlers an den Aufrufer
  }
};

export default deleteDocument;
