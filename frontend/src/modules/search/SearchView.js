import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import {
  appThemeColor,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import SearchBar from '../../components/Searchbar';
import { useEffect, useState } from 'react';
import FeedArticlePost from '../../components/FeedPost';
import { colors } from '../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchView = ({ navigation, route }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [searchDone, setSearchDone] = useState(null);

  const handleSearchResults = results => {
    setSearchResults(results);
  };

  useEffect(() => {
    if (!queryText && searchResults.length) {
      setSearchResults([]);
    }
  }, [queryText]);

  useEffect(() => {
    if (queryText) {
      setLoading(true);
    }
  }, [queryText]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SearchBar
          onLoading={isLoading => setLoading(isLoading)}
          placeholder="Suche nach Veranstaltungen.."
          onSearchResults={handleSearchResults}
          queryText={query => setQueryText(query)}
          searchDoneState={searchDoneState =>
            searchDoneState !== searchDone && setSearchDone(searchDoneState)
          }
        />
        {searchResults.length ? (
          <Text
            style={[
              smallCaptionTextGray,
              { paddingTop: 3, textAlign: 'center' },
            ]}
          >{`Es ${searchResults.length < 2 ? 'wurde' : 'wurden'} ${
            searchResults.length
          } ${searchResults.length < 2 ? 'Event' : 'Events'} gefunden.`}</Text>
        ) : null}
      </View>
      <ScrollView
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/*Search Results*/}
        {searchResults.length && queryText ? (
          searchResults.map((event, i) => (
            <FeedArticlePost
              creator_uid={event.creator_uid}
              data={event}
              description={event.description}
              title={event.name}
              type={'Event'}
              poster={event.event_poster}
              startDate={
                event.start_time
                  ? new Date(
                      event.start_time.seconds * 1000,
                    ).toLocaleDateString()
                  : '2024'
              }
              key={event.name + '-' + i}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              padding: 30,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.8,
            }}
          >
            <MaterialCommunityIcons
              size={120}
              color={colors.bluish}
              style={{ margin: 'auto' }}
              name="text-box-search"
            />
            <Text
              style={[
                mediumHeadlineText,
                { margin: 'auto', textAlign: 'center', maxWidth: 350 },
              ]}
            >
              {!queryText
                ? 'Suche nach Events im Archiv'
                : !loading && !searchResults.length && queryText
                ? `Es wurden keine Ergebnisse für "${queryText}" gefunden.`
                : `Suche im Event-Archiv mit ${queryText}...`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
  },
  searchBar: {
    ...screenPadding,
    paddingVertical: 0,
    width: '100%',
    marginBottom: 6,
    marginTop: 6,
  },
});

export default SearchView;
