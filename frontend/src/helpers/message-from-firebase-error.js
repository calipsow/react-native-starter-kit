export default function getFriendlyErrorMessage(errorCode = '') {
  switch (true) {
    case errorCode.includes('auth/email-already-in-use'):
      return 'This e-mail address is already in use. Please use a different e-mail address or log in.';
    case errorCode.includes('auth/invalid-email'):
      return 'The e-mail address you entered is invalid. Please check your entry and try again.';
    case errorCode.includes('auth/operation-not-allowed'):
      return 'This operation is not allowed. Please contact support if you think this is a mistake.';
    case errorCode.includes('auth/weak-password'):
      return 'The selected password is too weak. Please choose a stronger password.';
    case errorCode.includes('auth/user-disabled'):
      return 'This user has been deactivated. Please contact support for further information.';
    case errorCode.includes('auth/user-not-found'):
      return 'No user with these credentials could be found. Please check your entry and try again.';
    case errorCode.includes('auth/wrong-password'):
      return 'The password you entered is incorrect. Please check your entry and try again.';
    case errorCode.includes('auth/invalid-login-credentials'):
      return 'The password or email you entered is incorrect. Please check your entry and try again.';
    case errorCode.includes('auth/too-many-requests'):
      return 'Too many requests. Please wait a moment before trying again.';
    case errorCode.includes('auth/permission-denied'):
      return 'You do not have permission to perform this action. Please check your authorization settings or contact support.';
    case !errorCode:
      return '';
    default:
      return 'Ein Fehler ist aufgetreten.';
  }
}
