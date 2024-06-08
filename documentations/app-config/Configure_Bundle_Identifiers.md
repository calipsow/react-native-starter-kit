# Bundle Names

We have to set your package name or bundle identifier through the app.

## Android Setup

Set the `namespace` and the `applicationId` values to your package name in **[build.gradle file](/frontend/android/app/build.gradle)**.

```gradle
android {
    ndkVersion rootProject.ext.ndkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion
    compileSdk rootProject.ext.compileSdkVersion
    namespace "com.shipnative.callipson" // UPDATE THIS TO YOUR PACKAGE NAME

    defaultConfig {
        applicationId "com.shipnative.callipson" // UPDATE THIS TO YOUR PACKAGE NAME
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
    }
}
```

Change package to your own package name in **[MainActivity.kt](/frontend/android/app/src/main/java/com/shipnative/MainActivity.kt)**

```java
package com.shipnative.callipson // UPDATE THIS TO YOUR PACKAGE NAME

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
```

Also update package to your own in **[MainApplication.kt](/frontend/android/app/src/main/java/com/shipnative/MainApplication.kt)**

```java
package com.shipnative.callipson // UPDATE THIS PACKAGE NAME

import android.app.Application
import com.facebook.react.PackageList
```

## iOS Setup

The bundle identifier for your iOS standalone app.

**You make it up, but it needs to be unique on the App Store.**

Open your app with xCode and update the bundle identifier within the general section of the xCode editor.
