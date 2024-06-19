import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  appThemeColor,
  flexBoxRow,
  grayCaption,
  screenPadding,
} from '../../../styles/partials';
import ShopCategories from './Categories';
import { ProductCard } from '../products/partials/ProductCard';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../styles';
import PaginationNumeric from '../../../components/PaginationNumeric';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import { fbImage } from '../../../constants/constants';

const ProductCategory = ({ navigation, route }) => {
  var { category_ID } = route.params;

  const [groupedProducts, setGroupedItems] = useState(null);

  const groupItems = () => {
    let groupedItm = [],
      tmp = [];
    for (var prod of [
      [{ title: 'some kind of', imageUrl: fbImage, price: 20.99 }],
    ]) {
      if (tmp.length >= 4) {
        groupedItm.push(tmp);
        tmp = [];
        continue;
      }
      tmp.push(prod);
    }
    return groupedItm;
  };

  useEffect(() => {
    if (groupedProducts) return;
    setGroupedItems(groupItems());
  }, []);

  const ItemGroup = ({ products = [] }) => (
    <View style={[flexBoxRow, { gap: 10, flexWrap: 'wrap', flexGrow: 4 }]}>
      {products.map((item, i) => (
        <ProductCard
          multiline={true}
          key={`${item.title}-${i}`}
          title={item.title}
          imageUrl={item.imageUrl}
          price={item.price}
          onLike={pid => console.log(pid, 'got liked')}
        />
      ))}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {Array.isArray(groupedProducts) ? (
        <React.Fragment>
          {/* Header */}
          <Text style={[styles.text, styles.title]}>
            Discover {category_ID} 🔎
          </Text>
          {/* Collection Products  */}
          {groupedProducts.map((itemList, i) => (
            <ItemGroup products={itemList} key={`${i}--`} />
          ))}
          <PaginationNumeric />
          {/* Footer */}
          <Text style={[styles.text, styles.title, { marginTop: 100 }]}>
            Popular Categories
          </Text>
          <ShopCategories />
        </React.Fragment>
      ) : (
        <ActivityIndicator
          size={'small'}
          color={colors.lightBlue}
          style={{ margin: 'auto' }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: appThemeColor.darkBlue,
    flex: 1,
  },
  title: {
    maxWidth: '90%',
    textAlign: 'left',
    fontSize: getFontSize(33),
    fontWeight: 'bold',
    letterSpacing: -0.8,
    color: colors.textCreme,
    marginVertical: 15,
  },
});

export default ProductCategory;
