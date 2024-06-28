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
import getFontSize from '../../../helpers/resolve-relative-font-size';
import { fbImage } from '../../../constants/constants';

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
    className="rounded-xl border-white border-solid border-2"
  >
    <View style={styles.iconContainer}>
      {/*<BlurImageFilter source={imageUrl} />*/}
      <Image
        source={{ uri: imageUrl }}
        style={styles.icon}
        className="rounded-xl"
      />
      <View
        style={{
          position: 'absolute',
          left: 'auto',
          top: '82%',
          backgroundColor: colors.primary,
          paddingHorizontal: 10,
          width: '95%',
        }}
        className="rounded-xl"
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
      {Array(4)
        .fill({ id: 'category-1', title: 'some title', imageUrl: fbImage })
        .map((category, index) => (
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
        ))}
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
