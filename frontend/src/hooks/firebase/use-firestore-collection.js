import { useState, useEffect, useContext } from 'react';
import { Firebase } from '../../../App'; // Adjust path as necessary
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

/**
 * A React hook for fetching documents from a Firestore collection with support for sorting, pagination, and real-time updates.
 *
 * @returns {Object} The fetched documents, loading status, error information, and functions for fetching and managing the documents.
 */
const useFirestoreCollection = () => {
  const { db } = useContext(Firebase); // Context hook to access Firebase database instance
  const [documents, setDocuments] = useState([]); // State for storing the fetched documents
  const [loading, setLoading] = useState(false); // State to indicate whether the documents are currently being fetched
  const [error, setError] = useState(null); // State to store any errors that occur during fetching
  const [lastVisible, setLastVisible] = useState(null); // Document snapshot to handle pagination
  const [hasMore, setHasMore] = useState(true); // State to indicate if more documents are available for fetching

  /**
   * Resets the document fetch state to initial values.
   */
  const resetLoadedProgress = () => {
    setLastVisible(null);
    setHasMore(true);
    setDocuments([]);
    setLoading(false);
    setError(null);
  };

  /**
   * Fetches documents from Firestore based on provided parameters. Supports pagination and sorting.
   *
   * @param {Object} params - Configuration parameters for fetching documents.
   * @param {string} params.collectionPath - Path to the Firestore collection.
   * @param {string} params.sortedBy - Field path and sort direction, separated by a comma (e.g., "name,desc").
   * @param {number} params.maxItems - Maximum number of documents to fetch.
   * @param {number} params.pageIndex - Current page index for pagination.
   * @param {boolean} params.allDocs - If true, fetch all documents disregarding pagination.
   * @param {boolean} params.sortByTimeStamp - If true, sort documents by a timestamp field.
   * @param {string} params.sortByTimeStampField - Field to sort by when sortByTimeStamp is true.
   */
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
      let ref = collection(db, collectionPath); // Reference to the Firestore collection
      let q = query(ref); // Base query

      if (allDocs) {
        q = query(ref);
      } else {
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
            orderBy(fieldPath, direction || 'asc'),
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
      }

      const snapshot = await getDocs(q); // Fetch the documents based on the query
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setDocuments(docs); // Update state with the fetched documents
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Update pagination cursor
      setHasMore(snapshot.docs.length >= maxItems); // Determine if more documents may be available
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
