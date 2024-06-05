import { useState, useContext } from 'react';
import { Firebase } from '../../../App';
import { sendPasswordResetEmail } from 'firebase/auth/react-native';

const useResetPassword = () => {
  const { auth } = useContext(Firebase);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = async email => {
    setLoading(true);
    setEmailSent(false);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { resetPassword, emailSent, error, loading };
};

export default useResetPassword;
