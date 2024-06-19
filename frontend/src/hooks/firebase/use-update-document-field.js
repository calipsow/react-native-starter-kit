import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; // Ensure this path is correctly set to import Firebase context
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

/**
 * A custom React hook for updating a specific field in a Firestore document.
 * Manages the update status, error state, and the updated document's snapshot.
 *
 * @returns {Object} An object containing the function to update a document field, status of the operation, any occurred error, and the updated document snapshot.
 */
const useUpdateDocumentField = () => {
  const { db } = useContext(Firebase); // Accessing the Firestore database instance from Firebase context
  const [succeeded, setSucceeded] = useState(false); // State to track if the update operation was successful
  const [error, setError] = useState(''); // State to store any errors that occur during the update
  const [updatedDoc, setUpdatedDoc] = useState(null); // State to store the updated document data

  /**
   * Updates a specific field in a Firestore document.
   *
   * @param {string} collection - The Firestore collection name where the document is located.
   * @param {string} documentId - The ID of the document to update.
   * @param {string} fieldPath - The path to the specific field in the document to update.
   * @param {any} newValue - The new value to set for the specified field.
   */
  const updateField = async (collection, documentId, fieldPath, newValue) => {
    // Reset states on each call
    setSucceeded(false);
    setError('');
    setUpdatedDoc(null);

    // Validate if all necessary parameters are provided
    if (!collection || !documentId || !fieldPath) {
      setError('All parameters must be defined.');
      return;
    }

    try {
      const documentRef = doc(db, collection, documentId);
      const documentSnapshot = await getDoc(documentRef);

      // Check if the document exists
      if (!documentSnapshot.exists()) {
        setError(`The document with ID ${documentId} does not exist.`);
        setSucceeded(false);
        return;
      }

      // Update the specified field
      await updateDoc(documentRef, {
        [fieldPath]: newValue,
      });

      // Set state to indicate successful update and store the updated document data
      setSucceeded(true);
      setError('');
      setUpdatedDoc({ ...documentSnapshot.data(), [fieldPath]: newValue });
    } catch (err) {
      // Handle any errors during the update process
      setError(err.message);
      setSucceeded(false);
    }
  };

  return { updateField, succeeded, error, updatedDoc };
};

export default useUpdateDocumentField;
