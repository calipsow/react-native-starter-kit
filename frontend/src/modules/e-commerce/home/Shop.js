import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../../../components/Searchbar';
import ShopCategories from '../categories/Categories';
import RNSRadioGroup from '../../../components/RadioGroup';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  sectionTitleCreme,
  subHeaderTextLightGray,
} from '../../../styles/partials';
import { ProductCard } from '../products/partials/ProductCard';
import { SectionPageLinks } from './partials/SectionPageLinks';
import { ScreenFooter } from './partials/ScreenFooter';
import { SpotlightProduct } from './partials/SpotlightProduct';
import getFontSize from '../../../helpers/resolve-relative-font-size';
import { fbImage } from '../../../constants/constants';

function ShopPage() {
  const navigation = useNavigation();
  const [radioGroupsState, setRadioGroupsState] = useState([0, 0]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header, Searchbar, Navigation */}
      <View style={{ width: '100%' }}>
        <View style={styles.pageHeader}>
          <Text style={[mediumHeadlineText, styles.whiteText]}>
            Online Shop 💫
          </Text>
        </View>
        <SearchBar style={styles.searchForm} onSubmit={handleSearchSubmit} />
        <RNSRadioGroup
          darkMode={true}
          style={{
            marginVertical: 15,
            borderColor: colors.primaryDark,
            borderWidth: 1,
            borderRadius: 30,
          }}
          items={['Overview', 'Collections', 'Special Offers']}
          selectedIndex={radioGroupsState[0]}
          onChange={index =>
            setRadioGroupsState({ ...radioGroupsState, 0: index })
          }
        />
      </View>

      {/* Single Product */}
      <ShopPageSection title="Product Showcase" navigation={navigation}>
        <SpotlightProduct
          navigation={navigation}
          imageSrc="https://shop.callipson.com/cdn/shop/files/164293ac-9c59-4790-99d6-5dfad6cd3c0f.jpg?v=1709666468"
        />
      </ShopPageSection>
      {/* Categories */}
      <ShopPageSection title="Popular Categories" navigation={navigation}>
        <ShopCategories navigation={navigation} />
        <ShopCategories navigation={navigation} />
      </ShopPageSection>
      {/* Category Products */}
      <ShopPageSection title="Gaming Keyboards" navigation={navigation}>
        <ScrollView
          horizontal
          contentContainerStyle={{ columnGap: 15 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {[
            {
              title: 'Air Force Fighter',
              imageUrl: fbImage,
              price: 14.99,
            },
            {
              title: 'Air Force Fighter',
              imageUrl: fbImage,
              price: 14.99,
            },
            {
              title: 'Air Force Fighter',
              imageUrl: fbImage,
              price: 14.99,
            },
          ].map((item, i) => (
            <View
              key={`card-${i}`}
              style={{ width: Dimensions.get('window').width * 0.65 }}
            >
              <ProductCard
                style={{ width: '100%' }}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                key={`${item.title}-${i}`}
              />
            </View>
          ))}
        </ScrollView>
      </ShopPageSection>
      {/* Single Product */}
      <ShopPageSection title="" navigation={navigation}>
        <SpotlightProduct
          navigation={navigation}
          imageSrc="https://shop.callipson.com/cdn/shop/products/image_ab893255-e927-4bfd-8a82-da9f747afb4c.jpg?v=1678653763&width=493"
        />
      </ShopPageSection>
      <ScreenFooter />
      <SectionPageLinks />
    </ScrollView>
  );
}

export const ShopPageSection = ({ title, children }) => (
  <View style={styles.cardsSection}>
    <Text
      style={[
        sectionTitleCreme,
        title && { marginBottom: 30, fontSize: getFontSize(26) },
      ]}
    >
      {title && title}
    </Text>
    {children}
  </View>
);

// Placeholder function for search submit
const handleSearchSubmit = () => console.log('Search submitted');

export const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 30,
    borderRadius: 8,
    backgroundColor: colors.bluish,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },

  footerSectionTitle: {
    // Assuming sectionTitleCreme is a base style for the title
    ...sectionTitleCreme,
    color: colors.primary,
    fontSize: getFontSize(30),
    maxWidth: '80%',
    marginTop: 0,
  },
  footerSubHeaderText: {
    ...subHeaderTextLightGray,
    // Assuming subHeaderTextLightGray is a base style for the subtitle
    color: colors.darkGray,
    fontSize: getFontSize(19),
    letterSpacing: -0.51,
    paddingVertical: 0,
  },
  footerButtonContainer: {
    ...flexBoxRow,
    flexWrap: 'wrap',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row', // Assuming flexBoxRow already defined flexDirection: 'row'
  },
  demoButton: {
    marginVertical: 8,
  },
  demoButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContentSubTitle: {
    marginVertical: 10,
    fontFamily: fonts.primaryRegular,
    fontSize: getFontSize(19),
    color: colors.grey,
  },
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
    paddingHorizontal: 12,
  },
  contentContainer: {
    flexWrap: 'nowrap',
    gap: 70,
  },
  pageHeader: {
    paddingVertical: 20,
  },
  searchForm: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filters: {
    paddingHorizontal: 5,
    marginVertical: 20,
  },
  filterItem: {
    marginRight: 15,
    color: colors.bluish,
    paddingBottom: 8,
    fontSize: getFontSize(14),
    fontWeight: '500',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterItemSelected: {
    borderBottomColor: colors.bluish,
  },
  cardsSection: {
    paddingVertical: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    ...sectionTitleCreme,
    fontSize: getFontSize(28),
    marginTop: 0,
    color: '#111827',
    maxWidth: '80%',
    lineHeight: 27,
    marginBottom: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardPrice: {
    backgroundColor: '#D1FAE5',
    color: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: getFontSize(14),
    fontWeight: '600',
  },
  cardFeatures: {
    backgroundColor: '#DCFCF8',
    color: '#4bb4cb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: getFontSize(14),
    fontWeight: '600',
  },
  // Add any additional styles for new or updated components
});

export default ShopPage;
