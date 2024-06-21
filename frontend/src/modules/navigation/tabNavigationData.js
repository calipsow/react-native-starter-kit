import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../styles';
import BlogStackNavigator from '../blogs/BlogStack';
import EventStackNavigator from '../events/EventStack';
import HomeScreen from '../home/HomeView';
import ProfileStackNavigator from '../account/ProfileStack';
import getFontSize from '../../helpers/resolve-relative-font-size';

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
    name: 'Events',
    component: EventStackNavigator,
    icon: focused => (
      <MaterialCommunityIcons
        name="newspaper"
        size={getFontSize(33)}
        style={{ padding: getFontSize(2), zIndex: 999 }}
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
