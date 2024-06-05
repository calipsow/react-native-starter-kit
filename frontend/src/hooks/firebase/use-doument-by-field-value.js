import { useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firebase } from '../../../App';

const useGetDocumentsByFieldValue = () => {
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const { db } = useContext(Firebase);

  const getDocumentsByValue = async ({ collectionPath, fieldPath, value }) => {
    setLoading(true);
    setDocuments([]);
    try {
      // Firestore-Referenz für die Sammlung erstellen
      const q = query(
        collection(db, collectionPath),
        where(fieldPath, '==', value),
      );

      // Dokumente aus der Firestore-Datenbank abrufen
      const querySnapshot = await getDocs(q);
      const documentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Zustände aktualisieren
      setDocuments(documentsData);
      setSucceed(true);
    } catch (err) {
      // Fehlerbehandlung
      console.error(err);
      setError(err.message);
      setSucceed(false);
    }
    setLoading(false);
  };

  return { succeed, documents, error, getDocumentsByValue, loading };
};

export default useGetDocumentsByFieldValue;
