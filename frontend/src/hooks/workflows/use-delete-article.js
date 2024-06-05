import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../modules/AppView';
import deleteDocument from '../../functions/firestore/delete-document-async';
import { resolveAdminAccessLevel } from '../auth/use-auth-listener';
import getDocument from '../../functions/firestore/get-document-async';
import updateFirestoreDocument from '../../functions/firestore/update-document-field-async';
import useDeleteImage from '../firebase/use-delete-image';
import { deleteEventIDFromAccount } from '../../modules/account/profile/sections/PostedEvents';
import { ModalContext } from '../../modules/provider/ModalProvider';

const useDeleteArticle = () => {
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const { showModalAlert } = useContext(ModalContext);
  const deleteImgHook = useDeleteImage();
  const [error, setError] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteArticle = async ({ article_id }) => {
    console.log('deleting article with id', article_id);
    setLoading(true);
    setError('');
    setSucceeded(false);
    try {
      const article = await getDocument('Newsletter', article_id);
      if (!article)
        throw new Error('attempted to delete article wich is not resolvable');
      const userAdminAccess = await resolveAdminAccessLevel(accountCtx.uid);
      if (userAdminAccess !== 'full' && userAdminAccess !== 'article')
        throw new Error(
          'The current user has is not admin with full or article rights. permission denied',
        );
      console.log('deleting article from db..');
      // deleting event
      await deleteDocument('Newsletter', article_id);
      console.log('deleting poster from storage..');

      await deleteImgHook.deleteImage(article.poster);
      setSucceeded(true);
    } catch (error) {
      console.warn(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    if (!error.includes('permission denied')) return;
    showModalAlert(
      'Zugriff abgelehnt.',
      'Du hast nicht die nötigen rechte diesen Artikel zu löschen.',
    );
  }, [error]);

  return {
    error,
    succeeded,
    loading,
    deleteArticle,
  };
};

export default useDeleteArticle;
