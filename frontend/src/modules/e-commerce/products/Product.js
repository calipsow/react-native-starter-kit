import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import RNSDropDown from '../../../components/Dropdown';
import ImageSnapCarousel from '../../../components/ImageSnapFull';
import Rating from '../../../components/StarRating';
import Tag from '../../../components/Tag';
import ToggleView from '../../../components/ToggleView';
import { colors } from '../../../styles/index';
import {
  appThemeColor,
  flexBoxRow,
  grayCaption,
  screenPadding,
} from '../../../styles/partials';

import BuyButtonSection from './partials/BuyButton';
import PaymentBadge from './partials/PayBadge';
import { ProductListItem } from './partials/ProductListItem';
import { ProductPageSection } from './partials/ProductPageSection';
import { ScrollView } from 'react-native-gesture-handler';
import getFontSize from '../../../helpers/resolve-relative-font-size';
import { fbImage } from '../../../constants/constants';
import SingleTag from '../../../components/SingleTag';
import { DividerCaption } from '../../../components/DividerCaption';

const Product = () => {
  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <ImageSnapCarousel imageStyles={{ borderRadius: 5 }} />
      {/* Product Title */}
      <Text className="text-3xl text-slate-200 font-bold">
        New And For Sale Now
      </Text>
      {/* caption for discount info etc */}
      <Text className="text-xl text-slate-400 font-semibold pb-2">
        Save with the code something 30% on your order!
      </Text>
      {/* Tags for prices sales and so on */}
      <View style={[flexBoxRow, { gap: 10 }]}>
        {Array(3)
          .fill()
          .map((_, i) => (
            <SingleTag
              txt={'Sale'}
              key={i}
              className={'px-5 py-1 rounded-lg bg-rose-400'}
            />
          ))}
      </View>
      {/* Product Variants Dropdown */}
      <RNSDropDown
        items={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
        color={colors.white}
        onSelect={sel => console.log(sel)}
        style={{
          backgroundColor: '#94a3b8',
          height: 55,
          marginTop: 12,
          marginBottom: 8,
        }}
        borderColor={'transparent'}
        placeholder="Option"
      />

      {/* Shipping, Purchase etc Info */}
      <ToggleView
        previewTitel={'14-05-2014 - 2024-10-02'}
        content={
          'The product will be processed within one working day and dispatched within a few days and is expected to be delivered within 7 - 14 working days. More about this in the shipping conditions.'
        }
      />
      <ToggleView
        previewTitel={'14 Days Money Back'}
        content={
          'After delivery, the product can be returned within 14 days without giving reasons. Read more in the right of withdrawal.'
        }
      />
      <ToggleView
        previewTitel={'Payment'}
        content={
          'We offer credit card payments, instant bank transfers, and purchase on account with Klarna. Find out more in the terms and conditions.'
        }
      />

      {/* Buy Button */}
      {/* Displaying package options dynamically */}
      {[{ title: 'some kind of', imageUrl: fbImage, price: 20.99 }].map(
        (pkg, index) => (
          <BuyButtonSection
            key={index}
            title={pkg.title}
            price={pkg.price}
            description={pkg.description}
            onBuyNow={() => console.log(`Buying ${pkg.title}`)}
          />
        ),
      )}
      {/* Payment Badges */}
      <PaymentBadge />
      {/* Product Description */}
      <ProductPageSection title="Product Overview">
        <Text className="text-gray-400 font-medium text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad
          minim veniam.
        </Text>
      </ProductPageSection>

      {/* Features */}
      <ProductPageSection title="Key Features">
        <ProductListItem>
          - E-commerce: Better lorem ipsum generator.
        </ProductListItem>
        <ProductListItem>
          - Booking: Lorem ipsum post generator.
        </ProductListItem>
        <ProductListItem>
          - Retail: Better lorem ipsum generator.
        </ProductListItem>
        <ProductListItem>
          - Services: Better lorem ipsum generator.
        </ProductListItem>
      </ProductPageSection>
      <DividerCaption caption="Product Reviews" />
      {/* Reviews */}
      <View className="mt-1">
        <View style={[flexBoxRow, { marginVertical: 5 }]}>
          <Image
            source={{ uri: fbImage }}
            style={styles.authorImage}
            className=""
          />
          <Text className="text-gray-100 font-medium text-lg">
            Simona Lürwer
          </Text>
        </View>
        <Rating stars="55555" />
        <Text style={[grayCaption, { marginVertical: 5 }]}>
          Minim fugiat ex irure pariatur officia nisi ipsum laboris consectetur
          ea esse ipsum. Officia culpa eiusmod minim non deserunt aliqua
          cupidatat quis qui id exercitation qui.
        </Text>
      </View>

      {/* Cross sell category or product */}
      {<Image source={fbImage} style={styles.productImage} />}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 360,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: appThemeColor.darkBlue,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 16,
  },
  title: {
    maxWidth: '90%',
    textAlign: 'left',
    fontSize: getFontSize(33),
    fontWeight: 'bold',
    letterSpacing: -0.8,
    color: colors.textCreme,
  },
  sectionTitle: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: getFontSize(15),
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: getFontSize(16),
  },
  paragraph: {
    fontSize: getFontSize(16),
  },
});

export default Product;
