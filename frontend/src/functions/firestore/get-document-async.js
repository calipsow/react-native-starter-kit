import { getFirestore, doc, getDoc } from 'firebase/firestore';

const cacheMap = new Map(); // Map zum Speichern der Cache-Daten

/**
 * Holt ein Dokument aus Firestore basierend auf der Sammlungs-ID und der Dokumenten-ID.
 * Überprüft zuerst, ob ein gültiger Cache-Eintrag vorhanden ist.
 * @param {string} collectionID - Die ID der Sammlung, aus der das Dokument abgerufen wird.
 * @param {string} docID - Die ID des Dokuments, das abgerufen werden soll.
 * @returns {Promise<object|null>} Ein Promise, das das abgerufene Dokument zurückgibt, oder null, wenn kein Dokument gefunden wurde.
 */
const getDocument = async (collectionID = '', docID = '') => {
  try {
    const cacheKey = `${collectionID}:${docID}`;
    const now = Date.now();
    const cachedEntry = cacheMap.get(cacheKey);

    // Überprüfung, ob der Cache gültig ist
    if (
      cachedEntry &&
      now - cachedEntry.timestamp < 60000 &&
      collectionID !== 'Versions'
    ) {
      return cachedEntry.response; // Zurückgeben der gecachten Antwort
    }

    // Datenbank-Referenz und Dokumenten-Abfrage
    const db = getFirestore();
    const docRef = doc(db, collectionID, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      cacheMap.set(cacheKey, { response: data, timestamp: now }); // Aktualisierung des Caches mit gültigen Daten
      return data;
    } else {
      if (collectionID !== 'Admins')
        console.log('No such document!', `${collectionID} ${docID}`);
      cacheMap.set(cacheKey, { response: null, timestamp: now }); // Aktualisierung des Caches auch wenn kein Dokument gefunden wurde
      return null;
    }
  } catch (error) {
    if (error.message.includes('client is offline')) {
      console.warn('Client is offline. Retrying in 5 seconds...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Warte 5 Sekunden
      return await getDocument(collectionID, docID);
    }
    console.warn('Error fetching document:', error);
    throw error;
  }
};

export default getDocument;
