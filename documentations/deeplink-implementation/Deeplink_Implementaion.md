# App Deep Link Implementation

This documentation outlines the implementation of deep linking in a React Native application, explaining what deep links are, their importance, and how they are integrated into the app.

## What are Deep Links?

Deep links are URLs that direct users to specific content within an app, bypassing the need to navigate through the app to find it. These links are especially useful in mobile apps for promotional campaigns, navigation from emails, social media posts, or other apps, providing a smooth user experience by directly leading the user to the desired content.

## Importance of Logic-Based Route Rendering

Proper setup of logic-based route rendering is crucial for a seamless user experience and ensures that the app can handle deep links correctly. It involves setting up navigation routes that adjust based on the user's authentication status or other criteria, ensuring that users are directed appropriately within the app.

### Implementation of the Logic-Based Routing

Here’s how the app's deep linking-friendly logic-based routing is implemented in `src/modules/navigation/RootNavigation.js` it covers if the firebase backend is not loaded, user is un-auth or user is auth:

```javascript
<Stack.Navigator>
  {!auth || !db || !storage || !app ? (
    <Stack.Screen
      name={InitAppStackScreens["Loading Backend"].name}
      component={InitAppStackScreens["Loading Backend"].component}
      options={{
        headerLeft:
          InitAppStackScreens["Loading Backend"].headerLeft ||
          headerLeftComponentMenu,
        headerShown: InitAppStackScreens["Loading Backend"].headerShown,
        headerStyle: [
          { backgroundColor: appThemeColor.darkBlue },
          isIOS && { borderWidth: 0 },
        ],
        headerBackground: !isIOS
          ? () => (
              <Image
                style={[styles.headerImage]}
                source={
                  InitAppStackScreens["Loading Backend"].headerBackground.source
                }
              />
            )
          : undefined,
        headerTitleStyle:
          InitAppStackScreens["Loading Backend"].headerTitleStyle,
      }}
    />
  ) : authStatus === "authenticated" ? (
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
    authStatus !== "authenticated" && (
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
```

## The Deep Link Configuration Object

A deep link configuration object defines the URL prefixes and the mapping of these URLs to the navigation structure of the app. This configuration ensures that deep links correctly navigate to the specified screens within the app.
**You have to ensure that all screens on wich the deeplink can directed are defined within this object.**

### App's Deep Linking Config

The config covers all app scenarios and is able to route the user properly through the screens.
Here is how the deep link configuration object is defined in the app:

```javascript
export const DEEP_LINKING_CONFIG = {
  prefixes: ["https://shipnative.app/", "shipnative://"],
  config: {
    screens: {
      Homes: {
        initialRouteName: "Home",
        screens: {
          "Loading Screen": "loading",
          "Loading Backend": "loading_app",
          "Update App Screen": "update_app",
          Home: "home",
          Events: "events",
          Auth: {
            // Fallback Router if the client is unauthenticated
            path: "auth",
            initialRouteName: "Sign In",
          },
          Settings: {
            path: "settings",
            initialRouteName: "Einstellungen",
          },
        },
      },
    },
  },
};
```

### Application of Deep Link Config

The deep link config is applied within `src/modules/navigation/Navigator.js` to ensure that the app can handle incoming deep links appropriately.

```javascript
export default function App() {
  const { navigationRef, onReady, onRouteStateChange } = useFirebaseAnalytics(); // document
  return (
    <Navigation

Container
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
```

**IMPORTANT: Only the screens defined in the configuration object are navigable through deep links. This ensures a targeted and user-friendly navigation experience based on URLs.**
