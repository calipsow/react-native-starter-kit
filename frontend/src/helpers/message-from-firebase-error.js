export default function getFriendlyErrorMessage(errorCode = '') {
  switch (true) {
    case errorCode.includes('auth/email-already-in-use'):
      return 'Diese E-Mail-Adresse wird bereits verwendet. Bitte verwenden Sie eine andere E-Mail-Adresse oder melden Sie sich an.';
    case errorCode.includes('auth/invalid-email'):
      return 'Die eingegebene E-Mail-Adresse ist ungültig. Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.';
    case errorCode.includes('auth/operation-not-allowed'):
      return 'Diese Operation ist nicht erlaubt. Bitte kontaktieren Sie den Support, wenn Sie denken, dass dies ein Fehler ist.';
    case errorCode.includes('auth/weak-password'):
      return 'Das gewählte Passwort ist zu schwach. Bitte wählen Sie ein stärkeres Passwort.';
    case errorCode.includes('auth/user-disabled'):
      return 'Dieser Benutzer wurde deaktiviert. Bitte kontaktieren Sie den Support für weitere Informationen.';
    case errorCode.includes('auth/user-not-found'):
      return 'Es konnte kein Benutzer mit diesen Anmeldeinformationen gefunden werden. Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.';
    case errorCode.includes('auth/wrong-password'):
      return 'Das eingegebene Passwort ist falsch. Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.';
    case errorCode.includes('auth/invalid-login-credentials'):
      return 'Das eingegebene Passwort oder Email ist falsch. Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.';
    case errorCode.includes('auth/too-many-requests'):
      return 'Zu viele Anfragen. Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.';
    case errorCode.includes('auth/permission-denied'):
      return 'Sie haben keine Berechtigung, diese Aktion auszuführen. Bitte überprüfen Sie Ihre Berechtigungseinstellungen oder kontaktieren Sie den Support.';
    case !errorCode:
      return '';
    default:
      return 'Ein Fehler ist aufgetreten.';
  }
}
