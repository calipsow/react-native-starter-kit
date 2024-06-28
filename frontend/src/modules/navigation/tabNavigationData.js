import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../styles';
import BlogStackNavigator from '../blogs/BlogStack';
import HomeScreen from '../home/HomeView';
import ProfileStackNavigator from '../account/ProfileStack';
import getFontSize from '../../helpers/resolve-relative-font-size';
import ShopStackNavigator from '../e-commerce/ShopStack';

// implement default fall back route
const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: focused => (
      <Entypo
        name="home"
        size={getFontSize(32)}
        style={{ padding: getFontSize(3), zIndex: 999 }}
        color={focused ? colors.bluish : colors.primaryDark}
      />
    ),
  },
  {
    name: 'Shopping',
    component: ShopStackNavigator,
    icon: focused => (
      <Entypo
        name="shopping-cart"
        size={getFontSize(32)}
        style={{ padding: getFontSize(3), zIndex: 999 }}
        color={focused ? colors.bluish : colors.primaryDark}
      />
    ),
  },
  {
    name: 'Blogs',
    component: BlogStackNavigator,
    icon: focused => (
      <MaterialIcons
        name="library-books"
        size={getFontSize(31)}
        style={{ padding: getFontSize(4), zIndex: 999 }}
        color={focused ? colors.bluish : colors.primaryDark}
      />
    ),
  },
  {
    name: 'Profile',
    component: ProfileStackNavigator,
    icon: focused => (
      <MaterialIcons
        name="account-circle"
        size={getFontSize(33)}
        style={{ padding: getFontSize(2), zIndex: 999 }}
        color={focused ? colors.bluish : colors.primaryDark}
      />
    ),
  },
];

export default tabNavigationData;
