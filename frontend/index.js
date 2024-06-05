/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, Platform } from 'react-native';
import App, { AppWrapperSafeArea } from './App';
import { name as appName } from './app.json';
import { slug as iosAppName } from './app.json'; // todo same name for ios and android
import messaging from '@react-native-firebase/messaging';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { isIOS } from './src/constants/constants';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return (
    <SafeAreaProvider>
      <AppWrapperSafeArea />
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(isIOS ? 'ZSW' : appName, () => HeadlessCheck);
