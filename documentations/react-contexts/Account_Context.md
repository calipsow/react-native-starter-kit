# Account Context

The react context is implemented in the **[`AppView.js`](/frontend/src/modules/AppView.js)** component and wraps the core application.

## Initialize useSyncAccountChanges Hook

The **[`useSyncAccountChanges.js`](/frontend/src/hooks/context/use-change-listener.js)** hook facilitates real-time synchronization of user state changes with a Firestore database. It tracks changes to the `accountCtx` state, automatically updating the Firestore document for the logged-in user when changes are detected.

## Hook Overview

**Purpose**: To keep the user's Firestore document in sync with the application's user state.

**Key Features**:
  - Detects changes in the `accountCtx`.
  - Updates the corresponding Firestore document for the current user.
  - Handles and logs Firebase errors during updates.

## Dependencies

**Ensure Firebase is initialized in your project and the Firestore SDK is correctly configured in [firebase-client.js](/frontend/config/firebase-client.js)**.

## Functionality Details

**Data Synchronization**:

  - The hook compares the previous and current states of `accountCtx`.
  - When a change is detected in any field except for `firebase_auth_data`, it triggers an update to the Firestore database using `updateDoc`.

**Error Handling**:

  - Errors during the Firestore update operation are caught and stored in `firebaseError`.
  - A separate effect logs warning messages if there is a synchronization failure.

**Initialization and Cleanup**:
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
