import { useEffect, useState } from 'react';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
/**
 * This hook will keep track of changes to the accountCtx and automatically,
 * if some changes happen, syncs the firestore db instance for the currently logged in user
 * @param accountCtx current AccountCtx React State of the user. Provided by the AccountContext Provider
 *
 * */
const useSyncAccountChanges = accountCtx => {
  const [lastModifiedData, setLastModifiedData] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [previousState, setPreviousState] = useState(null);
  // Initialisieren von Firestore
  let db;

  const updateFirestoreDocument = async (fieldPath, value, uid) => {
    const docRef = doc(db, 'Users', uid);
    try {
      await updateDoc(docRef, {
        [fieldPath]: value,
      });
      setLastModifiedData({ fieldPath, value });
      setFirebaseError(null);
    } catch (error) {
      console.error('Error updating document:', error);
      setFirebaseError(error.message);
    }
  };

  useEffect(() => {
    if (!accountCtx) return;
    if (firebaseError) {
      console.warn(
        'Failed to sync accountCtx with firestore last modified field',
        lastModifiedData,
      );
    }
  }, [firebaseError]);

  useEffect(() => {
    if (!accountCtx) return;
    if (previousState && !accountCtx) {
      // resets the previous state to null if the user logs out
      setPreviousState(accountCtx);
      return;
    }

    if (!accountCtx) return; // preventing useless state updates

    if (!previousState) {
      // only runs if a accountCtx is given and the previous state is null so it update the previous state initial and stops there
      setPreviousState(accountCtx);
      return;
    }
    // at this point there is a difference between the previous state and the new accountCtx while the user was and is logged in, so it will track the diff and updates the firestore db to get sync with this new state of the accountCtx
    const currentData = accountCtx || {};

    Object.keys(currentData).forEach(key => {
      if (key === 'firebase_auth_data') return; // ignoring firebase managed changes stored in `firebase_auth_data`
      const oldValue = previousState[key];
      const newValue = currentData[key];

      if (newValue !== oldValue) {
        updateFirestoreDocument(key, newValue, accountCtx.uid); // updates the db
        setPreviousState(accountCtx); // update the previous state to the latest changes to prevent useless rewrites to the db of the same state over and over again
      }
    });
  }, [accountCtx]);

  useEffect(() => {
    if (accountCtx && !db) {
      db = getFirestore();
    }
  }, [accountCtx]);

  return { firebaseError, lastModifiedData };
};

export default useSyncAccountChanges;
