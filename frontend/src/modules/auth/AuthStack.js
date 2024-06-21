import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HEADER_BACKGROUND_IMAGE } from '../../constants/constants';

import { colors, fonts } from '../../styles';
import { styles } from '../navigation/RootNavigation';
import { headerLeftComponent } from '../navigation/headerLeftComponent';
import PasswdReset from './PasswdReset/PasswdReset';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import getFontSize from '../../helpers/resolve-relative-font-size';

const AuthStack = createStackNavigator();

const SettingStacks = [
  {
    name: 'Sign Up',
    component: Signup,
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
    name: 'Sign In',
    component: Signin,
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
    name: 'Reset Password',
    component: PasswdReset,
    headerLeft: headerLeftComponent,
    headerShown: false,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
];

export function AuthStackNavigation({ navigation, route }) {
  return (
    <AuthStack.Navigator initialRouteName="Sign In">
      {SettingStacks.map((item, idx) => (
        <AuthStack.Screen
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
    </AuthStack.Navigator>
  );
}
