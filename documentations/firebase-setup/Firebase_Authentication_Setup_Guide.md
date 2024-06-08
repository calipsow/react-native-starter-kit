# Firebase Authentication

Follow these steps to set up Firebase Authentication in your existing Firebase project:

## Sign in to Firebase Console

Navigate to the [Firebase Console](https://console.firebase.google.com/).

Select your existing project from the list of projects.

## Add Firebase Authentication to Your Project

In the Firebase console, click on the `Authentication` section in the left panel under `Build`.

Click `Get started`.

## Choose Authentication Providers

**Enable Email/Password to get started**.

(info): Firebase Authentication supports various providers such as Email/Password, Google, Facebook, Twitter, GitHub, etc. Shipnative uses Email/Password

(info): For some providers you need by toggling to configuring the necessary API keys and secrets that you receive from those services.

## Configure Authentication Settings

**Set login method preferences to sign in with email and password.**

(optional): Configure additional settings such as password reset policies and email verification templates.

## Security

(info): Use Firebase Rules and custom claims to secure your application by restricting what authenticated users are allowed to do.

(info): Regularly review and update your security rules in response to how your app evolves.

## Monitoring Authentication

(info): Use the Firebase console to monitor authentication activities and troubleshoot issues.

The shipnative app comes with an fully implemented auth workflow see more about it in [Authentication Workflow](/documentations/authentication-workflow/Authentication_Workflow.md).
For further details about Auth, visit the official [Firebase Authentication Documentation](https://firebase.google.com/docs/auth).

## Additional Tips

Continuously update and monitor your authentication methods to ensure data safety.

Consider integrating advanced features such as Multi-Factor Authentication (MFA) for enhanced security.
