import { useState, useEffect, useContext } from 'react';
import { Firebase } from '../../../App'; // Pfad ggf. anpassen
import {
  collection,
  query,
  orderBy,
  startAfter,
  getDocs,
  limit,
  Timestamp,
  where,
} from 'firebase/firestore';

const useFirestoreCollection = () => {
  const { db } = useContext(Firebase);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const resetLoadedProgress = () => {
    setLastVisible(null);
    setHasMore(true);
    setDocuments([]);
    setLoading(false);
    setError(null);
  };

  const fetchDocuments = async ({
    collectionPath,
    sortedBy = '',
    maxItems = 20,
    pageIndex = 0,
    allDocs = false,
    sortByTimeStamp = false,
    sortByTimeStampField = 'start_time',
  }) => {
    setLoading(true);
    setError(null);

    try {
      const now = Timestamp.now();
      let ref = collection(db, collectionPath);
      let q = query(ref);

      if (allDocs) {
        let d = await getDocs(q);
        setDocuments(d.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLastVisible(d.docs[d.docs.length - 1]);
        setHasMore(d.docs.length >= maxItems);
        return;
      }

      if (sortByTimeStamp) {
        q = query(
          ref,
          where(sortByTimeStampField, '>', now),
          orderBy(sortByTimeStampField, 'asc'),
          limit(maxItems),
        );
      } else if (sortedBy) {
        var [fieldPath, direction] = sortedBy.split(',');
        q = query(
          ref,
          direction ? orderBy(fieldPath, direction) : orderBy(fieldPath),
          limit(maxItems),
        );
      } else {
        q = query(ref, limit(maxItems));
      }

      if (pageIndex > 0 && lastVisible) {
        q = query(
          ref,
          sortedBy && orderBy(fieldPath, direction || 'asc'),
          sortByTimeStamp && where(sortByTimeStampField, '>', now),
          sortByTimeStamp && orderBy(sortByTimeStampField, 'asc'),
          startAfter(lastVisible),
          limit(maxItems),
        );
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setDocuments(docs);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length >= maxItems);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    documents,
    loading,
    error,
    hasMore,
    fetchDocuments,
    setDocuments,
    resetLoadedProgress,
  };
};

export default useFirestoreCollection;
