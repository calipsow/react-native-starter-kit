import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; // Adjust path as necessary
import { ref, deleteObject } from 'firebase/storage';

/**
 * A React hook to delete an image from Firebase Storage.
 * Manages the success state of the deletion operation, errors, and permission state.
 *
 * @returns {Object} Contains the function to delete an image and states indicating success, error, and permission status.
 */
const useDeleteImage = () => {
  const { storage } = useContext(Firebase); // Access the Firebase storage instance from context
  const [successState, setSuccessState] = useState(false); // State to track if the image deletion was successful
  const [error, setError] = useState(''); // State to store any error messages that occur during deletion
  const [permissionGrantedState, setPermissionGrantedState] = useState(false); // State to track if the operation was permitted (e.g., user had correct permissions)

  /**
   * Deletes an image from Firebase Storage based on its URL.
   *
   * @param {string} imageUrl - The full URL of the image to delete.
   */
  const deleteImage = async imageUrl => {
    setSuccessState(false); // Reset success state to false before attempting deletion
    try {
      // Validate the URL to ensure it's a valid Firebase Storage URL
      if (
        typeof imageUrl !== 'string' ||
        !imageUrl.includes('https://firebasestorage.googleapis.com')
      ) {
        throw new Error('Can not delete image with invalid source');
      }
      const imageRef = ref(storage, imageUrl); // Create a reference to the image in Firebase Storage

      // Perform the deletion operation
      await deleteObject(imageRef);

      setSuccessState(true); // Set success state to true if deletion was successful
      setPermissionGrantedState(true); // Assume permission was granted if deletion was successful
    } catch (err) {
      console.warn('Fehler beim löschen des Bildes: ', err.message); // Log a warning with the error message
      setError(err.message); // Store the error message in state
      setSuccessState(false); // Set success state to false due to failure
    }
  };

  return { deleteImage, successState, error, permissionGrantedState }; // Return the delete function and state indicators
};

export default useDeleteImage;
