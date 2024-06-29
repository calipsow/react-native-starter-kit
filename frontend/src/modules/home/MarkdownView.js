import { View } from 'react-native';
import SubSectionLayout from '../../components/SubSectionLayout';
import { ARTICLE_SCHEME } from '../../constants/firestore-schemes';
import { ArticlePreviewCard } from '../blogs/partials/ArticleCard';
import Markdown from 'react-native-simple-markdown';
import getFontSize from '../../helpers/resolve-relative-font-size';

const markdownContent =
  '# Authentication and Routing Logic\n\n' +
  'This document outlines the implementation of authentication and routing based on user authentication status in a React Native application. It includes code snippets and relative paths to code within the project.\n\n' +
  '### **Auth Based Routing**\n\n' +
  '- The app renders auth-specific routes only if the user is not authenticated.\n' +
  '- The auth screens include Sign In, Sign Up, and Reset Password.\n' +
  '- These are summarized in **[`AuthStack.js`](/frontend/src/modules/auth/AuthStack.js)**.\n\n' +
  '### **Auth Render Logic**\n\n' +
  '- Implemented in **[`RootNavigation.js`](/frontend/src/modules/navigation/RootNavigation.js)**.\n\n' +
  '- If the firebase backend is not loaded the app will render loading screens until the resources are loaded\n\n' +
  '- this implementation enables an deeplink event to navigate without crashing through the app unless the auth state, unloaded firebase resources. More about how deeplinks are implemented in the **[Deeplink documentation](/documentations/deeplink-setup/Deeplink_Implementaion.md)**\n\n' +
  '### **Auth State Hook**\n\n' +
  '- **[`useAuthState.js`](/frontend/src/hooks/auth/use-auth-state.js)** hook keeps track of the current auth status of the user. If the user logs in, the authStatus state returned by this hook reflects the current state.\n' +
  '- The method holds also authentication related and ready to use logout, deleteAccount and changePassword methods you can use where ever you want\n' +
  '- the hook return a lot of more account related data as well\n\n' +
  '### **App View Logic**\n\n' +
  '- After the user signs in or signs up, the **[`AppView.js`](/frontend/src/modules/AppView.js)** component sets up the `AccountContext` that holds all values from Firebase related to the user.\n' +
  '- If the user signup the username will temporary stored in the `SecureStorage` with the key `username`,\n' +
  '  the hook will look for this value if its found, the hook updates the database and stores the username also in the [`accountContext`](/documentations/context-provider/Account_Context.md).\n' +
  '  After this the value `username` will be deleted from the `SecureStorage`.\n\n' +
  '- data stored in the `accountCtx` state will syncs with the automatically firestore database as well\n\n' +
  'It is also recommended to store your custom data also in the `AccountContext` context using the `setAccountContext` method provided by the Context. **[Read more about AccountContext](/documentations/context-provider/Account_Context.md)**.';

