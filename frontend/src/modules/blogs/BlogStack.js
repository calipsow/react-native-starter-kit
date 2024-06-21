import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HEADER_BACKGROUND_IMAGE } from '../../constants/constants';

import { colors, fonts } from '../../styles';
import { styles } from '../navigation/RootNavigation';
import { headerLeftComponent } from '../navigation/headerLeftComponent';
import ArticleIndex from './ArticleIndexView';
import BlogIndex from './BlogArticleFeed';
import ArticlePage from './ArticlePage';
import getFontSize from '../../helpers/resolve-relative-font-size';
const BlogStack = createStackNavigator();

const BlogStacks = [
  {
    name: 'Article',
    component: ArticlePage,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
      opacity: 0,
    },
  },
  {
    name: 'Blog',
    component: BlogIndex,
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
    name: 'Blog Articles',
    component: ArticleIndex,
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

export function BlogStackNavigator({ navigation, route }) {
  return (
    <BlogStack.Navigator initialRouteName="Blog">
      {BlogStacks.map((item, idx) => (
        <BlogStack.Screen
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
    </BlogStack.Navigator>
  );
}

export default BlogStackNavigator;
