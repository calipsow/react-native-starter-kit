import TabNavigator from './MainTabNavigator';

import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../constants/constants';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import { colors, fonts } from '../../styles'; //TODO - Change Color Theme
import ProfileStackNavigator from '../account/profile/ProfileStack';
import { AuthStackNavigation } from '../auth/AuthStack';
import BlogStackNavigator from '../blogs/BlogStack';
import SingleArticleView from '../blogs/articles/SingleArticleView';
import EventStackNavigator, {
  SecondaryLocalEventStackNavigator,
} from '../events/EventStack';
import SingleEventView from '../events/event/SingleEventView';
import { SearchStackNavigation } from '../search/SearchStack';
import { SettingStackNavigation } from '../settings/SettingStack';
import { headerLeftComponent } from './headerLeftComponent';
import LoadingView, { LoadingFirebaseView } from '../pages/LoadingViews';
import UpdateAppView from '../pages/UpdateAppView';
import { UserProfileStackNavigation } from '../account/user-profile/UserProfileStack';
import DashBoardView from '../dashboard/DashboardView';
import UserStatisticsView from '../account/user-profile/AccountStatistics';

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
  'Update App Screen': { // remove
    name: 'Update App Screen',
    component: UpdateAppView,
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
    name: 'User Rankings', // remove
    component: DashBoardView,
    headerLeft: null,
    headerShown: false,
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
    name: 'User Account',
    component: UserProfileStackNavigation,
    headerLeft: null,
    headerShown: false,
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
    name: 'Statistiken', // remove
    component: UserStatisticsView,
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
  {
    name: 'Blogs', // remove
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
    name: 'Events', // remove
    component: EventStackNavigator,
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
    name: 'Geplante Events', // remove
    component: SecondaryLocalEventStackNavigator,
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
    name: 'Suche', // remove
    component: SearchStackNavigation,
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
    name: 'Single Event', // remove
    component: SingleEventView,
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
  {
    name: 'Single Article', // remove
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
