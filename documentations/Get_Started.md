# Basic Setup

This setup goes trough all setup steps. Make sure you completed this initial setup before you go into developing.

## General Information

This project uses Firebase as backend, an free backend solution for building native apps and web apps as well.

You need an active Google Account to get started.
In case you dont have one, [create a free account](https://accounts.google.com) in just a minute.

## Get Started

### 1. Setup Firebase Project

Go to the [Firebase Console](https://console.firebase.google.com/) and log in with your Google account.
Once logged in, click on **"Create new project"**.

- Enter a project name and follow the on-screen instructions.

- Make sure to enable Google Analytics for your project, as it provides valuable insights for your application.

---

### 2. Create Firebase Apps

You'll need to create separate Firebase apps within your project one for Android, iOS, and Web

The Web-App is just needed to simplify the setup process. 

**For Android**

- Click on the **Android icon** to add a new Android app.

- Create an package name for your android app.
  This bundle identifier needs also configured in this project, more about in **[app identifiers](/documentations/app-config/Configure_Bundle_Identifiers.md)**.

- Download the `google-services.json` file and place it in the **[`/android/app/`](/frontend/android/app/)** directory.

**For iOS**

- Click on the **iOS icon** and add a new iOS App.

- Register your app with an iOS bundle ID.  
You also have to setup this bundle id in xCode. More about in [app identifiers](/documentations/app-config/Configure_Bundle_Identifiers.md)

- Download the `GoogleService-Info.plist` file and add it to your project using Xcode, right click on the project directory shipnative,
 select **add File** and select the downloaded GoogleService-Info.plist and add it to the project.

- *You dont need to modify the [`AppDelegate.mm`](/frontend/ios/shipnative/AppDelegate.mm) yourself. Its already configured for you.*

**For Web**

- Click on the **web app icon** and create it

- Choose an name for the web-app and submit

---

### 3. Configure Firebase Client

In the Firebase Console, click on **project settings** and 
scroll down to your web app and click on it.

In the menu below **"SDK setup and configuration"**, select the **"Configuration"** option. 
Then copy the `firebaseConfig` in shown code snipped.

Navigate in your local project to the **[firebase-client.js](/frontend/config/firebase-client.js)** file. 
Replace the sample config with your actual `firebaseConfig`. And save the file.

---

### 4. Required Firebase Features

The links below providing ypu a simple step by step guide how to add the features to your firebase project.

Make sure you habe them all setup properly.

**[Firebase Authentication](/documentations/firebase-setup/Firebase_Authentication_Setup_Guide.md)** used for handling users, auth and sessions 

**[Firebase Firestore](/documentations/firebase-setup/Firestore_Setup_Guide.md)** document baded database 

**[Firebase Storage](/documentations/firebase-setup/Firebase_Storage_Setup_Guide.md)** an cdn like storage bucket for saving files.

**[Firebase Functions](/documentations/firebase-setup/Firebase_Functions_Setup.md)** serverless backend functions

### 5. Install Dependencies

Install the requirements from `package.json`, 
recommend is using yarn but you can use other package management systems as well.

Go to the [root directory](/frontend/) with your terminal and install all dependencies by using yarn:

```bash
yarn
```

Using NPM:

```bash
npm install --legacy-peer-debs --save
```

---

**Run the App**

Make sure you have an running emulator or a usb-connected device to run the app with.

**Run on iOS**

Switch into the [ios folder](/frontend/ios/) and updating the iOS pods with by running:

```bash
pod install --repo-update
```

After that you can start with:

```bash
npx react-native run-ios
```

**Run on Android**

You can jump right into with running:

```bash
npx react-native run-android
```