const markdownContentAccountCTX =
  '# Account Context\n\n' +
  'The react context is implemented in the **[`AppView.js`](/frontend/src/modules/AppView.js)** component and wraps the core application.\n\n' +
  '## Auto Sync Changes\n\n' +
  'The **[`useSyncAccountChanges.js`](/frontend/src/hooks/context/use-change-listener.js)** hook facilitates real-time synchronization of user state changes with a Firestore database. It tracks changes to the `accountCtx` state, automatically updating the Firestore document for the logged-in user when changes are detected.\n\n' +
  '## Hook Overview\n\n' +
  "**Purpose**: To keep the user's Firestore document in sync with the application's user state.\n\n" +
  '**Key Features**:\n\n' +
  '- Detects changes in the `accountCtx`.\n' +
  '- Updates the corresponding Firestore document for the current user.\n' +
  '- Handles and logs Firebase errors during updates.\n\n' +
  '## Functionality\n\n' +
  '**Data Synchronization**:\n\n' +
  '- The hook compares the previous and current states of `accountCtx`.\n' +
  '- When a change is detected in any field except for `firebase_auth_data`, it triggers an update to the Firestore database using `updateDoc`.\n\n' +
  '**Error Handling**:\n\n' +
  '- Errors during the Firestore update operation are caught and stored in `firebaseError`.\n' +
  '- A separate effect logs warning messages if there is a synchronization failure.\n\n' +
  '**Initialization and Cleanup**:\n\n' +
  '- The Firestore instance (`db`) is initialized when `accountCtx` is set.\n' +
  '- Previous state management helps avoid unnecessary database writes and ensures updates are based on actual changes.\n\n' +
  '## Updating the `accountCtx` State\n\n' +
  'The following example shows how to update the accountCtx State. This would automatically update the firestore database entry for this user and changes the username to johnny.\n\n' +
  '```\n' +
  'const [accountCtx, setAccountCtx] = useContext(AccountContext);\n' +
  'setAccountCtx((prev) => ({\n' +
  '  ...prev,\n' +
  '  username: "johnny",\n' +
  '}));\n' +
  '```\n\n' +
  '## Considerations\n\n' +
  '- Ensure that `accountCtx` properly reflects the structure of the Firestore document you intend to update.\n' +
  '- Avoid including sensitive or non-persistent fields within `accountCtx` that should not trigger database updates.\n\n' +
  '## Conclusion\n\n' +
  "The `useSyncAccountChanges` hook offers an efficient and robust solution for keeping user-related data synchronized between a React application's state and Firebase Firestore.\n\n" +
  'By automating this process, the hook helps maintain data integrity and reduces the complexity of handling user data updates manually.';

const markdownContentModalCTX =
  '# Modal Context\n\n' +
  'The `ModalProvider` wraps the React application or specific components to provide an easy way to manage and display modals based on different triggers such as user actions or application events.\n\n' +
  '## Features\n\n' +
  '- **Centralized Modal Management**: Manages all modal dialogs from a single provider at the top level of your application.\n' +
  '- **Flexible Triggering**: Modals can be triggered from anywhere in the component tree using the context.\n' +
  '- **Customizable**: Easily customize modal titles, messages, and buttons. Supports both alert and confirmation modals.\n' +
  "- **Styling**: Modals are styled and can be further customized to match the application's design language.\n\n" +
  '## Implementation\n\n' +
  'The Modal Provider Wraps the entire application at `./App.js` and can be used everywhere within the app\n\n' +
  '\n\n## Functionality\n\n' +
  '- **`showModalAlert`**: Displays an alert modal with a single "OK" button.\n\n' +
  '  - `title`: String, title of the modal.\n' +
  '  - `captionText`: String, descriptive text shown in the modal.\n' +
  '  - `onSubmit`: Function (optional), called when the user clicks "OK".\n\n' +
  '- **`showModalConfirmation`**: Displays a confirmation modal with "Confirm" and "Cancel" buttons.\n' +
  '  - `title`: String, title of the modal.\n' +
  '  - `captionText`: String, text displayed in the modal.\n' +
  '  - `onCustomEvent`: Function, called when the user clicks "Confirm".\n' +
  '  - `onCancel`: Function (optional), called when the user clicks "Cancel"';
const markdownContentDeeplinkRes =
  '# Deep Link Resolver Hook\n\n' +
  'The **[`useDeepLinkResolver`](/frontend/src/hooks/linking/use-deep-link-resolver.js)** hook is designed to enhance navigation in React Native applications by handling deep links effectively. This hook integrates with the navigation system to ensure deep links direct users to the correct screens, even when the application was not initially open or the user was not authenticated at the time the deep link was activated.\n\n' +
  '## Overview\n\n' +
  'Deep links allow applications to open at specific screens by using a URL, which is particularly useful in marketing, notifications, and inter-app communication.\n' +
  'The **[`useDeepLinkResolver`](/frontend/src/hooks/linking/use-deep-link-resolver.js)** ensures that if a deep link is activated and the application cannot immediately navigate due to reasons like the user not being logged in or the application still loading, the deep link data is stored and processed as soon as the conditions allow.\n\n' +
  '## Implementation Details\n\n' +
  '**Dependencies**:\n\n' +
  '[`parse-deeplink`](/frontend/src/helpers/parse-deeplink.js): A utility to parse the incoming deep link URL into a route and parameters.\n\n' +
  '[`secure-storage`](/frontend/src/helpers/secure-storage.js): Potentially for securely storing sensitive deep link information, not used directly in the provided code snippet.\n\n' +
  '## Functional Description\n\n' +
  '**Initial Deep Link Handling**:\n\n' +
  'On receiving a deep link, the hook checks if the application context within the [`accountCtx`](/documentations/context-provider/Account_Context.md) state is ready and has an active session.\n\n' +
  "If the context in [`accountCtx`](/documentations/context-provider/Account_Context.md) is not ready **indicating that the app might be loading or the user isn't authenticated**, the deep link data is stored using `AsyncStorage` for later use.\n\n" +
  '**Stored Deep Link Resolution**:\n\n' +
  'Once the application is fully loaded and/or the user session is active, the hook attempts to navigate to the stored deep link.\n\n' +
  'It checks if the current screen matches the deep link target. If it does, it assumes that the user is already viewing the intended content and clears the stored data.\n\n' +
  'If not, it navigates to the appropriate screen using the parameters stored with the deep link.\n\n' +
  '**Navigation**:\n\n' +
  'Navigation commands are executed based on the deep link type, with specific logic handling various types of content such as events or articles.\n\n' +
  'Jump to the Hook: **[`useDeepLinkResolver`](/frontend/src/hooks/linking/use-deep-link-resolver.js)**\n\n';

