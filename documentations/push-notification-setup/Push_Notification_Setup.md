# Push Notifications

Push notifications are vital for mobile apps to keep users engaged by providing timely updates and essential information directly to their devices.

This guide will walk you through setting up push notifications in a React Native application using Firebase Cloud Messaging (FCM) for both iOS and Android platforms.

### Configure FCM in Firebase Console

1. Navigate to the "Cloud Messaging" tab in your Firebase project settings.

2. Securely store the server key and sender ID for Android.

3. For iOS, upload the APNs authentication key under the "Cloud Messaging" tab. This key can be generated in the Apple Developer Member Center.

---

### Add Firebase FCM Configurations to the project

**For Android**:

Ensure `google-services.json` is correctly placed.

**For iOS**:

Ensure your app's capabilities include Push Notifications and Background Modes → Remote notifications.

### Requesting Permissions

Firebase messaging requires explicit permission to receive notifications on iOS. Request this permission within your React Native application:

```javascript
async function requestUserPermission(accountCtx) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled && accountCtx && accountCtx?.uid) {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    // setup document structure for firestore
    Push_Notification_Token.token = token;
    Push_Notification_Token.created_at = new Date(new Date().getTime());
    Push_Notification_Token.device_type = Platform.OS;
    Push_Notification_Token.uid = accountCtx.uid;
    Push_Notification_Token.user_role = "user";
    Push_Notification_Token.username = accountCtx.username;

    // store the push notification token in the database
    await writeDocument(
      "Notification_Tokens",
      accountCtx.uid,
      Push_Notification_Token
    );
  }
  return enabled;
}
```

### Push Notification Hook

The **[`usePushNotification`](/frontend/src/hooks/notifications/use-push-notification.js)** hook is designed to manage push notifications in a React Native application using Firebase Cloud Messaging (FCM). This hook handles the receipt of notifications, user permissions, and responding to notification interactions by utilizing modals and navigation.

1. Functionalities

Requests and checks notification permissions.

Listens for incoming push notifications.

Parses notification data and responds to user interaction with modal confirmations.

Navigates to relevant screens based on the notification data.

2. Dependencies

`messaging` from `@react-native-firebase/messaging`: Manages the Firebase messaging functionalities.

`requestUserPermission`: A custom function to request notification permissions from the user.

`AccountContext`: React context that holds the user's account information.

`ModalContext`: React context for managing modals.

`useToastNotify`: A custom hook for displaying toast notifications.

3. Hook Setup and States

`enabled`: Tracks if the user has granted notification permissions.

`newNotificationArrived`: Boolean flag to track if a new notification has been received.

`lastNotification`: Stores the last received notification's data.

`data`: Stores parsed data from the notification's payload.

4. Effects and Logic

**Permission Handling**:

On mount, and whenever the account context changes, the hook checks if the user has granted notification permissions using the `requestUserPermission` function. This is dependent on the user's account context being loaded and having a valid `uid`.

**Notification Listener**:

The hook sets up a listener for Firebase messages using `messaging().onMessage`. It parses the incoming message data and sets it to the state, triggering actions based on the content.

**User Interaction**:

When a new notification arrives, the hook uses `showModalConfirmation` from `ModalContext` to show a modal dialog, prompting the user to navigate to a specific part of the app based on the notification data (e.g., an event or article page).

The navigation action is performed using `useNavigation` based on the user's response.

### Handling Background and Quit State Notifications

For notifications received when the app is in the background or terminated, use event handlers provided by Firebase:

```javascript
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

messaging().onNotificationOpenedApp((remoteMessage) => {
  console.log(
    "Notification caused app to open from background state:",
    remoteMessage
  );
});

messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage
      );
    }
  });
```

## Conclusion

Integrating Firebase push notifications into your React Native app enhances user engagement by allowing you to send interactive, real-time notifications.

By following these steps, you can set up a robust messaging solution tailored for both Android and iOS platforms.
