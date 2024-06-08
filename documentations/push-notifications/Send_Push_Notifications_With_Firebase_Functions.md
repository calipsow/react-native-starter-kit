# Documentation for sending push notifications using firebase functions

The custom React hook designed for applications that facilitates sending push notifications either to all app users or a single user through Firebase Functions. This documentation will provide an overview of the hook's functionality, its implementation, and usage.

The `useBroadcastPushNotification` hook simplifies sending push notifications in a React Native app by interfacing with Firebase Cloud Functions to send messages either to individual users or multicast messages to all users. This hook manages the state related to notification sending, including loading status, success status, and errors.

## Hook Functionality

- **`sendSingleNotification`**: Sends a notification to a single user. It requires specific user token and can include custom data and image URLs.
- **`broadcastNotification`**: Sends a notification to all app users. This function can broadcast messages with a common title, body, and optional image URL and data payload.
- **State Management**:
  - `loading`: Indicates whether a notification request is currently processing.
  - `succeed`: Indicates whether the last notification request was successful.
  - `error`: Stores any errors that occurred during the last notification request.

## Dependencies

- `@react-native-firebase/functions`: Utilized to call Firebase Functions from the app.

## Installation

Before using this hook, ensure `@react-native-firebase/functions` is installed and properly set up in your React Native project:

```bash
yarn add @react-native-firebase/functions
```

Ensure your Firebase functions are defined and deployed. From the `firebase-functions` directory wich holds the backend functions.

## Usage

**You have to provide within your data sending through push notification the properties**
- **`targetScreen`**: a string with the screen name to define where the deeplink should route the user.
- **`params`**: an object with navigation params to apply to the navigation, if you have none use an empty object.

### Sending a Broadcast Notification

```javascript
const { broadcastNotification, loading, succeed, error } =
  useBroadcastPushNotification();

// Example usage:
broadcastNotification({
  title: "New Feature",
  body: "Check out our brand new features today!",
  imageUrl: "https://example.com/image.png",
  data: { targetScreen: "Home", params: {} },
});

if (loading) {
  console.log("Sending notification...");
}

if (succeed) {
  console.log("Notification sent successfully!");
}

if (error) {
  console.error("Error sending notification:", error);
}
```

### Sending a Single Notification

```javascript
const { sendSingleNotification, loading, succeed, error } =
  useBroadcastPushNotification();

// Example usage:
sendSingleNotification({
  token: "device_token",
  title: "Personalized Message",
  body: "Hello, this is a personalized message just for you!",
  imageUrl: "https://example.com/image.png",
  data: { targetScreen: "Home", params: {} },
  sendToUserUID: "user_uid",
});

if (loading) {
  console.log("Sending notification...");
}

if (succeed) {
  console.log("Notification sent successfully!");
}

if (error) {
  console.error("Error sending notification:", error);
}
```

## Error Handling

The hook includes robust error handling, which captures any errors from the Firebase functions and updates the `error` state. This allows for graceful degradation and user feedback in the UI.

## Conclusion

The `useBroadcastPushNotification` hook is a powerful tool for integrating push notification functionality in React Native applications. It handles the complexities of state management and interactions with Firebase Cloud Functions, providing a clean and easy-to-use interface for sending notifications.
