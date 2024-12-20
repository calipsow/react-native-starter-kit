import { createStackNavigator, Header } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

import { useSafeArea } from 'react-native-safe-area-context';
import { Firebase } from '../../../App';
import { isIOS } from '../../constants/constants';

import useAuthState from '../../hooks/auth/use-auth-state';
import useDeepLinkResolver from '../../hooks/linking/use-deep-link-resolver';
import useHandlePushNotifications from '../../hooks/notifications/use-navigate-push-notification';
import usePushNotification from '../../hooks/notifications/use-push-notification';
import { appThemeColor } from '../../styles/partials';
import { AccountContext } from '../AppView';
import StackNavigationData, {
  AuthStackScreen,
  InitAppStackScreens,
} from './stackNavigationData';
import getFontSize from '../../helpers/resolve-relative-font-size';

const Stack = createStackNavigator();

export default function NavigatorView(props) {
  const [accountCtx] = useContext(AccountContext);
  const { app, auth, db, storage } = useContext(Firebase);
  const { authStatus } = useAuthState();
  useDeepLinkResolver(accountCtx); // documented in deeplink-setup docs
  useHandlePushNotifications(); // documented in notification-setup docs
  usePushNotification(); // documented in notification-setup docs

  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Image
          // eslint-disable-next-line no-undef
          source={require('../../../assets/images/drawer/menu.png')}
          resizeMode="contain"
          style={{
            height: getFontSize(isIOS ? 25 : 20),
          }}
        />
      </TouchableOpacity>
    );
  };

  // navigation logic in deeplink-setup and in authentication-workflow docs
  return (
    <Stack.Navigator>
      {!auth || !db || !app ? (
        <Stack.Screen
          name={InitAppStackScreens['Loading Backend'].name}
          component={InitAppStackScreens['Loading Backend'].component}
          options={{
            headerLeft:
              InitAppStackScreens['Loading Backend'].headerLeft ||
              headerLeftComponentMenu,
            headerShown: InitAppStackScreens['Loading Backend'].headerShown,
            headerStyle: [
              { backgroundColor: appThemeColor.darkBlue },
              isIOS && { borderWidth: 0 },
            ],
            headerBackground: !isIOS
              ? () => (
                  <Image
                    style={[styles.headerImage]}
                    source={
                      InitAppStackScreens['Loading Backend'].headerBackground
                        .source
                    }
                  />
                )
              : undefined,
            headerTitleStyle:
              InitAppStackScreens['Loading Backend'].headerTitleStyle,
          }}
        />
      ) : authStatus === 'authenticated' ? (
        StackNavigationData.map((item, idx) => (
          <Stack.Screen
            key={`stack_item-${idx + 1}`}
            name={item.name}
            component={item.component}
            options={{
              headerLeft: item.headerLeft || headerLeftComponentMenu,
              headerShown: item.headerShown,
              headerStyle: [
                { backgroundColor: appThemeColor.darkBlue },
                isIOS && { borderWidth: 0 },
              ],
              headerBackground: !isIOS
                ? () => (
                    <Image
                      style={[styles.headerImage]}
                      source={item.headerBackground.source}
                    />
                  )
                : undefined,
              headerTitleStyle: item.headerTitleStyle,
            }}
          />
        ))
      ) : (
        authStatus !== 'authenticated' && (
          <Stack.Screen
            name={AuthStackScreen.name}
            component={AuthStackScreen.component}
            options={{
              headerLeft: AuthStackScreen.headerLeft || headerLeftComponentMenu,
              headerShown: AuthStackScreen.headerShown,
              headerStyle: [
                { backgroundColor: appThemeColor.darkBlue },
                isIOS && { borderWidth: 0 },
              ],
              headerBackground: !isIOS
                ? () => (
                    <Image
                      style={[styles.headerImage]}
                      source={AuthStackScreen.headerBackground.source}
                    />
                  )
                : undefined,
              headerTitleStyle: AuthStackScreen.headerTitleStyle,
            }}
          />
        )
      )}
    </Stack.Navigator>
  );
}

export const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: Header.height,
  },
});
