# Authentication and Routing Logic

This document outlines the implementation of authentication and routing based on user authentication status in a React Native application. It includes code snippets and relative paths to code within the project.

## Authentication Logic

### Auth Routes

- The app renders auth-specific routes only if the user is not authenticated.
- The auth screens include Sign In, Sign Up, and Reset Password.
- These are summarized in `src/modules/auth/AuthStack.js`.

#### Code Snippet for AuthStack.js

```javascript
const SettingStacks = [
  {
    name: "Sign Up",
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
    name: "Sign In",
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
    name: "Reset Password",
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
```

### Auth Render Logic

- Implemented in `src/modules/navigation/RootNavigation.js`.
- If the firebase backend is not loaded the app will render loading screens until the resources are loaded
- this implementation enables an deeplink event to navigate without crashing through the app unless the auth state, unloaded firebase resources. More about how deeplinks are implemented in the `/documentations/deeplinks/` directory

#### Code Snippet for RootNavigation.js

```javascript
export default function NavigatorView(props) {
  const [accountCtx] = useContext(AccountContext);
  const { app, auth, db, storage } = useContext(Firebase);
  const { authStatus } = useAuthState();
  useDeepLinkResolver(accountCtx); // document this deep link hook
  useHandlePushNotifications(); // Listener for in App Notifications
  usePushNotification();

  return (
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
                      InitAppStackScreens["Loading Backend"].headerBackground
                        .source
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
  );
}
```

### Auth State Hook

- `src/hooks/auth/useAuthState.js` hook keeps track of the current auth status of the user. If the user logs in, the authStatus state returned by this hook reflects the current state.
- The method holds also authentication related and ready to use logout, deleteAccount and changePassword methods you can use where ever you want
- the hook return a lot of more account related data as well

#### Code Snippet for useAuthState.js

```javascript
const useAuthState = () => {
  const { auth } = useContext(Firebase);
  const [authStatus, setAuthStatus] = useState("loading"); // 'loading', 'authenticated', 'unauthenticated'
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [currentUserJSON, setCurrentUserJSON] = useState(null);
  const [firebaseAccountCtx, setFirebaseAccountCtx] = useState(null);
  const { showModalAlert } = useContext(ModalContext);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is logged in
        setAuthStatus("authenticated");
        setUser(currentUser);
        setCurrentUser(currentUser);
        // Try to retrieve user role (adapted to your data model)
        // console.log(result);
        setCurrentUserJSON(currentUser.toJSON());
        setFirebaseAccountCtx(currentUser.toJSON());
        setRole("user"); // Default role is 'user', if no role is defined
      } else {
        // User is not logged in
        setAuthStatus("unauthenticated");
        setUser(null);
        setCurrentUser(null);
        setRole("");
        setCurrentUserJSON(null);
        setFirebaseAccountCtx(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  /**
   *
   * @param {*} newUsername the new username of the current logged in account
   * @returns {Promise} Promise an error if something goes wrong otherwise null
   */
  const changeUsername = async (newUsername = "") => {
    setFirebaseError("");
    if (!currentUser) {
      console.error("user is not authenticated can not update username");
      return "user is not authenticated can not update username";
    }
    if (newUsername !== currentUser.displayName && newUsername) {
      try {
        await updateProfile(currentUser, {
          displayName: newUsername.trim(),
        });
        return null;
      } catch (error) {
        console.error(error);
        return error.message;
      }
    }
    return "the provided username can not be updated";
  };

  // exception handling listener
  useEffect(() => {
    if (!firebaseError) return;
    console.log("checking error type", firebaseError);
    switch (true) {
      case firebaseError.toString().includes("(auth/requires-recent-login)"):
        showModalAlert(
          "Erneutes Einloggen notwendig",
          "Deine Sitzung ist abgelaufen, bitte logge dich erneut ein bevor du fortfährst.",
          logout
        );
        break;
      default:
        console.error(firebaseError);
        break;
    }
  }, [firebaseError]);

  const logout = async () => {
    try {
      setFirebaseError("");
      await signOut(auth);
      setAuthStatus("unauthenticated");
      setUser(null);
      setCurrentUser(null);
      setRole("");
      setCurrentUserJSON(null);
      setFirebaseAccountCtx(null);
    } catch (error) {
      console.warn("Fehler beim Ausloggen:", error);
      setFirebaseError(error);
    }
  };

  const deleteAccount = async () => {
    try {
      setFirebaseError("");
      console.log("deleting user account..");
      let firebaseAuth = getAuth(app);
      await deleteUser(firebaseAuth.currentUser);
      setAuthStatus("unauthenticated");
      setUser(null);
      setCurrentUser(null);
      setRole("");

      setCurrentUserJSON(null);
      setFirebaseAccountCtx(null);
    } catch (error) {
      console.warn("Fehler beim Löschen des Accounts:", error);
      setFirebaseError(error);
    }
  };

  const changePassword = async (currentPasswd, newPasswd) => {
    setFirebaseError("");
    const emailCred = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser,
      currentPasswd
    );
    firebase
      .auth()
      .currentUser?.reauthenticateWithCredential(emailCred)
      .then(() => {
        return firebase.auth().currentUser?.updatePassword(newPasswd);
      })
      .catch((error) => {
        console.error(error);
        setFirebaseError(error);
      });
  };

  return {
    currentUser,
    authStatus,
    user,
    role,
    logout,
    deleteAccount,
    changePassword,
    firebaseError,
    currentUserJSON,
    firebaseAccountCtx,
    changeUsername,
  };
};
```

