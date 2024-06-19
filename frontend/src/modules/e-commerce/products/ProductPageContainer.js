import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Product from './Product';
import { appThemeColor, screenPadding } from '../../../styles/partials';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../../styles';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

const ProductPageContainer = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: appThemeColor.darkBlue }]}
    >
      <View style={styles.pagePadding}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backToListingText}>&lt;- Previous</Text>
        </TouchableOpacity>
        {/* Main Product Section */}
        <Product />
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagePadding: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  backToListingText: {
    color: colors.lightBlue,
    fontFamily: fonts.primaryRegular,
    marginBottom: 15,
    fontSize: getFontSize(18),
  },
  authorAndMetaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    borderRadius: 9999,
    width: 32,
    height: 32,
    marginRight: 8,
  },
  authorName: {
    fontSize: getFontSize(14),
    fontWeight: 'bold',
    color: '#fff',
  },
  pageTitle: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
});

export default ProductPageContainer;
