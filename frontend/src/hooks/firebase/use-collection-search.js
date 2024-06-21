import { useState, useEffect, useCallback, useContext } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import debounce from 'lodash/debounce';
import { Firebase } from '../../../App';
import getNestedProperty from '../../helpers/search-property-in-object';

/**
 * A React hook for performing debounced search queries in a Firestore collection.
 * It manages loading state, search results, search completion, and search errors.
 *
 * returns  The state values and functions for managing and performing searches.
 */
function useFirestoreSearch() {
  const [loading, setLoading] = useState(false); // Tracks loading state of search
  const [searchResults, setSearchResults] = useState([]); // Stores the results of the search
  const [searchError, setSearchError] = useState(null); // Stores any error that occurs during the search
  const [searchDone, setSearchDone] = useState(null); // Indicates if a search has been completed
  const { db } = useContext(Firebase); // Firebase database context

  const debouncedSearch = useCallback(
    // Debounce function to limit the frequency of search operations
    debounce(async (collectionID = '', fieldPaths = [], queryText = '') => {
      setLoading(true);
      setSearchError(null);
      setSearchDone(false);
      setSearchResults([]);
      const searchResults = new Map(); // Local map to avoid duplicate results
      try {
        const collectionRef = collection(db, collectionID); // Reference to the Firestore collection
        const querySnapshot = await getDocs(query(collectionRef)); // Fetch documents from the collection
        const results = [];

        // Iterate over each document in the collection
        querySnapshot.forEach(doc => {
          const docData = doc.data();
          // Check each specified field for a match
          const match = fieldPaths.some(fieldPath => {
            const fieldValue = !fieldPath.includes('.')
              ? docData[fieldPath]
              : getNestedProperty(docData, fieldPath); // Support nested properties
            if (typeof fieldValue === 'string') {
              const lowerQueryText = queryText.toLowerCase();
              const lowerFieldValue = fieldValue.toLowerCase();
              // Handle different matching criteria based on query length
              if (queryText.length >= 3) {
                if (lowerFieldValue.includes(lowerQueryText)) {
                  if (!searchResults.has(doc.id)) {
                    searchResults.set(doc.id, doc.data());
                    return true;
                  } else return false;
                }
              } else {
                if (lowerFieldValue === lowerQueryText) {
                  if (!searchResults.has(doc.id)) {
                    searchResults.set(doc.id, doc.data());
                    return true;
                  } else return false;
                }
              }
            }
            return false;
          });

          if (match) {
            results.push({
              id: doc.id,
              ...docData,
            });
          }
        });

        setSearchResults(results);
      } catch (error) {
        setSearchError(error.message); // Handle errors by setting error state
      } finally {
        setLoading(false);
        setSearchDone(true); // Indicate search completion
      }
    }, 500), // Debounce time set to 500 ms
    [],
  );

  /**
   * Initiates a search operation.
   *
   * @param {string} collectionID The ID of the Firestore collection to search.
   * @param {Array} fieldPaths An array of fields to search within each document.
   * @param {string} queryText The text to match against the specified fields.
   */
  const search = (collectionID, fieldPaths, queryText) => {
    if (!db) return console.error('Firebase is not initialized.'); // Ensure Firebase is initialized
    debouncedSearch(collectionID, fieldPaths, queryText);
  };

  return { loading, searchResults, searchError, search, searchDone };
}

export default useFirestoreSearch;
