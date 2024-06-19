import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import {
  appThemeColor,
  screenPadding,
  subHeaderTextLightGray,
  mediumHeadlineText,
} from '../../../styles/partials';
import SearchBar from '../../../components/Searchbar';
import { ProductCard } from '../products/partials/ProductCard';
import FeedArticlePost from '../../blogs/UI/FeedPost';
import BlogCard from '../../blogs/UI/BlogCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fbImage } from '../../../constants/constants';

const SearchPage = ({ navigation, route }) => {
  var { query } = route.params;

  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Searchbar, Header, SearchPage */}
        <View style={styles.heroSection}>
          <Text style={mediumHeadlineText}>Search Results</Text>
          <SearchBar />
          <Text style={subHeaderTextLightGray}>
            Found 100 results for &quot;{query}&quot;
          </Text>
        </View>
        {/* Section Search Results */}
        <View style={styles.searchResults}>
          {[
            {
              type: 'product',
              title: 'some kind of',
              imageUrl: fbImage,
              price: 20.99,
            },
          ].map((itm, i) => {
            // console.log(itm);
            switch (itm.type) {
              case 'product':
                return (
                  <ProductCard
                    imageUrl={itm.imageUrl}
                    multiline={true}
                    price={itm.price}
                    title={itm.title}
                    key={`${itm.title}-${i}`}
                    hideButtons={true}
                  />
                );
              case 'article':
                return <FeedArticlePost key={`${i}--`} />;

              case 'blog':
                return (
                  <View style={{ width: '100%' }}>
                    <BlogCard
                      articles={'Some Article'}
                      blogDescription={'455 Kupzah River 756 Vumo Square'}
                      blogTitle={'Windows Hacks'}
                      publisher={'calispow'}
                      comments={45}
                      likes={120}
                      featuredImage={
                        'https://images.unsplash.com/photo-1620843002805-05a08cb72f57?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2luZG93cyUyMDEwfGVufDB8fDB8fHww'
                      }
                      tags={['windows', 'articles']}
                      key={`${i}--l`}
                    />
                  </View>
                );

              default:
                return null;
            }
          })}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appThemeColor.darkBlue,
    paddingHorizontal: 12,
    flex: 1,
  },
  heroSection: {
    width: '100%',
    paddingVertical: 30,
  },
  searchResults: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SearchPage;
