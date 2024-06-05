import { doc, getFirestore, updateDoc } from 'firebase/firestore';
/**
 *
 * @param {*} collectionID
 * @param {*} docID
 * @param {*} fieldPath
 * @param {*} value
 * @returns error object if something goes wrong
 */
const updateFirestoreDocument = async (
  collectionID,
  docID,
  fieldPath,
  value,
) => {
  const db = getFirestore();

  const docRef = doc(db, collectionID, docID);
  try {
    await updateDoc(docRef, {
      [fieldPath]: value,
    });
  } catch (error) {
    console.warn('Error updating document:', error);
    return error;
  }
};

export default updateFirestoreDocument;
