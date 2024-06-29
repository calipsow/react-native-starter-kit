import { getFirestore, doc, getDoc } from 'firebase/firestore';

const cacheMap = new Map(); // Map for storing the cache data

/**
 * Get a document from Firestore based on the collection ID and document ID.

* First checks whether a valid cache entry exists.

* @param {string} collectionID - The ID of the collection from which the document is retrieved.

* @param {string} docID - The ID of the document to be retrieved.

* @returns {Promise<object|null>} A Promise that returns the retrieved document, or null if no document was found.

*/
const getDocument = async (collectionID = '', docID = '') => {
  try {
    const cacheKey = `${collectionID}:${docID}`;
    const now = Date.now();
    const cachedEntry = cacheMap.get(cacheKey);

// Check whether the cache is valid
    if (
      cachedEntry &&
      now - cachedEntry.timestamp < 60000 &&
      collectionID !== 'Versions'
    ) {
      return cachedEntry.response; // Returning the cached reply
    }

// Database reference and document query
    const db = getFirestore();
    const docRef = doc(db, collectionID, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      cacheMap.set(cacheKey, { response: data, timestamp: now }); 
      return data;
    } else {
      if (collectionID !== 'Admins')
        console.log('No such document!', `${collectionID} ${docID}`);
      cacheMap.set(cacheKey, { response: null, timestamp: now }); 
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
