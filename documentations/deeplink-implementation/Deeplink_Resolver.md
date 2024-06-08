# Documentation for useDeepLinkResolver Hook

The **[`useDeepLinkResolver`](/frontend/src/hooks/linking/use-deep-link-resolver.js)** hook is designed to enhance navigation in React Native applications by handling deep links effectively. This hook integrates with the navigation system to ensure deep links direct users to the correct screens, even when the application was not initially open or the user was not authenticated at the time the deep link was activated.

## Overview

Deep links allow applications to open at specific screens by using a URL, which is particularly useful in marketing, notifications, and inter-app communication.
The **[`useDeepLinkResolver`](/frontend/src/hooks/linking/use-deep-link-resolver.js)** ensures that if a deep link is activated and the application cannot immediately navigate due to reasons like the user not being logged in or the application still loading, the deep link data is stored and processed as soon as the conditions allow.

## Implementation Details

**Dependencies**:

- `@react-navigation/native`: Utilizes `useNavigation` and `useNavigationState` for navigation control.
- `react`: Uses `useEffect` for managing side effects in response to changes in deep link or authentication state.
- `@react-native-async-storage/async-storage`: Handles storage of unresolved deep links.
- `../../helpers/parse-deeplink`: A utility to parse the incoming deep link URL into a route and parameters.
- `../../helpers/secure-storage`: Potentially for securely storing sensitive deep link information, not used directly in the provided code snippet.

## Functional Description

**Initial Deep Link Handling**:

- On receiving a deep link, the hook checks if the application context (`accountCtx`) is ready and an active session exists.
- If the context is not ready (indicating that the app might be loading or the user isn't authenticated), the deep link data is stored using `AsyncStorage` for later use.

**Stored Deep Link Resolution**:

- Once the application is fully loaded and/or the user session is active, the hook attempts to navigate to the stored deep link.
- It checks if the current screen matches the deep link target. If it does, it assumes that the user is already viewing the intended content and clears the stored data.
- If not, it navigates to the appropriate screen using the parameters stored with the deep link.

**Navigation**:

- Navigation commands are executed based on the deep link type, with specific logic handling various types of content such as events or articles.

---

### **[Jump to the hook: `useDeepLinkResolver`](/frontend/src/hooks/linking/use-deep-link-resolver.js)**

## Conclusion

The `useDeepLinkResolver` hook provides a robust method for handling deep links in React Native applications, ensuring that users are directed to the correct content regardless of the app's state at the time the link is activated. This improves user experience by providing immediate access to relevant screens, thus enhancing user engagement and satisfaction.
