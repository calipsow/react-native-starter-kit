import { Text, View } from 'react-native';
import { flexBoxRow, sectionTitleCreme } from '../../../styles/partials';
import React from 'react';
import SubSectionLayout from './partials/SubSectionLayout';
import { ProductCard } from '../../e-commerce/products/partials/ProductCard';
import { SpotlightProduct } from '../../e-commerce/home/partials/SpotlightProduct';
import { sampleProducts } from '../../availableInFullVersion/sample-data';
import { CategoryCard } from '../../e-commerce/categories/Categories';
import RNSButton from '../../../components/Button';
import { colors } from '../../../styles';
import { useNavigation } from '@react-navigation/native';

const ShopSection = () => {
  const navigation = useNavigation();
  return (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <SubSectionLayout
        title="Shop 🛍️"
        subTitle="Discover out latest discounts and giveaways"
      >
        <Text style={sectionTitleCreme}>Shop Categories</Text>
        {Array.from('00').map((_, i) => (
          <CategoryCard
            key={`${i}--`}
            imageUrl={
              'https://image.coolblue.de/content/d6039e4fbb86ca381b633789713fa960'
            }
            category_id={'646454'}
            title={'Gaming Keyboards'}
            onPress={id =>
              navigation.navigate('Shop', {
                screen: 'Collection',
                params: { id },
              })
            }
            style={{ width: '100%' }}
            textStyle={{ fontWeight: 'bold' }}
          />
        ))}
      </SubSectionLayout>

      <SubSectionLayout
        title="Spotlight Item"
        subTitle="We are proud of our Spotlight Item💫"
      >
        <SpotlightProduct imageSrc="https://buffer.com/library/content/images/size/w1200/2023/04/aryan-dhiman-iGLLtLINSkw-unsplash.jpg" />
      </SubSectionLayout>

      <SubSectionLayout
        title="Handpicked Recommendations"
        subTitle="Discover out latest discounts and giveaways 💫"
      >
        {sampleProducts.map((item, i) =>
          i < 2 ? (
            <ProductCard
              onPressCard={() =>
                navigation.navigate('Shop', { screen: 'Product', params: {} })
              }
              style={{ width: '100%' }}
              key={`prod-${i}`}
              imageUrl={item.imageUrl}
              price={item.price}
              description={item.description}
              title={item.title}
              imageStyle={{ height: 300, objectFit: 'cover' }}
            />
          ) : null,
        )}
      </SubSectionLayout>
      <SubSectionLayout
        title="Explore more 🔎"
        subTitle="Explore all categories and discover some awesome upgrades ⌨️"
      >
        <View
          style={[
            flexBoxRow,
            { gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' },
          ]}
        >
          <RNSButton
            caption="Store"
            bgColor={colors.primaryDark}
            onPress={() => navigation.navigate('Shop')}
          />
          <RNSButton
            caption="Blogs"
            bordered
            secondary
            onPress={() => navigation.navigate('Blogs')}
          />
        </View>
      </SubSectionLayout>
    </View>
  );
};

export default ShopSection;
