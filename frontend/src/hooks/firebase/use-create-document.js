import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; // Stellen Sie sicher, dass dieser Pfad korrekt ist
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

const useCreateDocument = () => {
  const { db } = useContext(Firebase); // Stellen Sie sicher, dass der Context korrekt verwendet wird
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');

  const createDocument = async (collectionID, documentId, data) => {
    try {
      // Prüfe, ob ein documentId vorhanden ist, um ein spezifisches Dokument zu erstellen oder zu überschreiben
      const docRef = documentId
        ? doc(getFirestore(), collectionID, documentId)
        : doc(collection(getFirestore(), collectionID));
      await setDoc(docRef, data, { merge: true }); // 'merge: true' fügt Daten zu einem bestehenden Dokument hinzu oder erstellt ein neues Dokument, wenn es nicht existiert

      setSucceeded(true);
    } catch (err) {
      console.error('Fehler beim Erstellen des Dokuments: ', err);
      setError(err.message);
      setSucceeded(false);
    }
  };

  return { createDocument, succeeded, error, setSucceeded };
};

export default useCreateDocument;
