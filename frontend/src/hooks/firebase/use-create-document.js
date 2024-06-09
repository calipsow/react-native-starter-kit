import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; 
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

const useCreateDocument = () => {
  const { db } = useContext(Firebase); 
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');

  const createDocument = async (collectionID, documentId, data) => {
    try {
      const docRef = documentId
        ? doc(getFirestore(), collectionID, documentId)
        : doc(collection(getFirestore(), collectionID));
      await setDoc(docRef, data, { merge: true }); // 'merge: true' adds data to the doc or create one if nothing was found

      setSucceeded(true);
    } catch (err) {
      console.error('Error creating the document:', err);
      setError(err.message);
      setSucceeded(false);
    }
  };

  return { createDocument, succeeded, error, setSucceeded };
};

export default useCreateDocument;
