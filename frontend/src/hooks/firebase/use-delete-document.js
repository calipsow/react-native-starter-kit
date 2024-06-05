import { useState, useContext } from 'react';
import { Firebase } from '../../../App';
import { doc, deleteDoc } from 'firebase/firestore';
import useAuthState from '../auth/use-auth-state';

const useDeleteDocumentIfAdmin = () => {
  const { db } = useContext(Firebase);
  const { role } = useAuthState();
  const [success, setSuccess] = useState(false);
  const [permissionState, setPermissionState] = useState(false);

  const deleteDocument = async (collection, documentId) => {
    try {
      // Dokument aus der angegebenen Collection löschen
      const documentRef = doc(db, collection, documentId);

      // Dokument aus der Firestore-Datenbank löschen
      await deleteDoc(documentRef);

      setSuccess(true);
      setPermissionState(true);
    } catch (error) {
      console.warn('Fehler beim Löschen des Dokuments: ', error);
      setSuccess(false);
      setPermissionState(true); // Der Nutzer hatte die Berechtigung, aber es gab einen Fehler beim Löschen
    }
  };

  return { deleteDocument, success, permissionState };
};

export default useDeleteDocumentIfAdmin;
