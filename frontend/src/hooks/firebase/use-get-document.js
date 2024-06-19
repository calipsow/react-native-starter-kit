import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useState } from 'react';

/**
 * A React hook to fetch a document from Firebase Firestore.
 * Handles loading state, success, and error state.
 *
 * @return {Object} An object containing the document data, error, loading state, and a function to initiate fetching.
 */
const useGetDocument = () => {
  // State to indicate if the fetch operation was successful
  const [succeed, setSucceed] = useState(false);
  // State to indicate if the fetch operation is in progress
  const [loading, setLoading] = useState(false);
  // State to store the document data fetched from Firestore
  const [documentData, setDocumentData] = useState(null);
  // State to store any error that occurs during fetching
  const [error, setError] = useState('');

  /**
   * Fetches a document from Firestore based on the provided collection path and document ID.
   * Sets loading state and clears previous data and errors before starting a new fetch.
   *
   * @param {Object} params An object containing the collection path and document ID.
   * @param {string} params.collectionPath Firestore collection path.
   * @param {string} params.document_id The ID of the document to fetch.
   */
  const getDocument = async ({ collectionPath, document_id }) => {
    setLoading(true);
    setDocumentData(null);
    setError('');
    try {
      const db = getFirestore();
      const docRef = doc(db, collectionPath, document_id);
      const documentSnapshot = await getDoc(docRef);

      const data = documentSnapshot.data();
      if (data) {
        setDocumentData(data);
        setSucceed(true);
      } else {
        setError('Das angeforderte Dokument existiert nicht.');
        console.error(
          'Das angeforderte Dokument existiert nicht.',
          collectionPath,
          document_id,
        );
        setSucceed(false);
      }
    } catch (err) {
      setError(err.message);
      if (err.message.includes('offline')) {
        // Retry logic for offline error
        await new Promise(resolve => setTimeout(resolve, 2000));
        await getDocument({ collectionPath, document_id });
      } else {
        setSucceed(false);
      }
    }
    setLoading(false);
  };

  return {
    succeed, // Indicates success of the operation
    documentData, // Data of the fetched document
    error, // Error message if an error occurred
    getDocument, // Function to initiate the document fetch
    loading, // Indicates if the operation is in progress
    setDocumentData, // Exposes function to manually set document data
  };
};

export default useGetDocument;
