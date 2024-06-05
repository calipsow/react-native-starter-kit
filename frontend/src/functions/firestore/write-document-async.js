import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';
import replaceUndefinedWithNull from '../../helpers/replace-undef-with-null';

/**
 * Schreibt oder aktualisiert ein Dokument in Firestore.
 * @param {string} collectionID - Die ID der Sammlung, in der das Dokument geschrieben oder aktualisiert wird.
 * @param {string} docID - Die ID des Dokuments, das geschrieben oder aktualisiert werden soll.
 * @param {object} data - Das Objekt mit den Daten, die im Dokument gespeichert oder aktualisiert werden sollen.
 * @param {boolean} merge - Gibt an, ob die Daten gemerged (aktualisiert) oder überschrieben werden sollen.
 * @returns {Promise<void>} Ein Promise, das abgeschlossen wird, wenn die Operation erfolgreich war.
 */
const writeDocument = async (collectionID, docID, data, merge = false) => {
  const db = getFirestore();
  const docRef = doc(db, collectionID, docID); // Erstellt eine Referenz zum Dokument

  try {
    if (merge) {
      await updateDoc(docRef, replaceUndefinedWithNull(data)); // Aktualisiert das Dokument mit den neuen Daten
    } else {
      await setDoc(docRef, replaceUndefinedWithNull(data)); // Schreibt die Daten in das Dokument, überschreibt existierende Daten
    }
    // console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
    throw error; // Weitergabe des Fehlers an den Aufrufer
  }
};

export default writeDocument;
