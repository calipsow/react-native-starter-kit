# Deeplink and Domain Setup

Associating a domain with a mobile application and setting up custom URL schemes for iOS and Android in a React Native environment involves several detailed steps.

This guide will walk you through the necessary configurations for both platforms, as well as adjustments needed for native modules in your React Native app.

## Associate your Domain

Setup Guide for your domains to associate apps with it.

### iOS - Associated Domains

**1. Apple Developer Account Config**

- Log in to your [Apple Developer Account](https://developer.apple.com/).
- Go to "Certificates, Identifiers & Profiles" and select your app identifier.
- Enable "Associated Domains" under the app capabilities.

**2. Xcode Configuration**:

- Open your project in Xcode.
- Select your target and go to the "Capabilities" tab.
- Toggle "Associated Domains" to on and add your domain in the format: `applinks:yourdomain.com`.

**3. Server/Domain Configuration**:

- Ensure your server hosts an Apple App Site Association (AASA) file at `https://yourdomain.com/.well-known/apple-app-site-association`.
- This file should not have any file extension and must be accessible via HTTPS without any redirects.

Example AASA file:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.example.app",
        "paths": ["*"]
      }
    ]
  }
}
```

### Android - Digital Asset Links

**Google Play Console Config**

- Ensure your app is added to the Google Play Console.
- Link your app with the website by verifying the ownership through the Google Play Console.

**Asset Links File**

- Host a Digital Asset Links JSON file at `https://yourdomain.com/.well-known/assetlinks.json` route in your webserver or hosting provider.

Example asset links file:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.app",
      "sha256_cert_fingerprints": ["HASH"]
    }
  }
]
```

**Update Android Manifest**

- Add an intent filter in your **[`AndroidManifest.xml`](/frontend/android/app/src/main/AndroidManifest.xml)** to associate HTTP and HTTPS URLs with your app.

```xml
<activity>
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="yourdomain.com" />
  </intent-filter>
</activity>
```

## Config Custom URL Schemes

### For iOS

**Xcode Config**

- Open your project in Xcode.
- Select your project target, go to the "Info" tab.
- Expand "URL Types" and click the "+" to add a new URL type.
- Enter your custom scheme (e.g., `app`) in "URL Schemes".

### For Android

**Android Manifest Config**

- Add an intent filter for your custom URL scheme in **[`AndroidManifest.xml`](/frontend/android/app/src/main/AndroidManifest.xml)**.

```xml
<activity>
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="app" />
  </intent-filter>
</activity>
```

## Conclusion

This comprehensive guide explains how to set up domain association and custom URL schemes for your React Native app on both iOS and Android platforms. By following these steps, you ensure that your app can handle deep links effectively and is integrated with other web presence aspects.
