import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FilterDropdownMenu from '../../../components/DropDownFull';
import { appThemeColor, screenPadding } from '../../../styles/partials';
import { FilterButton } from './partials/FilterButton';
import { ProductCard } from './partials/ProductCard';
import PaginationNumeric from '../../../components/PaginationNumeric';
import getFontSize from '../../../helpers/resolve-relative-font-size';

const ProductCollection = ({ navigation, route }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentArea}>
        <View style={styles.filtersContainer}>
          <FilterButton title="View All" isActive={true} />
          <FilterButton
            title="Featured"
            onPress={() => navigation.navigate('Product')}
          />
          <FilterDropdownMenu onSelect={itm => console.log(itm)} />
        </View>
        <Text style={styles.itemCount}>67.975 Items</Text>
        <View style={styles.cardContainer}>
          {/* Example of using the Card component, replicate for other cards */}
          <ProductCard
            title="Form Builder CP"
            price="$39.00"
            imageUrl="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            hideButtons={true}
            onPressCard={() => navigation.navigate('Product')}
          />
          {/* Add more cards as needed */}
          <ProductCard
            title="Form Builder CP"
            price="$39.00"
            imageUrl="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            hideButtons={true}
            onPressCard={() => navigation.navigate('Product')}
          />
          <ProductCard
            title="Form Builder CP"
            price="$39.00"
            imageUrl="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            hideButtons={true}
            onPressCard={() => navigation.navigate('Product')}
          />
        </View>
      </View>
      <PaginationNumeric />
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
  },
  contentArea: {
    paddingVertical: 32,
    paddingHorizontal: 12,
  },
  pageHeader: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: '#fff', // dark:text-slate-100
    marginBottom: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterButtonText: {
    color: '#1E293B',
    fontSize: getFontSize(14),
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  itemCount: {
    fontSize: getFontSize(14),
    color: '#64748B',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProductCollection;
