import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../constants/constants';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import { colors, fonts } from '../../styles';
import { appThemeColor } from '../../styles/partials';
import { styles } from '../navigation/RootNavigation';
import { headerLeftComponent } from '../navigation/headerLeftComponent';
import SettingsView from './SettingsView';
import ChangePassword from './pages/ChangePasswd';
import ChangeUsername from './pages/ChangeUsername';
import LegalDocument from './pages/LegalDocument';
const SettingStackNavigator = createStackNavigator();

const SettingStacks = [
  {
    name: 'Einstellungen',
    component: SettingsView,
    headerLeft: headerLeftComponent,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: isIOS ? getFontSize(16) : 0,
    },
  },
  {
    name: 'Passwort ändern',
    component: ChangePassword,
    headerLeft: headerLeftComponent,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: isIOS ? getFontSize(16) : 0,
    },
  },
  {
    name: 'Rechtliches Dokument',
    component: LegalDocument,
    headerLeft: headerLeftComponent,
    headerShown: true,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: isIOS ? getFontSize(16) : 0,
    },
  },
  {
    name: 'Nutzernamen ändern',
    component: ChangeUsername,
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

export function SettingStackNavigation({ navigation, route }) {
  return (
    <SettingStackNavigator.Navigator initialRouteName="Einstellungen">
      {SettingStacks.map((item, idx) => (
        <SettingStackNavigator.Screen
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
    </SettingStackNavigator.Navigator>
  );
}
