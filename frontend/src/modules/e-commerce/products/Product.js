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
import {
  User07,
  _imagesArray,
  productImage,
  productPackages,
} from '../../availableInFullVersion/sample-data';
import BuyButtonSection from './partials/BuyButton';
import PaymentBadge from './partials/PayBadge';
import { ProductListItem } from './partials/ProductListItem';
import { ProductPageSection } from './partials/ProductPageSection';
import { ScrollView } from 'react-native-gesture-handler';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

const Product = () => {
  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <ImageSnapCarousel
        imagesArray={_imagesArray}
        imageStyles={{ borderRadius: 5 }}
      />
      {/* Product Title */}
      <Text style={[styles.text, styles.title]}>New And For Sale Now</Text>
      {/* caption for discount info etc */}
      <Text style={grayCaption}>
        Save with the code something 30% on your order!
      </Text>
      {/* Tags for prices sales and so on */}
      <View style={[flexBoxRow, { gap: 10 }]}>
        <Tag
          text="$33.50"
          textStyles={{
            color: colors.white,
            fontSize: getFontSize(18),
            lineHeight: 21,
          }}
          containerStyles={{ backgroundColor: colors.brightRed }}
        />
        <Tag
          text="SALE"
          textStyles={{
            color: colors.white,
            fontSize: getFontSize(18),
            lineHeight: 21,
          }}
          containerStyles={{ backgroundColor: colors.brightRed }}
        />
      </View>
      {/* Product Variants Dropdown */}
      <ProductPageSection title="Variants">
        <RNSDropDown
          items={['Option 1', 'Option 2', 'Option 3']}
          color={colors.textCreme}
          onSelect={sel => console.log(sel)}
          style={{}}
          borderColor={colors.primaryDark}
          placeholder="Styles"
        />
      </ProductPageSection>

      {/* Shipping, Purchase etc Info */}
      <ProductPageSection title="">
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
      </ProductPageSection>
      {/* Payment Badges */}
      <PaymentBadge />
      {/* Buy Button */}
      {/* Displaying package options dynamically */}
      {productPackages.map((pkg, index) => (
        <BuyButtonSection
          key={index}
          title={pkg.title}
          price={pkg.price}
          description={pkg.description}
          onBuyNow={() => console.log(`Buying ${pkg.title}`)}
        />
      ))}
      {/* Product Description */}
      <ProductPageSection title="Product Overview">
        <Text style={[styles.text, styles.paragraph]}>
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

      {/* Reviews */}
      <ProductPageSection title="Reviews">
        <View style={{ paddingVertical: 10 }}>
          <View style={[flexBoxRow, { marginVertical: 5 }]}>
            <Image source={{ uri: User07 }} style={styles.authorImage} />
            <Text style={grayCaption}>Simona Lürwer</Text>
          </View>
          <Rating stars="55555" />
          <Text style={[grayCaption, { marginVertical: 5 }]}>
            Some 504 Ijado Terrace 901 Cuzi Highway 1899 Come Mill
          </Text>
        </View>
      </ProductPageSection>

      {/* Cross sell category or product */}
      {<Image source={productImage} style={styles.productImage} />}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 360,
    marginRight: 10,
  },
  container: {
    flex: 1,
    ...screenPadding,
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
