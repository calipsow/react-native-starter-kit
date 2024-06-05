import { useState, useEffect, useContext } from 'react';
import { Firebase } from '../../../App'; // Pfad anpassen
import { onAuthStateChanged } from 'firebase/auth/react-native';
import { resolveRole } from '../auth/use-auth-listener';

const useUserAuthState = () => {
  const { auth } = useContext(Firebase);
  const [role, setRole] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const role = await resolveRole(user.uid);
        setRole(role); // 'admin' als Beispiel für eine Rolle
      } else {
        setRole('');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return role;
};

export default useUserAuthState;
