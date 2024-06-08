
# Setup Firebase Storage Bucket

Follow these steps to set up Firebase Storage in your existing Firebase project. Note that you must be on a paid plan (Blaze plan) to fully utilize Firebase Storage with higher limits and capabilities.

## Step 1: Sign in to Firebase Console
- Navigate to the [Firebase Console](https://console.firebase.google.com/).
- Select your existing project from the list of projects.

## Step 2: Upgrade to Blaze Plan
- Firebase Storage requires the Blaze Plan for higher usage limits and extended features.
- Go to the billing section by selecting `Billing` in the sidebar.
- Choose the `Upgrade` option and select the Blaze Plan. Follow the instructions to upgrade.

## Step 3: Add Firebase Storage to Your Project
- In the Firebase console, click on the `Storage` section in the left panel under `Build`.
- Click `Get started` with Firebase Storage.
- Follow the setup flow which includes setting your storage security rules.

## Step 4: Configure Security Rules for Storage
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

## Step 5: Use Firebase Storage
- After setup, you can upload and manage files through the Firebase console or use Firebase SDKs in your app.
- Use the provided SDK methods to upload files, manage metadata, or fetch files as needed.

## Step 6: Monitor Usage and Optimize Costs
- Keep track of your storage usage and bandwidth through the Firebase console.
- Optimize file storage and transfers to manage costs, especially if your application handles large amounts of data.

For detailed documentation and best practices, refer to the official [Firebase Storage Documentation](https://firebase.google.com/docs/storage).

## Additional Tips
- Regularly update your security rules to protect data.
- The storage bucket is for free until 500MB of data. 
- Ensure uploaded images are small as possible. Use our boilerplate hooks `src/hooks/firebase` they compromise images and esure security and integrity. 
- Hooks for delete images from the bucket and more are ready to use. See more in [firebase fuctions](/documentations/hooks/Firebase_Hooks.md).
