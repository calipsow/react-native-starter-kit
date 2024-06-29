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
import getFontSize from '../../../../helpers/resolve-relative-font-size';
import {
  SecondarySubmitButton,
  SubmitButton,
} from '../../../../components/SubmitButton';

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
  <View
    style={[style && style]}
    className="bg-slate-300 rounded-xl p-2 mb-2 w-full pb-2 m-0.5"
  >
    <Image
      style={[imageStyle && imageStyle]}
      source={{ uri: imageUrl }}
      className="rounded-lg w-full h-40 object-cover"
    />
    <Pressable onPress={onPressCard}>
      <View>
        <Text
          className="text-slate-900 font-bold text-2xl"
          numberOfLines={!multiline ? 1 : 5}
        >
          {title}
        </Text>
        <Text
          className="text-slate-900 font-semibold text-sm"
          numberOfLines={7}
        >
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
            <SecondarySubmitButton
              className={`rounded-lg px-8 py-2.5 items-center mt-2 mb-2 border-slate-700 border-solid border-2`}
              text="Details"
              textClassName="text-slate-700 text-[16px] font-semibold opacity-[.8]"
              onPress={onPressCard}
            />
            <SubmitButton
              text="Add"
              className={
                'bg-slate-800 text-gray-800 rounded-lg px-8 py-3 items-center mt-2 mb-2'
              }
              onPress={onPressCard}
            />
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
    paddingBottom: 5,
  },
  cardActionBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingBottom: 8,
    paddingTop: 5,
    flexWrap: 'wrap',
    gap: 5,
    rowGap: 8,
  },
  price: {
    backgroundColor: '#D1FAE5',
    color: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: getFontSize(14),
    fontWeight: '600',
  },
});
