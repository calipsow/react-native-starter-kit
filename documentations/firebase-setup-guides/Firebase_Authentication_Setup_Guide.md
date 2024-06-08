
# Setup Firebase Authentication

Follow these steps to set up Firebase Authentication in your existing Firebase project:

## Step 1: Sign in to Firebase Console
- Navigate to the [Firebase Console](https://console.firebase.google.com/).
- Select your existing project from the list of projects.

## Step 2: Add Firebase Authentication to Your Project
- In the Firebase console, click on the `Authentication` section in the left panel under `Build`.
- Click `Get started`.

## Step 3: Choose Authentication Providers
- Firebase Authentication supports various providers such as Email/Password, Google, Facebook, Twitter, GitHub, etc.
- Enable the providers you need by toggling them on and configuring the necessary API keys and secrets that you receive from those services.

## Step 4: Configure Authentication Settings
- Set up your login method preferences, such as allowing users to sign in with their email and password.
- Configure additional settings such as password reset policies and email verification templates.

## Step 5: Test The Authentication Setup
- Thoroughly test each authentication method to ensure everything works smoothly from the user’s perspective.
- Use the Firebase console to monitor authentication activities and troubleshoot issues.

The shipnative app comes with an fully implemented auth workflow see more about it in [Authentication Workflow](/documentations/authentication-workflow/Authentication_Workflow.md).
For further details about Auth, visit the official [Firebase Authentication Documentation](https://firebase.google.com/docs/auth).

## Additional Tips
- Continuously update and monitor your authentication methods to ensure data safety.
- Consider integrating advanced features such as Multi-Factor Authentication (MFA) for enhanced security.
