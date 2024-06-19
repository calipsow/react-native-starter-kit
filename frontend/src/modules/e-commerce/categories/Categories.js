import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { colors, fonts } from '../../../styles';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import { fbImage } from '../../../constants/constants';
// import BlurImageFilter from '../../../components/SkiaImage';

export const CategoryCard = ({
  title,
  onPress = function () {},
  imageUrl,
  category_id,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    onPress={() => onPress(category_id)}
    style={[styles.categoryCard, style && style]}
  >
    <View style={styles.iconContainer}>
      {/*<BlurImageFilter source={imageUrl} />*/}
      <Image source={{ uri: imageUrl }} style={styles.icon} />
      <View
        style={{
          position: 'absolute',
          left: 'auto',
          top: '82%',
          backgroundColor: colors.primary,
          paddingHorizontal: 10,
          borderRadius: 12,
          width: '95%',
        }}
      >
        <Text
          style={[styles.categoryTitle, textStyle && textStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ShopCategories = ({ navigation }) => {
  return (
    <View style={styles.gridContainer}>
      {[{ id: 'category-1', title: 'some title', imageUrl: fbImage }].map(
        (category, index) => (
          <CategoryCard
            category_id={category.id || 'tAxog5nLAkIDtPjav2iYBfDpnZfQWjA8'}
            navigation={navigation}
            key={index}
            title={category.title}
            imageUrl={category.imageUrl}
            onPress={ID =>
              navigation.navigate('Collection', {
                category_ID: ID,
              })
            }
          />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: 0,
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    objectFit: 'cover',
  },
  categoryTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: getFontSize(20),
    color: colors.bluish,
    letterSpacing: -0.7,
    width: '100%',
    textAlign: 'center',
    lineHeight: 22,
    paddingVertical: 5,
  },
  exploreText: {
    fontSize: getFontSize(18),
    color: colors.lightBlue,
    marginBottom: 5,
    fontVariant: ['small-caps'],
  },
});

export default ShopCategories;
