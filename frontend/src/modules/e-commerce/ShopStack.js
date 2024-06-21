import { createStackNavigator } from '@react-navigation/stack';
const ShopStack = createStackNavigator();
import { headerLeftComponent } from '../navigation/headerLeftComponent';
import { colors, fonts } from '../../styles';
import { styles } from '../navigation/RootNavigation';
import { Image } from 'react-native';
import ProductCollection from './products/ProductCollection';
import Shop from './home/Shop';
import { HEADER_BACKGROUND_IMAGE } from '../../constants/constants';
import AvailableInFullVersionScreen from '../availableInFullVersion/AvailableInFullVersionView';
import Product from './products/Product';
import ProductCategory from './categories/Category';
import SearchPage from './search/SearchPage';
import CheckoutScreen from './checkout/Checkout';
import getFontSize from '../../helpers/resolve-relative-font-size';

const ShopStacks = [
  {
    name: 'Checkout',
    component: CheckoutScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  {
    name: 'Shop',
    component: Shop,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  {
    name: 'Collection',
    component: ProductCollection,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  {
    name: 'Product',
    component: Product,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  {
    name: 'SearchPage',
    component: SearchPage,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
];

export function ShopStackNavigator({ navigation, route }) {
  return (
    <ShopStack.Navigator initialRouteName="Checkout">
      {ShopStacks.map((item, idx) => (
        <ShopStack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            headerShown: item.headerShown,
            headerLeft: item.headerLeft,
            headerBackground: () => (
              <Image
                style={styles.headerImage}
                source={item.headerBackground.source}
              />
            ),
            headerTitleStyle: item.headerTitleStyle,
          }}
        />
      ))}
    </ShopStack.Navigator>
  );
}

export default ShopStackNavigator;
