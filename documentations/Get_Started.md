# Basic Setup

This setup goes trough all setup steps. Make sure you completed this initial setup before you go into developing.

## General Information

This project uses Firebase as backend, an free backend solution for building native apps and web apps as well.

You need an Google Account to get started.
In case you dont have one, [create a free account](https://accounts.google.com) in just a minute.

## Get Started

### 1. Setup Firebase Project

Go to the [Firebase Console](https://console.firebase.google.com/) and log in with your Google account.
Once logged in, click on **"Create new project"**.

- Enter a project name and follow the on-screen instructions.

- Make sure to enable Google Analytics for your project, as it provides valuable insights for your application.

_Take Note:_
You for publishing your Android Apps an [Google Play Developer Account](https://play.google.com/console/signup). For developing iOS apps you need an MacBook with XCode installed and if you want to release for the App Store an [Apple Developer Account](https://developer.apple.com/) as well.

---

### 2. Init the Firebase Project

You'll need to create separate Firebase apps within your project one for Android, iOS, and Web.
_The Web-App is just needed to simplify the setup process._

**For Android**

- Click on the **Android icon** to add a new Android app.

- Create an package name for your android app.
  **This bundle identifier needs also configured in this project, more about in [package names](/documentations/app-config/Configure_Bundle_Identifiers.md).**

- Download the `google-services.json` file and place it in this directory: **[`/android/app/`](/frontend/android/app/)**.

**For iOS**

- Click on the **iOS icon** and add a new iOS App.

- Register your app with an iOS bundle ID.  
  **You also have to setup this bundle id in XCode. More about in [app identifiers](/documentations/app-config/Configure_Bundle_Identifiers.md)**

- Download the `GoogleService-Info.plist` file and add it to your project using Xcode, right click on the project directory shipnative,
  select **add File** and select the downloaded GoogleService-Info.plist and add it to the project.

- _You dont need to modify the [`AppDelegate.mm`](/frontend/ios/shipnative/AppDelegate.mm) yourself. Its already configured for you._

**For Web (Required)**

- Click on the **web app icon** and create it

- Choose an name for the web-app and submit

---

### 3. Configure Firebase Client

At the Firebase Console, click on **project settings** and
scroll down to your web app and click on it.

In the menu below **"SDK setup and configuration"**, select the **"Configuration"** option.
Then copy the `firebaseConfig` in shown code snipped.

Navigate in your local project to the **[`firebase-client.js`](/frontend/config/firebase-client.js)** file.
Replace the example config with your actual `firebaseConfig`. And save the file.

---

### 4. Required Firebase Features

The links below providing you the step by step guides, for how to setup the firebase features for your project.

Make sure you habe them all setup properly.

**[Firebase Authentication](/documentations/firebase-setup/Firebase_Authentication_Setup_Guide.md)** used for handling users, auth and sessions - **Required**

**[Firebase Firestore](/documentations/firebase-setup/Firestore_Setup_Guide.md)** document baded database - **Required**

**[Firebase Storage](/documentations/firebase-setup/Firebase_Storage_Setup_Guide.md)** an cdn like storage bucket for saving files. - **Optional**

**[Firebase Functions](/documentations/firebase-setup/Firebase_Functions_Setup.md)** serverless functions and used to handle push notifications - **Optional**

### 5. Install Dependencies

Install the requirements from `package.json`,
recommend is using yarn but you can use a package management systems you prefer as well.

Go to the **[`root directory`](/frontend/)** with your terminal and install all dependencies by using yarn:

```shell
yarn install
```

Using NPM:

```shell
npm install --legacy-peer-debs --save
```

---

**Emulating the App**

Make sure you have an running emulator or a usb-connected device with usb debugging enabled you find those setting usually in your developer settings within your regular settings. Alternative you can use an [Android Studio](https://developer.android.com/studio) [Emulator](https://developer.android.com/studio/run/managing-avds) to run your app.

If you are using Xcode you can simply start an emulator device using Xcode, more about in [iOS Emulator](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device) otherwise react native will try to launch a emulator using Xcode.

**Run on iOS**

Switch into the [ios folder](/frontend/ios/) and updating the iOS pods with by running:

```shell
cd ios
pod install --repo-update
cd ..
```

After that you can start with:

```shell
npx react-native run-ios
```

**Run on Android**

You can jump right into with running:

```shell
npx react-native run-android
```

# Troubleshooting

## **Android**

When developing and testing Android apps with React Native using an emulator, various issues can arise. Here's a comprehensive troubleshooting guide for running React Native apps on an Android emulator within the context of Android Studio:

### 1. **Check Your Development Environment**

Before starting your troubleshooting, ensure your development environment is correctly set up:

- **Node.js**: Installed and up-to-date.
- **React Native CLI**: Installed via `npm install -g react-native-cli`.
- **Android Studio**: Installed with the latest updates.
- **Android SDK**: Properly set up in Android Studio.
- **Emulator**: Ensure a valid emulator is configured.

### 2. **Starting the Emulator**

If you encounter issues starting the emulator:

- **Slow Startup/No Response**: Check system resources. Emulators require significant resources. Increase the RAM or allocate more CPU cores if possible.
- **Error Messages**: Pay attention to specific error codes or messages in Android Studio. Search these errors online or in Android documentation for specific fixes.

### 3. **Building and Deploying the App**

Issues when compiling or deploying the app to the emulator:

- **ADB (Android Debug Bridge) Errors**: Ensure ADB is running (`adb devices` should list your emulator). If the emulator is not showing, restart ADB with `adb kill-server` and `adb start-server`.
- **App Not Installing**: Check if the emulator has enough storage space. Also, ensure that no security or permission settings are blocking the installation.

### 4. **Running the App**

If the app doesn't run correctly:

- **White or Black Screens**: Verify the app is loading properly. Check the Android Studio Logcat for error messages.
- **Performance Issues**: Check if the emulator or your computer is being taxed by other processes. Optimize the emulator's performance settings.
- **Crashes**: Look for error logs in Logcat. Often crashes are caused by unexpected null values or unhandled exceptions.

### 5. **Debugging and Logs**

Utilize the built-in debugging tools:

- **Logcat in Android Studio**: Filter by your app to see relevant logs. This can help identify the cause of crashes or misbehavior.
- **React Native Debugger**: Connect the debugger to your app to inspect JavaScript-specific issues.

### 6. **Hot Reloading and Live Reloading**

If these features are not working:

- **Check Settings**: Ensure that Hot Reloading/Live Reloading is enabled in your app.
- **Network Issues**: Ensure your emulator is correctly connected to the network and that no firewall or VPN is blocking the connection.

### 7. **Network Requests**

Issues with network requests can be caused by:

- **CORS (Cross-Origin Resource Sharing)**: Ensure your backend accepts CORS requests from your app.
- **Incorrect URLs**: Verify that URLs are correctly configured for access via the emulator. Use `10.0.2.2` instead of `localhost` to access your local server from the emulator. You can print out your local ip addresses using:

Windows

```shell
ipconfig /all
```

Mac

```shell
ifconfig
```

Linux

```shell
ip addr show
```

## **iOS**

To develop an iOS app with React Native using Xcode, you'll need to prepare your development environment and understand the basic workflow. Here’s a detailed guide that walks you through the key steps.

### Prerequisites

Before you begin, ensure you meet the following prerequisites:

1. **A Mac with macOS**: iOS app development can only be performed on a Mac.
2. **Xcode**: Install Xcode from the Mac App Store. Xcode includes all necessary tools like the iOS Simulator, Swift and Objective-C compiler, and more.
3. **Node.js**: Install Node.js, which is required for running the React Native CLI.
4. **Watchman**: Install Watchman, a tool by Facebook for watching file changes. Install it using Homebrew:
   ```bash
   brew install watchman
   ```
5. **CocoaPods**: A dependency manager for Swift and Objective-C Cocoa projects. Install it with:
   ```bash
   sudo gem install cocoapods
   ```

### Setting Up a the React Native Project

1. **Install Dependencies**:
   In the terminal, run:

```shell
  npm install --legacy-peer-debs --save
```

2. **Install iOS dependencies**:
   In the terminal, navigate to the iOS directory of your project and install iOS dependencies using CocoaPods:
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Xcode Configuration

1. **Open the project in Xcode**:
   Launch Xcode and select "Open another project...", then navigate to the `ios` directory of your React Native project and open the `.xcworkspace` file.

2. **Configure the project**:
   - Make sure the correct target device or simulator is selected.
   - Review and adjust the build settings as necessary, such as Development Team, Bundle Identifier, etc.

### Development and Testing

1. **Start the Metro Bundler**:
   In the root directory of your project, start the Metro Bundler by running:

   ```bash
   npx react-native start
   ```

2. **Run the app in the simulator**:
   Open another terminal window and execute the following command to start your app in the iOS Simulator:

   ```bash
   npx react-native run-ios
   ```

   This command will launch the iOS Simulator and install your app.

3. **Debugging**:
   - Use the Xcode console or the React Native debug menu (which appears in the simulator after shaking the device) for debugging.
   - You can also use Chrome Developer Tools by selecting "Debug JS Remotely" from the debug menu.

### Troubleshooting Tips

- If you encounter dependency issues, try running `pod install` again in the `ios` directory.
- For build errors, check the Xcode error message and consult React Native and CocoaPods documentation.

### Further Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Xcode Documentation](https://developer.apple.com/documentation/xcode)
