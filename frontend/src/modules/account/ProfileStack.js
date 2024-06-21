import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import { styles } from '../navigation/RootNavigation';
import Profile from './Profile';

import { headerLeftComponent } from '../navigation/headerLeftComponent';
import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../constants/constants';
import { colors, fonts } from '../../styles';
import { appThemeColor } from '../../styles/partials';
import getFontSize from '../../helpers/resolve-relative-font-size';
const ProfileStack = createStackNavigator();

const ProfileStacks = [
  {
    name: 'Profile',
    component: Profile,
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
];

export function ProfileStackNavigator({ navigation, route }) {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      {ProfileStacks.map((item, idx) => (
        <ProfileStack.Screen
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
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
