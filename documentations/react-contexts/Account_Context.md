# Account Context Functions, Features and How To Use Guide

The react context is implemented in the `src/modules/AppView.js` component and wraps the core application.

```javascript
export default function AppView() {
  const [accountContext, setAccountContext] = useState(null);
  useSyncAccountChanges(accountContext); // syncs automatic the accountCtx state with the user data in the firestore db
  useAuthContextListener(accountContext, setAccountContext); // syncs the accountCtx with the firebase auth state if the auth state changes
  // it creates also a new account if no one is found

  return (
    <AccountContext.Provider value={[accountContext, setAccountContext]}>
      <ToastProviderWrapper>
        <Navigator onNavigationStateChange={() => {}} />
      </ToastProviderWrapper>
    </AccountContext.Provider>
  );
}
```

## Initialize useSyncAccountChanges Hook

The `useSyncAccountChanges` hook is designed for React applications using Firebase as a backend. It automatically syncs user data changes to the Firestore database whenever there is a modification in the user's context. This documentation provides an overview of the hook's implementation, usage, and key functionalities.

The `useSyncAccountChanges` hook facilitates real-time synchronization of user state changes with a Firestore database. It tracks changes to the `accountCtx` state, automatically updating the Firestore document for the logged-in user when changes are detected.

```javascript
const useSyncAccountChanges = (accountCtx) => {
  const [lastModifiedData, setLastModifiedData] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [previousState, setPreviousState] = useState(null);
  const db = getFirestore();

  const updateFirestoreDocument = async (fieldPath, value, uid) => {
    const docRef = doc(db, "Users", uid);
    try {
      await updateDoc(docRef, {
        [fieldPath]: value,
      });
      setLastModifiedData({ fieldPath, value });
      setFirebaseError(null);
    } catch (error) {
      console.error("Error updating document:", error);
      setFirebaseError(error.message);
    }
  };

  useEffect(() => {
    if (firebaseError) {
      console.warn(
        "Failed to sync accountCtx with firestore last modified field",
        lastModifiedData
      );
    }
  }, [firebaseError]);

  useEffect(() => {
    if (!accountCtx) return;
    if (previousState && !accountCtx) {
      // resets the previous state to null if the user logs out
      setPreviousState(accountCtx);
      return;
    }

    if (!accountCtx) return; // preventing useless state updates

    if (!previousState) {
      // only runs if a accountCtx is given and the previous state is null so it update the previous state initial and stops there
      setPreviousState(accountCtx);
      return;
    }
    // at this point there is a difference between the previous state and the new accountCtx while the user was and is logged in, so it will track the diff and updates the firestore db to get sync with this new state of the accountCtx
    const currentData = accountCtx || {};

    Object.keys(currentData).forEach((key) => {
      if (key === "firebase_auth_data") return; // ignoring firebase managed changes stored in `firebase_auth_data`. add more fields to ignore here, if needed.
      const oldValue = previousState[key];
      const newValue = currentData[key];

      if (newValue !== oldValue) {
        updateFirestoreDocument(key, newValue, accountCtx.uid); // updates the db
        setPreviousState(accountCtx); // update the previous state to the latest changes to prevent useless rewrites to the db of the same state over and over again
      }
    });
  }, [accountCtx]);

  return { firebaseError, lastModifiedData };
};
```

## Hook Overview

- **Purpose**: To keep the user's Firestore document in sync with the application's user state.
- **Key Features**:
  - Detects changes in the `accountCtx`.
  - Updates the corresponding Firestore document for the current user.
  - Handles and logs Firebase errors during updates.

## Feature Dependencies

**Ensure Firebase is initialized in your project and the Firestore SDK is correctly configured in `config/firebase-client`:**

```javascript
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

// Fill this with your firebase ids and configs, to see them visit the project overview page in your firebase-console
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "example.firebaseapp.com", // example
  projectId: "example",
  storageBucket: "example.appspot.com", // example
  messagingSenderId: "365436544212", // example
  appId: "1:6546846847654:web:85674687454545", // example
  measurementId: "G-FGHZG684768", // example
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // used to ensure login sessions are persistent even the app is shuted down
});
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { auth, db, storage, app, analytics };
```

## Functionality Details

- **Data Synchronization**:

  - The hook compares the previous and current states of `accountCtx`.
  - When a change is detected in any field except for `firebase_auth_data`, it triggers an update to the Firestore database using `updateDoc`.

- **Error Handling**:

  - Errors during the Firestore update operation are caught and stored in `firebaseError`.
  - A separate effect logs warning messages if there is a synchronization failure.

- **Initialization and Cleanup**:
  - The Firestore instance (`db`) is initialized when `accountCtx` is set.
  - Previous state management helps avoid unnecessary database writes and ensures updates are based on actual changes.

## Updating the `accountCtx` State

The following example shows how to update the accountCtx State. This would automatically update the firestore database entry for this user and changes the username to johnny.

```javascript
const [accountCtx, setAccountCtx] = useContext(AccountContext);
setAccountCtx((prev) => ({
  ...prev,
  username: "johnny",
}));
```

## Considerations

- Ensure that `accountCtx` properly reflects the structure of the Firestore document you intend to update.
- Avoid including sensitive or non-persistent fields within `accountCtx` that should not trigger database updates.

## Conclusion

The `useSyncAccountChanges` hook offers an efficient and robust solution for keeping user-related data synchronized between a React application's state and Firebase Firestore. By automating this process, the hook helps maintain data integrity and reduces the complexity of handling user data updates manually.
