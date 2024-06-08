# App Deep Link Implementation

This documentation outlines the implementation of deep linking in a React Native application, explaining what deep links are, their importance, and how they are integrated into the app.

## What are Deep Links?

Deep links are URLs that direct users to specific content within an app, bypassing the need to navigate through the app to find it. These links are especially useful in mobile apps for promotional campaigns, navigation from emails, social media posts, or other apps, providing a smooth user experience by directly leading the user to the desired content.

## Importance of Logic-Based Route Rendering

Proper setup of logic-based route rendering is crucial for a seamless user experience and ensures that the app can handle deep links correctly. It involves setting up navigation routes that adjust based on the user's authentication status or other criteria, ensuring that users are directed appropriately within the app.

### Implementation of the Logic-Based Routing

Here’s how the app's deep linking-friendly logic-based routing is implemented in **[`RootNavigation.js`](/frontend/src/modules/navigation/RootNavigation.js)** it covers if the firebase backend is not loaded, user is un-auth or user is auth.

## The Deep Link Configuration Object

A deep link configuration object defines the URL prefixes and the mapping of these URLs to the navigation structure of the app. This configuration ensures that deep links correctly navigate to the specified screens within the app.
**You have to ensure that all screens on wich the deeplink can directed are defined within this object.**

### App's Deep Linking Config

The config covers all app scenarios and is able to route the user properly through the screens. Jump direct to the **[deeplink config object](/frontend/src/constants/constants.js)**

### Application of Deep Link Config

The deep link config is applied in **[`Navigator.js`](/frontend/src/modules/navigation/Navigator.js)** to ensure that the app can handle incoming deep links appropriately.

---

**IMPORTANT: Only the screens defined in the configuration object are navigable through deep links. This ensures a targeted and user-friendly navigation experience based on URLs.**
