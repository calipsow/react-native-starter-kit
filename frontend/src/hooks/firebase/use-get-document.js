import { useState, useContext } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Firebase } from '../../../App';
import FirebaseAuthCacheController from '../../controller/cache/firebase-auth-controller';

const useGetDocument = () => {
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [error, setError] = useState('');

  const getDocument = async ({ collectionPath, document_id }) => {
    setLoading(true);
    setDocumentData(null);
    setError('');
    try {
      // console.log(collectionPath, document_id);
      const db = getFirestore();
      const docRef = doc(db, collectionPath, document_id);
      // console.log(docRef);
      const documentSnapshot = await getDoc(docRef);
      // Dokument aus der Firestore-Datenbank abrufen
      const data = documentSnapshot.data();

      if (data) {
        // Dokument existiert, Daten extrahieren
        setDocumentData(data);
        setSucceed(true);
      } else {
        // Dokument existiert nicht
        setError('Das angeforderte Dokument existiert nicht.');
        console.log(
          'Das angeforderte Dokument existiert nicht.',
          collectionPath,
          document_id,
        );
        setSucceed(false);
      }
    } catch (err) {
      setError(err.message);
      // Fehlerbehandlung
      if (err.message.includes('offline')) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await getDocument({ collectionPath, document_id });
      } else {
        setSucceed(false);
      }
    }
    setLoading(false);
  };

  return {
    succeed,
    documentData,
    error,
    getDocument,
    loading,
    setDocumentData,
  };
};

export default useGetDocument;
