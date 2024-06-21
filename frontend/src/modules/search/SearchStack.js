import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../constants/constants';

import { colors, fonts } from '../../styles';
import { appThemeColor } from '../../styles/partials';
import { styles } from '../navigation/RootNavigation';
import { headerLeftComponent } from '../navigation/headerLeftComponent';
import SearchView from './SearchView';
import getFontSize from '../../helpers/resolve-relative-font-size';
const SearchStack = createStackNavigator();

const SearchStacks = [
  {
    name: 'Suche',
    component: SearchView,
    headerLeft: headerLeftComponent,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(16),
    },
  },
];

export function SearchStackNavigation({ navigation, route }) {
  return (
    <SearchStack.Navigator initialRouteName="Suche">
      {SearchStacks.map((item, idx) => (
        <SearchStack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            headerShown: item.headerShown,
            headerLeft: item.headerLeft,
            headerStyle: { backgroundColor: appThemeColor.darkBlue },
            headerBackground: !isIOS
              ? () => (
                  <Image
                    style={styles.headerImage}
                    source={item.headerBackground.source}
                  />
                )
              : undefined,
            headerTitleStyle: item.headerTitleStyle,
          }}
        />
      ))}
    </SearchStack.Navigator>
  );
}
