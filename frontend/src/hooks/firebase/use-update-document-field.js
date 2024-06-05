import { useState, useContext } from 'react';
import { Firebase } from '../../../App';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const useUpdateDocumentField = () => {
  const { db } = useContext(Firebase);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [updatedDoc, setUpdatedDoc] = useState(null);

  const updateField = async (collection, documentId, fieldPath, newValue) => {
    // Zurücksetzen der States bei jedem Aufruf
    setSucceeded(false);
    setError('');
    setUpdatedDoc(null);

    // Prüfe, ob alle Parameter definiert sind
    if (!collection || !documentId || !fieldPath) {
      setError('Alle Parameter müssen definiert sein.');
      return;
    }

    try {
      const documentRef = doc(db, collection, documentId);
      const documentSnapshot = await getDoc(documentRef);
      if (!documentSnapshot.exists()) {
        setError(`Das Dokument mit der ID ${documentId} existiert nicht.`);
        setSucceeded(false);
        return;
      }

      // Aktualisiere das Feld
      await updateDoc(documentRef, {
        [fieldPath]: newValue,
      });

      setSucceeded(true);
      setError('');
      setUpdatedDoc({ ...documentSnapshot.data(), [fieldPath]: newValue });
    } catch (err) {
      setError(err.message);
      setSucceeded(false);
    }
  };

  return { updateField, succeeded, error, updatedDoc };
};

export default useUpdateDocumentField;
