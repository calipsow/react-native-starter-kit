import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';

async function addFieldToDocuments(collection_id, field_path, value) {
  const db = getFirestore();
  const collRef = collection(db, collection_id);
  const snapshot = await getDocs(collRef);

  snapshot.forEach(async docSnapshot => {
    if (!(field_path in docSnapshot.data())) {
      const docRef = doc(db, collection_id, docSnapshot.id);
      const updateObject = {};
      updateObject[field_path] = value;
      await updateDoc(docRef, updateObject);
    }
  });
}

export default addFieldToDocuments;
