import { useState, useContext } from 'react';
import { Firebase } from '../../../App';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

/**
 * A React hook to create or update a document in Firestore.
 * Manages the success and error states related to the document creation or update operation.
 *
 * @returns {Object} The function to create or update a document and the states indicating success or error.
 */
const useCreateDocument = () => {
  const { db } = useContext(Firebase); // Accessing the Firestore instance from the context
  const [succeeded, setSucceeded] = useState(false); // State to track if the document creation/update succeeded
  const [error, setError] = useState(''); // State to store any error messages

  /**
   * Creates or updates a document in a specified collection with optional merge behavior.
   * If documentId is provided, it updates the specified document, otherwise creates a new one.
   *
   * @param {string} collectionID - ID of the collection where the document will be created/updated.
   * @param {string} documentId - Optional ID of the document to update. If not provided, a new document ID is generated.
   * @param {Object} data - The data to set in the document.
   */
  const createDocument = async (collectionID, documentId, data) => {
    if (!db) {
      console.error('Firebase is not initialized.'); // Ensure Firebase is initialized
      return;
    }
    try {
      // Reference to the document to create or update
      const docRef = documentId
        ? doc(getFirestore(), collectionID, documentId)
        : doc(collection(getFirestore(), collectionID));
      await setDoc(docRef, data, { merge: true }); // Set document with merge option to avoid overwriting entire document if it exists

      setSucceeded(true); // Update succeeded state on successful document creation/update
    } catch (err) {
      console.error('Error creating the document:', err); // Log and set error if an issue occurs
      setError(err.message);
      setSucceeded(false);
    }
  };

  return { createDocument, succeeded, error, setSucceeded };
};

export default useCreateDocument;
