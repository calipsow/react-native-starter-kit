import { useState, useContext, useEffect } from 'react';
import SecureStorage from '../../helpers/secure-storage';
import { Firebase } from '../../../App';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

const useRegisterUser = ({ email, username, role, passwd }) => {
  const { auth } = useContext(Firebase);
  const [accountCreatedSuccessfully, setAccountCreatedSuccessfully] =
    useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [idToken, setIdToken] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState('UNCONFIRMED');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset states bei jeder Änderung der Eingabeparameter
    setFirebaseError('');
    setEmailConfirmed('UNCONFIRMED');
    setIdToken('');
    setAccountCreatedSuccessfully(false);
  }, [email, username, role, passwd]);

  const registerUser = async (name = '', email = '', passwd = '') => {
    if (passwd.length < 10) {
      setFirebaseError('Passwort ist zu kurz. (10 Zeichen mindestens)');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        passwd,
      );
      const user = userCredential.user;

      await user.updateProfile({
        displayName: username?.trim() || name?.trim(),
      });

      await user.sendEmailVerification();
      setEmailConfirmed('PENDING');

      const token = await user.getIdToken();
      setIdToken(token);
    } catch (error) {
      setFirebaseError(error.message);
      setIdToken('');
      setEmailConfirmed('UNCONFIRMED');
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    accountCreatedSuccessfully,
    firebaseError,
    idToken,
    loading,
    emailConfirmed,
  };
};

export default useRegisterUser;
