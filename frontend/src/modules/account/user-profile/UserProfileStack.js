import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../../constants/constants';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import { colors, fonts } from '../../../styles';
import { styles } from '../../navigation/RootNavigation';
import { headerLeftComponent } from '../../navigation/headerLeftComponent';
import UserStatistics from './AccountStatistics';
import { appThemeColor } from '../../../styles/partials';

const UserProfileStack = createStackNavigator();

const UserProfileStacks = [
  {
    name: 'Statistiken',
    component: UserStatistics,
    headerLeft: headerLeftComponent,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: isIOS ? getFontSize(16) : 0,
    },
  },
];

export function UserProfileStackNavigation({ navigation, route }) {
  return (
    <UserProfileStack.Navigator initialRouteName="Statistiken">
      {UserProfileStacks.map((item, idx) => (
        <UserProfileStack.Screen
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
    </UserProfileStack.Navigator>
  );
}
