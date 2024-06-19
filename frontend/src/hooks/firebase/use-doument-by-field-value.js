import { useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firebase } from '../../../App';

/**
 * A React hook for fetching documents from a Firestore collection based on a field value.
 * Manages the loading state, success status, fetched documents, and any errors that occur.
 *
 * @returns {Object} Contains the function to fetch documents, fetched documents array, loading, success, and error states.
 */
const useGetDocumentsByFieldValue = () => {
  const [succeed, setSucceed] = useState(false); // State to indicate if the fetch operation was successful
  const [loading, setLoading] = useState(false); // State to indicate if the fetch operation is in progress
  const [documents, setDocuments] = useState([]); // State to store the fetched documents
  const [error, setError] = useState(''); // State to store any error that occurs during fetching
  const { db } = useContext(Firebase); // Accessing the Firestore database instance from the context

  /**
   * Fetches documents from a specified collection where the specified field has the specified value.
   *
   * @param {Object} params - Parameters for fetching documents.
   * @param {string} params.collectionPath - Firestore collection path.
   * @param {string} params.fieldPath - The field to query against.
   * @param {string|number} params.value - The value to match for the specified field.
   */
  const getDocumentsByValue = async ({ collectionPath, fieldPath, value }) => {
    setLoading(true);
    setDocuments([]);
    setError('');
    try {
      // Create a query against the specified collection and field
      const q = query(
        collection(db, collectionPath),
        where(fieldPath, '==', value),
      );

      // Execute the query and map results to an array of documents
      const querySnapshot = await getDocs(q);
      const documentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocuments(documentsData); // Update the documents state with the fetched data
      setSucceed(true); // Update succeed state to true on successful fetch
    } catch (err) {
      // Handle errors and update the error state
      console.error('Error fetching documents:', err);
      setError(err.message);
      setSucceed(false);
    }
    setLoading(false); // Update loading state to false after the operation completes
  };

  return { succeed, documents, error, getDocumentsByValue, loading }; // Return the function and states
};

export default useGetDocumentsByFieldValue;
