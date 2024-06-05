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
import { colors, fonts } from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import useFirestoreSearch from '../hooks/firebase/use-collection-search';
import getFontSize from '../functions/ui/resolve-relative-font-size';

const SearchBar = ({
  placeholder,
  onSearchResults = function (results = []) {},
  onLoading = function (isLoading) {},
  queryText = function (queryText) {},
}) => {
  const { loading, search, searchError, searchResults, searchDone } =
    useFirestoreSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = (query = '') => {
    setSearchQuery(query);
    if (!query || !query.trim()) return;
    // Implement your search logic here
    // console.log('Searching for:', query);
    search(
      'Events',
      ['name', 'location.province', 'location.city', 'location.street'],
      query.trim(),
    );
  };

  useEffect(() => {
    onSearchResults(searchResults);
  }, [searchResults]);

  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (searchError) console.error(searchError);
  }, [searchError]);

  useEffect(() => {
    queryText(searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder={placeholder}
        placeholderTextColor="#C1D6EA" // Tailwind class: text-slate-500
        returnKeyType="search"
      />
      <View style={styles.iconButton}>
        {!loading ? (
          <>
            {!searchQuery ? (
              <FontAwesome name="search" size={19} color={colors.lightBlue} />
            ) : null}
          </>
        ) : (
          <ActivityIndicator
            size={'small'}
            color={colors.lightGray}
            style={{ margin: 'auto' }}
          />
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
    // Tailwind class: bg-white for light mode
    // for dark mode, use dark:bg-slate-800
  },
  input: {
    height: 45, // Adjust as needed
    paddingLeft: 36, // Tailwind class: pl-9, adjust based on your icon size and padding
    paddingRight: 12, // Tailwind class: pr-3
    borderRadius: 12, // Adjust as needed
    backgroundColor: colors.primary, // Tailwind class: bg-white for light mode
    // for dark mode, use dark:bg-slate-800
    borderColor: colors.primaryDark, // Tailwind class: border-slate-200
    borderWidth: 1,
    fontSize: getFontSize(16), // Adjust as needed
    color: colors.textLight, // Tailwind class: text-slate-800
    // for dark mode, text color
    fontFamily: fonts.primarySemiBold,
  },
  iconButton: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10, // Adjust based on your icon size
  },
  icon: {
    width: 19, // Adjust as needed
    height: 19, // Adjust as needed
    tintColor: '#9CA3AF', // Tailwind class: text-slate-500
  },
});

SearchBar.defaultProps = {
  placeholder: 'Search…',
};

export default SearchBar;
