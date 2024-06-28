import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../../styles';
import getFontSize from '../../../../helpers/resolve-relative-font-size';

const BuyButtonSection = ({ title, price, description, onBuyNow }) => (
  <View style={styles.packageOption}>
    <Text style={styles.packageTitle}>{`${title} - $${price}`}</Text>
    <Text style={styles.packageDescription}>{description}</Text>
    <TouchableOpacity style={styles.buyNowButton} onPress={onBuyNow}>
      <Text style={styles.buyNowText}>Buy Now - ${price}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  pageIntroduction: {
    color: '#fff',
    marginBottom: 24,
  },
  packageOption: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: getFontSize(14),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: getFontSize(12),
    marginBottom: 12,
  },
  buyNowButton: {
    backgroundColor: colors.bluish,
    borderColor: colors.white,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    color: colors.primary,
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
});
export default BuyButtonSection;