const markdownContentDeepLinks =
  '# Deeplink Implementation\n\n' +
  'This documentation outlines the implementation of deep linking in a React Native application, explaining what deep links are, their importance, and how they are integrated into the app.\n\n' +
  '## What are Deep Links?\n\n' +
  'Deep links are URLs that direct users to specific content within an app, bypassing the need to navigate through the app to find it. These links are especially useful in mobile apps for promotional campaigns, navigation from emails, social media posts, or other apps, providing a smooth user experience by directly leading the user to the desired content.\n\n' +
  '## Dynamic Route Rendering\n\n' +
  "Proper setup of logic-based route rendering is crucial for a seamless user experience and ensures that the app can handle deep links correctly. It involves setting up navigation routes that adjust based on the user's authentication status or other criteria, ensuring that users are directed appropriately within the app.\n\n" +
  '### See the App Logic-Based Routing\n\n' +
  "Here’s how the app's deep linking-friendly logic-based routing is implemented in **[`RootNavigation.js`](/frontend/src/modules/navigation/RootNavigation.js)** it covers if the firebase backend is not loaded, user is un-auth or user is auth.\n\n" +
  '## Deep Link Configuration\n\n' +
  'A deep link configuration object defines the URL prefixes and the mapping of these URLs to the navigation structure of the app. This configuration ensures that deep links correctly navigate to the specified screens within the app.\n' +
  'The config covers all app scenarios and is able to route the user properly through the screens.\n\n' +
  '[See the Deep Link config of this App](/frontend/src/constants/constants.js)\n\n' +
  '_You have to ensure that all screens on wich the deeplink can directed are defined within this object._\n\n' +
  '### Applying the Deep Link config\n\n' +
  'The deep link config is applied in to the Navigation Container in **[`Navigator.js`](/frontend/src/modules/navigation/Navigator.js)** to ensure that the app can handle incoming deep links appropriately.\n\n' +
  '---\n\n' +
  '_IMPORTANT: Only the screens defined in the configuration object are navigable through deep links. This ensures a targeted and user-friendly navigation experience based on URLs._';

const MarkdownOverview = () => {
  return (
    <View className="w-full pb-8">
      <Markdown styles={markdownStyles}>{markdownContent}</Markdown>
      <Markdown styles={markdownStyles}>{markdownContentAccountCTX}</Markdown>
      <Markdown styles={markdownStyles}>{markdownContentModalCTX}</Markdown>
      <Markdown styles={markdownStyles}>{markdownContentDeepLinks}</Markdown>

      <Markdown styles={markdownStyles}>{markdownContentDeeplinkRes}</Markdown>
    </View>
  );
};

const markdownStyles = {
  heading1: {
    fontSize: getFontSize(24),
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: 'pink',
  },
  href: {
    color: 'blue',
  },
  mailTo: {
    color: 'lightblue',
  },
  text: {
    color: 'lightgray',
  },
};

export default MarkdownOverview;
