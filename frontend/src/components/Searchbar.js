import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useFirestoreSearch from '../hooks/firebase/use-collection-search';
import getFontSize from '../helpers/resolve-relative-font-size';
import { colors, fonts } from '../styles';

/**
 * A search bar component that integrates with Firebase to perform live search queries.
 *
 * @param {Object} props The component props.
 * @param {string} props.placeholder Placeholder text for the search input.
 * @param {function} props.onSearchResults Callback function that receives the search results.
 * @param {function} props.onLoading Callback function that indicates the loading status.
 * @param {function} props.queryText Callback function that sends back the current query text.
 * @param {string} props.collectionID Firestore collection ID to perform the search on.
 * @param {Array} props.fieldPaths Fields within the collection to search against.
 * @returns {JSX.Element} A fully functional search bar component.
 */
const SearchBar = ({
  placeholder,
  onSearchResults = function (results = []) {},
  onLoading = function (isLoading) {},
  queryText = function (queryText) {},
  collectionID = 'Users',
  fieldPaths = ['username'],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, search, searchError, searchResults, searchDone } =
    useFirestoreSearch();

  const handleSearch = (query = '') => {
    setSearchQuery(query);
    if (!query.trim()) return;
    search(collectionID, fieldPaths, query.trim());
  };

  useEffect(() => {
    console.log(!searchResults.length ? 'nothing found!' : searchResults);
    onSearchResults(searchResults);
  }, [searchResults]);

  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (searchError) console.error('Search Error:', searchError);
  }, [searchError]);

  useEffect(() => {
    queryText(searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        className="bg-gray-800 text-white p-2 rounded-lg mt-4 mb-1"
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder={placeholder}
        placeholderTextColor="#C1D6EA"
        returnKeyType="search"
      />
      <View style={styles.iconButton}>
        {!loading ? (
          !searchQuery ? (
            <FontAwesome name="search" size={19} color={colors.lightBlue} />
          ) : null
        ) : (
          <ActivityIndicator size="small" color={colors.lightGray} />
        )}
      </View>
      {searchQuery && !loading ? (
        <View style={[styles.iconButton, { right: 0 }]}>
          <Pressable onPress={() => setSearchQuery('')}>
            <AntDesign name="close" size={19} color={colors.lightGray} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 45,
    paddingLeft: 36,
    paddingRight: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    fontSize: getFontSize(16),
    color: colors.textLight,
    fontFamily: fonts.primarySemiBold,
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 8,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default SearchBar;
