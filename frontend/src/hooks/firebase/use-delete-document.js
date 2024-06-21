import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; // Importing the Firebase context from the App component
import { doc, deleteDoc } from 'firebase/firestore';

/**
 * A React hook to delete a document from Firestore.
 * Manages the success state of the deletion operation and permission state to perform the operation.
 *
 * returns  Contains the function to delete a document and states indicating success and permission status.
 */
const useDeleteDocument = () => {
  const { db } = useContext(Firebase); // Access the Firebase database instance from context
  const [success, setSuccess] = useState(false); // State to track if the document deletion was successful
  const [permissionState, setPermissionState] = useState(false); // State to track if the operation was permitted (e.g., user had correct permissions)

  /**
   * Deletes a document from a specified collection and document ID.
   *
   * @param {string} collection - The collection from which the document will be deleted.
   * @param {string} documentId - The ID of the document to delete.
   */
  const deleteDocument = async (collection, documentId) => {
    if (!db) {
      console.error('Firebase is not initialized.'); // Ensure Firebase is initialized before proceeding
      return;
    }
    try {
      const documentRef = doc(db, collection, documentId); // Reference to the document to be deleted
      await deleteDoc(documentRef); // Delete the document
      setSuccess(true); // Update success state to true on successful deletion
      setPermissionState(true); // Update permission state to true (assuming permission was granted for the operation)
    } catch (error) {
      console.warn('Fehler beim Löschen des Dokuments: ', error); // Log warning if deletion fails
      setSuccess(false); // Update success state to false on failure
      if (error.message.includes('permission')) setPermissionState(false); // permission was not given for deleting, check at your firestore db the rule set
    }
  };

  return { deleteDocument, success, permissionState }; // Return the delete function and state indicators
};

export default useDeleteDocument;