### App View Logic

- After the user signs in or signs up, the `src/modules/AppView.js` component sets up the `AccountContext` that holds all values from Firebase related to the user. 
It is also recommended to store your custom data in that `AccountContext` state using the `setAccountContext` method provided by the 
```javascript const [accountCtx, setAccountContext] = useContext(AccountContext)``` Context.
- If the user signup the username will temporary stored in the `SecureStorage` with the key `username`, 
the hook will look for this value if its found, the hook updates the database and stores the username also in the `accountContext`. 
After this the value `username` will be deleted from the `SecureStorage`.
- As you see the user data will stored in the database as well

#### Code Snippet for AppView.js

```javascript
const useAuthContextListener = (
  accountCtx,
  setAccountCtx = function (state) {}
) => {
  const { db } = useContext(Firebase);
  useEffect(() => {
    if (!db) return;
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // If the user is authenticated, check if the user document is loaded
        if (!accountCtx) {
          // If the user document is not yet loaded, load it from the Firestore DB
          try {
            // Here you could create a new user ref in your db if nothing is found
            const userDocument = await getDocument("Users", user.uid); // Function to retrieve the user document from Firestore
            if (!userDocument) {
              let username = await SecureStorage.get("username");
              if (username) {
                await updateProfile(user, { displayName: username.trim() });
                USER_SCHEME.username = username;
                await SecureStorage.remove("username");
              }
              USER_SCHEME.uid = user.uid;
              USER_SCHEME.firebase_uid = user.uid;
              USER_SCHEME.role = "user";

              await writeDocument("Users", user.uid, USER_SCHEME, false);
              USER_SCHEME.firebase_auth_data = user.toJSON();
              setAccountCtx(USER_SCHEME);
            } else
              setAccountCtx({
                ...userDocument,
                username: user.displayName,
                firebase_auth_data: user.toJSON(),
              });
          } catch (error) {
            console.error("Error fetching user document:", error);
          }
        }
      } else {
        // If the user is not authenticated, set the accountCtx to null
        setAccountCtx(null);
        console.log("ACCOUNT CTX =>", accountCtx);
      }
    });

    return () => unsubscribe();
  }, [accountCtx, setAccountCtx, app]);

  return null;
};

export default useAuthContextListener;
```
