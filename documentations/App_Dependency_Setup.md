# Shipnative Setup Guide

This setup go trough all required steps to get started with your app, make sure you completed this setup before you start developing.

**Finish this Setup completely before you Start**

## General Information

This project uses Firebase as backend,
**Firebase is an free backend solution** for native apps and web apps as well.
Firebase enables to develop apps fast and reliable and secure applications across all platforms.

In order to use Firebase as backend you need an Google Account to start with.
In case you dont have one, create a free one in just a minute. [Create Google Account](https://support.google.com/accounts/answer/27441?hl=de)

## Get Started

### 1. Setup your Firebase Project

Go to the [Firebase Console](https://console.firebase.google.com/) and log in with your Google account.
Once logged in, click on "Create new project".

- Enter a project name and follow the on-screen instructions.
- Make sure to enable Google Analytics for your project, as it provides valuable insights.
- After this you should enable Firebase Functions, see more in **[setup firebase functions](/documentations/firebase-setup-guides/Firebase_Functions_Setup.md)**.

---

### 2. Create Firebase Apps

You'll need to create separate Firebase apps within your project for Android, iOS, and Web:

The web app is needed to simplify the setup

**For Android**:

- Click on the Android icon to create a new Android app.
- Create an package name for your android app.
  Like this one: `com.example.android.app`. This bundle identifier needs also configured within this project, more about in **[app identifiers](/documentations/general-setup/Configure_Bundle_Identifiers.md)**.
- Download the `google-services.json` file and place it in the **[`/android/app/`](/frontend/android/app/)** directory.

**For iOS**:

- Click on the iOS Icon and create a new iOS App in Firebase.
- Register your app with an iOS bundle ID. Like the package name for android. Example: `com.example.ios.app`. **The identifier should be unique on the App Store.** More about in [app identifiers](/documentations/general-setup/Configure_Bundle_Identifiers.md)
- Download the `GoogleService-Info.plist` file and add it to your project using Xcode.
- **You dont have to modify the [`AppDelegate.mm`](/frontend/ios/shipnative/AppDelegate.mm) yourself. Its already configured for you.**

**For Web**:

- Click on the web app icon and create it
- Select an name for the web app and submit

---

### 3. Configure App Client

At the Firebase Console click on **settings**, select **project settings**, scroll down until you see your Web App and select it.

Below **SDK setup and configuration**, select the **Configuration** option. Copy the `firebaseConfig` object from the code snipped.

Go to **[firebase-client.js](/frontend/config/firebase-client.js)** file, replace the initial firebaseConfig with the `firebaseConfig` you copied from firebase.

---

### 4. Setup Firebase Features

Follow the Setup Guides for the required Firebase-Features

**[Firebase Authentication](/documentations/firebase-setup-guides/Firebase_Authentication_Setup_Guide.md)**

**[Firebase Firestore](/documentations/firebase-setup-guides/Firestore_Setup_Guide.md)**

**[Firebase Storage](/documentations/firebase-setup-guides/Firebase_Storage_Setup_Guide.md)**

**[Firebase Functions](/documentations/firebase-setup-guides/Firebase_Functions_Setup.md)**
