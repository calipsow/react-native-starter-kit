# Authentication and Routing Logic

This document outlines the implementation of authentication and routing based on user authentication status in a React Native application. It includes code snippets and relative paths to code within the project.

### Auth Based Routing

- The app renders auth-specific routes only if the user is not authenticated.
- The auth screens include Sign In, Sign Up, and Reset Password.
- These are summarized in **[`AuthStack.js`](/frontend/src/modules/auth/AuthStack.js)**.

### Jump to [AuthStack.js](/frontend/src/modules/auth/AuthStack.js)

### Auth Render Logic

- Implemented in **[`RootNavigation.js`](/frontend/src/modules/auth/RootNavigation.js)**.

- If the firebase backend is not loaded the app will render loading screens until the resources are loaded

- this implementation enables an deeplink event to navigate without crashing through the app unless the auth state, unloaded firebase resources. More about how deeplinks are implemented in the [Deeplink documentation](/documentations/deeplink-implementation/Deeplink_Implementaion.md)

### Jump to [RootNavigation.js](/frontend/src/modules/auth/RootNavigation.js)

### Auth State Hook

- **[`useAuthState.js`](/frontend/src/hooks/auth/use-auth-state.js)** hook keeps track of the current auth status of the user. If the user logs in, the authStatus state returned by this hook reflects the current state.

- The method holds also authentication related and ready to use logout, deleteAccount and changePassword methods you can use where ever you want

- the hook return a lot of more account related data as well

### App View Logic

- After the user signs in or signs up, the **[`AppView.js`](/frontend/src/modules/AppView.js)** component sets up the `AccountContext` that holds all values from Firebase related to the user.

- If the user signup the username will temporary stored in the `SecureStorage` with the key `username`,
  the hook will look for this value if its found, the hook updates the database and stores the username also in the `accountContext`.
  After this the value `username` will be deleted from the `SecureStorage`.

- As you see the user data will stored in the database as well
  It is also recommended to store your custom data in that `AccountContext` state using the `setAccountContext` method provided by the AccountContext:

```javascript
const [accountCtx, setAccountContext] = useContext(AccountContext);
setAccountContext((prev) => ({
  ...prev,
  username: "john",
}));
```

[More about AccountContext](/documentations/react-contexts/Account_Context.md).