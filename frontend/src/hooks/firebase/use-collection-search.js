import { useState, useEffect, useCallback, useContext } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import debounce from 'lodash/debounce';
import { Firebase } from '../../../App';
import getNestedProperty from '../../helpers/search-property-in-object';

function useFirestoreSearch() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [searchDone, setSearchDone] = useState(null); // initial state is null after the first search is set to true or false
  const { db } = useContext(Firebase);

  const debouncedSearch = useCallback(
    debounce(async (collectionID = '', fieldPaths = [], queryText = '') => {
      console.log(
        'Searching for:',
        queryText,
        'by fields',
        fieldPaths.join(', '),
        'in',
        collectionID,
      );
      setLoading(true);
      setSearchError(null);
      setSearchDone(false);
      setSearchResults([]);
      const searchResults = new Map();
      try {
        const collectionRef = collection(db, collectionID);
        const querySnapshot = await getDocs(query(collectionRef));

        const results = [];

        querySnapshot.forEach(doc => {
          const docData = doc.data();

          const match = fieldPaths.some(fieldPath => {
            const fieldValue = !fieldPath.includes('.')
              ? docData[fieldPath]
              : getNestedProperty(docData, fieldPath);
            if (typeof fieldValue === 'string') {
              const lowerQueryText = queryText.toLowerCase();
              const lowerFieldValue = fieldValue.toLowerCase();

              // Überprüfen, ob die Mindestlänge 5 erreicht ist
              if (queryText.length >= 5) {
                // Verwende includes() für Suchbegriff ab 5 Zeichen
                if (lowerFieldValue.includes(lowerQueryText)) {
                  if (!searchResults.has(doc.id)) {
                    let d = doc.data();
                    if (!d.approval.approved) return false;
                    searchResults.set(doc.id, doc.data());
                    return true;
                  } else return false;
                }
              } else {
                // Andernfalls Gleichheit prüfen
                if (lowerFieldValue === lowerQueryText) {
                  if (!searchResults.has(doc.id)) {
                    let d = doc.data();
                    if (!d.approval.approved) return false;
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
        setSearchError(error.message);
      } finally {
        setLoading(false);
        setSearchDone(true);
      }
    }, 500), // 0.5 Sekunden Puffer
    [],
  );

  const search = (collectionID, fieldPaths, queryText) => {
    if (!db) return console.error('Firebase is not initialized.');

    debouncedSearch(collectionID, fieldPaths, queryText);
  };

  return { loading, searchResults, searchError, search, searchDone };
}

export default useFirestoreSearch;
