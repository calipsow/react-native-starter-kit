import { useState, useContext, useCallback } from 'react';
import { Firebase } from '../../../App';
import { signInWithEmailAndPassword } from 'firebase/auth/react-native';

const useSignIn = () => {
  const { auth } = useContext(Firebase);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [idToken, setIdToken] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async ({ email = '', passwd = '' }) => {
    if (email.toLowerCase() === 'admin_account@dummy.com') {
      setError('Die Login Daten sind invalide, bitte prüfe deine Eingaben.');
      return;
    }

    setSucceeded(false);
    setError('');
    setIdToken('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        passwd,
      );
      const token = await userCredential.user.getIdToken();
      // console.log(token);
      setIdToken(token);
      setSucceeded(true);
    } catch (err) {
      console.log(err, 'failed to login');
      setError(err.message);
      setSucceeded(false);
    } finally {
      setLoading(false);
    }
  });

  return { signIn, succeeded, error, idToken, loading };
};

export default useSignIn;
