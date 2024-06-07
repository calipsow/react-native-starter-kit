import { useEffect, useState } from 'react';
import { USER_SCHEME } from '../../constants/firestore-schemes';
import { resolveRole } from './use-auth-listener';

/**
 * This Hook is bonded to the useCreateDocument Hook and takes the createDocument method and the success state of this hook as args
 * @param {*} createDocumentHook
 * @param {*} createDocSuccessState
 * @returns
 */
const useInitialAccountCreation = (
  createDocumentHook = async function (
    collectionID = '',
    documentId = '',
    data = {},
  ) {},
  createDocSuccessState,
) => {
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [account, setAccount] = useState(null);

  const createNewAccount = async (uid = '', currentUser) => {
    setLoading(true);
    setSucceeded(false);
    setError('');

    try {
      if (!uid || !currentUser)
        throw Error('No valid firebase uid or user provided!');
      USER_SCHEME.firebase_auth_data = { ...currentUser };
      USER_SCHEME.firebase_uid = uid;
      USER_SCHEME.uid = uid;
      USER_SCHEME.role = 'user';

      await createDocumentHook('Users', uid, USER_SCHEME);
      setAccount(USER_SCHEME);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSucceeded(false);
      setError(error);
    }
  };

  useEffect(() => {
    if (createDocSuccessState) {
      setLoading(false);
      setSucceeded(true);
    }
  }, [createDocSuccessState]);

  return {
    createNewAccount,
    succeeded,
    loading,
    error,
    account,
  };
};

export default useInitialAccountCreation;
