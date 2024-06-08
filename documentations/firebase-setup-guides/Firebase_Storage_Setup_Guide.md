# Setup Firebase Storage Bucket

Follow these steps to set up Firebase Storage in your existing Firebase project.
Note that you must be on a "pay as you go plan" (Blaze plan) to utilize Firebase Storage with higher limits and capabilities over 500MB.

## Sign in to Firebase Console

- Navigate to the [Firebase Console](https://console.firebase.google.com/).
- Select your existing project from the list of projects.

## Upgrade to Blaze Plan

**The Blaze Plan is free you only pay if your service exceeded some the firebase limits**

- Firebase Storage requires the Blaze Plan for higher usage limits and extended features.
- Go to the billing section by selecting `Billing` in the sidebar.
- Choose the `Upgrade` option and select the Blaze Plan. Follow the instructions to upgrade.
- (tip): you can enable stops and notifications if you reach a specific usage level or price limit

## Add Firebase Storage to Your Project

- In the Firebase console, click on the `Storage` section in the left panel under `Build`.
- Click `Get started` with Firebase Storage.
- Follow the setup flow which includes setting your storage security rules.

## Configure Security Rules for Storage

- Firebase Storage comes with default security rules which you might need to modify according to your app’s needs.
  Example of a basic rule for authenticated access only:
```
service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
```
- Confirm your security settings and proceed.

## Monitor Usage and Optimize Costs

- Keep track of your storage usage and bandwidth through the Firebase console.
- Optimize file storage and transfers to manage costs, especially if your application handles large amounts of data.

For detailed documentation and best practices, refer to the official [Firebase Storage Documentation](https://firebase.google.com/docs/storage).

## Additional Tips

- Regularly update your security rules to protect data.
- The storage bucket is for free until 500MB of data.
- Ensure uploaded images are small as possible. Use our boilerplate hooks `src/hooks/firebase` they compromise images and esure security and integrity.
- Hooks for delete images from the bucket and more are ready to use. See more in [firebase fuctions](/documentations/hooks/Firebase_Hooks.md).
