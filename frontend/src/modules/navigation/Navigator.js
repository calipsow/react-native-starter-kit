import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DEEP_LINKING_CONFIG } from '../../constants/constants';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import useAuthState from '../../hooks/auth/use-auth-state';
import { colors } from '../../styles';
import { AccountContext } from '../AppView';
import NavigatorView from './RootNavigation';
import useFirebaseAnalytics from '../../hooks/analytics/use-firebase-analytics';

const drawerData = [
  {
    name: 'AGB', // translate 
    route: {
      main_screen: 'Settings',
      target_screen: 'Rechtliches Dokument',
      target_screen_params: {
        document_id: 'license',
      },
    },
    icon: () => (
      <MaterialCommunityIcons
        name="file-document-multiple"
        size={20}
        color={colors.bluish}
      />
    ),
  },
  {
    name: 'Datenschutz', // translate
    route: {
      main_screen: 'Settings',
      target_screen: 'Rechtliches Dokument',
      target_screen_params: {
        document_id: 'privacy',
      },
    },
    icon: () => (
      <MaterialIcons name="privacy-tip" size={20} color={colors.bluish} />
    ),
  },
];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [accountCtx] = React.useContext(AccountContext); // remove or document the use of accCTX

  return (
    <DrawerContentScrollView
      {...props}
      style={{ padding: 0, backgroundColor: colors.primary }}
    >
      <View style={styles.avatarContainer}>
        <View style={{ paddingLeft: 0 }}>
          {accountCtx ? (
            <Text style={styles.userName}>
              {accountCtx?.firebase_auth_data?.displayName}
            </Text>
          ) : (
            <Text style={styles.userName}>Loading..</Text>
          )}
        </View>
      </View>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              {item.icon()}
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => {
            props.navigation.navigate(item.route.main_screen, {
              screen: item.route.target_screen,
              params: item.route.target_screen_params,
            });
          }}
        />
      ))}
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Ionicons name="settings" size={20} color={colors.bluish} />
            <Text style={styles.menuTitle}>Settings</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Settings')}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const { navigationRef, onReady, onRouteStateChange } = useFirebaseAnalytics(); // document
  return (
    <NavigationContainer
      linking={DEEP_LINKING_CONFIG}
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onRouteStateChange}
    >
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#3C38B1',
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Homes" component={NavigatorView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff',
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userName: {
    color: '#fff',
    fontSize: getFontSize(18),
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10,
  },
});
