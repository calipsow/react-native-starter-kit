import TabNavigator from './MainTabNavigator';

import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../constants/constants';

import { colors, fonts } from '../../styles';
import { AuthStackNavigation } from '../auth/AuthStack';
import BlogStackNavigator from '../blogs/BlogStack';
import SingleArticleView from '../blogs/ArticleView';
import { SettingStackNavigation } from '../settings/SettingStack';
import { headerLeftComponent } from './headerLeftComponent';
import LoadingView, { LoadingFirebaseView } from '../pages/LoadingViews';
import ProfileStackNavigator from '../account/ProfileStack';
import getFontSize from '../../helpers/resolve-relative-font-size';

export const InitAppStackScreens = {
  'Loading Screen': {
    name: 'Loading Screen',
    component: LoadingView,
    headerLeft: headerLeftComponent,
    headerShown: false,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  'Loading Backend': {
    name: 'Loading Backend',
    component: LoadingFirebaseView,
    headerLeft: headerLeftComponent,
    headerShown: false,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
};

export const AuthStackScreen = {
  name: 'Auth',
  component: AuthStackNavigation,
  headerLeft: headerLeftComponent,
  headerShown: false,
  headerBackground: { source: HEADER_BACKGROUND_IMAGE },
  headerTitleStyle: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: getFontSize(18),
  },
};

const StackNavigationData = [
  {
    name: 'Home',
    component: TabNavigator,
    headerLeft: null,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: !isIOS
      ? {
          fontFamily: fonts.primaryRegular,
          color: colors.white,
          fontSize: 0,
        }
      : undefined,
  },
  {
    name: 'Blogs',
    component: BlogStackNavigator,
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
    name: 'Settings',
    component: SettingStackNavigation,
    headerLeft: headerLeftComponent,
    headerShown: false,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  {
    name: 'Profile',
    component: ProfileStackNavigator,
    headerLeft: headerLeftComponent,
    headerShown: false,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },

  {
    name: 'Single Article',
    component: SingleArticleView,
    headerLeft: headerLeftComponent,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: !isIOS
      ? {
          fontFamily: fonts.primaryRegular,
          color: colors.white,
          fontSize: 0,
        }
      : undefined,
  },
];

export default StackNavigationData;
