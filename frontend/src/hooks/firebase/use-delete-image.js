import { useState, useContext } from 'react';
import { Firebase } from '../../../App'; // Pfad anpassen
import { ref, deleteObject } from 'firebase/storage';

const useDeleteImage = () => {
  const { storage } = useContext(Firebase);
  const [successState, setSuccessState] = useState(false);
  const [error, setError] = useState('');
  const [permissionGrantedState, setPermissionGrantedState] = useState(false);

  const deleteImage = async imageUrl => {
    setSuccessState(false);
    try {
      if (
        typeof imageUrl !== 'string' ||
        !imageUrl.includes('https://firebasestorage.googleapis.com')
      )
        throw new Error('Can not delete image with invalid source');
      const imageRef = ref(storage, imageUrl);

      // Bild aus dem Storage löschen
      await deleteObject(imageRef);

      setSuccessState(true);
      setPermissionGrantedState(true);
    } catch (err) {
      console.warn('Fehler beim löschen des Bildes ' + err.message);
      setError(err.message);
      setSuccessState(false);
    }
  };

  return { deleteImage, successState, error, permissionGrantedState };
};

export default useDeleteImage;
