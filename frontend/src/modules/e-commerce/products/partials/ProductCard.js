import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import RNSButton from '../../../../components/Button';
import { colors, fonts } from '../../../../styles';
import Rating from '../../../../components/StarRating';
import { smallTextGray } from '../../../../styles/partials';
import getFontSize from '../../../../functions/ui/resolve-relative-font-size';

// Card Component

export const ProductCard = ({
  title,
  price,
  imageUrl,
  onLike,
  style,
  multiline,
  description = '1110 Zicub Key 116 Jamem Extension 1710 Alkuv Place 461 Fahfik Glen',
  imageStyle,
  hideButtons,
  onPressCard = function () {},
}) => (
  <View style={[styles.card, style && style]}>
    <Image
      style={[styles.cardImage, imageStyle && imageStyle]}
      source={{ uri: imageUrl }}
    />
    <Pressable onPress={onPressCard}>
      <View>
        <Text style={styles.cardTitle} numberOfLines={!multiline ? 1 : 5}>
          {title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={7}>
          {description}
        </Text>
        <View
          style={[styles.ratingAndPrice, hideButtons && { marginBottom: 0 }]}
        >
          {/* Placeholder for rating if you add it */}
          <Rating stars="55555" />
          <Text style={styles.price}>{price}</Text>
        </View>
        {!hideButtons && (
          <View style={styles.cardActionBtn}>
            <RNSButton
              caption="Add"
              bgColor={colors.primaryDark}
              textColor={colors.black}
            />
            <RNSButton caption="More" secondary bordered />
          </View>
        )}
      </View>
    </Pressable>
  </View>
);
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    marginBottom: 24,
    width: '48%', // Adjust based on your grid needs
    paddingBottom: 15,
  },
  cardActionBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardDescription: {
    ...smallTextGray,
    padding: 8,
    paddingBottom: 0,
    fontSize: getFontSize(14),
    paddingTop: 0,
    lineHeight: 15,
    letterSpacing: 0,
    marginBottom: 6,
  },
  cardTitle: {
    padding: 8,
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: colors.bluish,
    letterSpacing: -0.5,
    lineHeight: 18,
    marginTop: 15,
  },
  ratingAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 5,
    rowGap: 8,
  },
  price: {
    backgroundColor: colors.textLightGreen + '5f',
    color: colors.textLightGreen,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: fonts.primaryBold,
    fontSize: getFontSize(15),
  },
});
