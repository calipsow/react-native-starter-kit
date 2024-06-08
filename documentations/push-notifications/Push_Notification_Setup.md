# Setting Up Push Notifications in React Native using Firebase

Push notifications are vital for mobile apps to keep users engaged by providing timely updates and essential information directly to their devices. This guide will walk you through setting up push notifications in a React Native application using Firebase Cloud Messaging (FCM) for both iOS and Android platforms.

### Configure FCM in Firebase Console

1. Navigate to the "Cloud Messaging" tab in your Firebase project settings.
2. Securely store the server key and sender ID for Android.
3. For iOS, upload the APNs authentication key under the "Cloud Messaging" tab. This key can be generated in the Apple Developer Member Center.

The app uses the `@react-native-firebase/messaging` module wich is already installed and setup

### Add Firebase FCM Configurations to the project

- **Android**:

  - Ensure `google-services.json` is correctly placed.

- **iOS**:
  - Ensure your app's capabilities include Push Notifications and Background Modes → Remote notifications.

### How the App Requesting Permissions

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
    console.log("refresh push token to", token);
    Push_Notification_Token.token = token;
    Push_Notification_Token.created_at = new Date(new Date().getTime());
    Push_Notification_Token.device_type = Platform.OS;
    Push_Notification_Token.uid = accountCtx.uid;
    Push_Notification_Token.user_role = "user";
    Push_Notification_Token.username =
      accountCtx?.firebase_auth_data?.displayName;

    // store the push notification token in the database to use them later to send to them push notifications
    await writeDocument(
      "Notification_Tokens",
      accountCtx.uid,
      Push_Notification_Token
    );
  }

  return enabled;
}
```

### The usePushNotification Hook

The **[`usePushNotification`](/frontend/src/hooks/notifications/use-push-notification.js)** hook is designed to manage push notifications in a React Native application using Firebase Cloud Messaging (FCM). This hook handles the receipt of notifications, user permissions, and responding to notification interactions by utilizing modals and navigation.

1. Several Functionalities Overview:

- Requests and checks notification permissions.
- Listens for incoming push notifications.
- Parses notification data and responds to user interaction with modal confirmations.
- Navigates to relevant screens based on the notification data.

2. Hook Dependencies

- `messaging` from `@react-native-firebase/messaging`: Manages the Firebase messaging functionalities.
- `requestUserPermission`: A custom function to request notification permissions from the user.
- `AccountContext`: React context that holds the user's account information.
- `ModalContext`: React context for managing modals.
- `useToastNotify`: A custom hook for displaying toast notifications.
- `useNavigation`: Hook from `@react-navigation/native` for navigation handling.

3. Hook Setup and State Management

- `enabled`: Tracks if the user has granted notification permissions.
- `newNotificationArrived`: Boolean flag to track if a new notification has been received.
- `lastNotification`: Stores the last received notification's data.
- `data`: Stores parsed data from the notification's payload.

4. Effects and Logic

1. **Permission Handling**:

   - On mount, and whenever the account context changes, the hook checks if the user has granted notification permissions using the `requestUserPermission` function. This is dependent on the user's account context being loaded and having a valid `uid`.

1. **Notification Listener**:

   - The hook sets up a listener for Firebase messages using `messaging().onMessage`. It parses the incoming message data and sets it to the state, triggering actions based on the content.

1. **User Interaction**:
   - When a new notification arrives, the hook uses `showModalConfirmation` from `ModalContext` to show a modal dialog, prompting the user to navigate to a specific part of the app based on the notification data (e.g., an event or article page).
   - The navigation action is performed using `useNavigation` based on the user's response.

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

## Testing Push Notifications

Use the Firebase Console to send test messages to your device. This will help ensure your setup is correct and that messages are being received as expected.

## Conclusion

Integrating Firebase push notifications into your React Native app enhances user engagement by allowing you to send interactive, real-time notifications. By following these steps, you can set up a robust messaging solution tailored for both Android and iOS platforms.
