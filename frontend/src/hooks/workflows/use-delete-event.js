import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../modules/AppView';
import deleteDocument from '../../functions/firestore/delete-document-async';
import { resolveAdminAccessLevel } from '../auth/use-auth-listener';
import getDocument from '../../functions/firestore/get-document-async';
import updateFirestoreDocument from '../../functions/firestore/update-document-field-async';
import useDeleteImage from '../firebase/use-delete-image';
import { deleteEventIDFromAccount } from '../../modules/account/profile/sections/PostedEvents';

const useDeleteEvent = () => {
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const deleteImgHook = useDeleteImage();
  const [error, setError] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteEvent = async ({ event_id }) => {
    console.log('deleting event with id', event_id);
    setLoading(true);
    setError('');
    setSucceeded(false);
    try {
      const event = await getDocument('Events', event_id);
      // prettier-ignore
      if (!event) throw new Error('attempted to delete an event wich is not resolvable');
      // prettier-ignore
      const userAdminAccess = await resolveAdminAccessLevel(accountCtx.firebase_uid);
      // prettier-ignore
      const isIssuerAlsoCreator = event.creator_uid === accountCtx.uid;
      // prettier-ignore
      const hasNeededAdminRights = userAdminAccess === 'full' || userAdminAccess === 'event';

      if (!isIssuerAlsoCreator && !hasNeededAdminRights)
        throw new Error(
          'The current user is neither creator of this event or admin with full or event rights. permission denied',
        );

      if (isIssuerAlsoCreator) {
        console.log('deleting event from db..');
        // deleting event
        await deleteDocument('Events', event_id).catch(e => {
          console.warn(
            'Could not delete event from db id: ' +
              event_id +
              ' Error: ' +
              e.message,
          );
        });
      } else {
        console.log(
          'isIssuerAlsoCreator: FALSE. fetching creator of this event from the db..',
        );

        const creator = await getDocument('Users', event.creator_uid);

        if (!creator)
          console.warn(
            'Could not find creator of this event, proceeding anyway',
          );
        else {
          console.log('deleting event id from found user in db..');
          let err = await updateFirestoreDocument(
            'Users',
            event.creator_uid,
            'events_posted',
            creator.events_posted.filter(eventID => eventID !== event_id),
          );
          if (err)
            console.warn(
              'Could not remove event id from user in db: ' + event_id,
            );
        }
        console.log('deleting event from db..');
        await deleteDocument('Events', event_id).catch(e => {
          console.warn(
            'Could not delete event from db id: ' +
              event_id +
              ' Error: ' +
              e.message,
          );
          throw new Error('Could not delete event from db id: ' + event_id);
        });
      }

      console.log('deleting related image from storage..');
      await deleteImgHook.deleteImage(event.event_poster);

      if (isIssuerAlsoCreator) {
        console.log('removing event id from account ctx..');

        deleteEventIDFromAccount(event_id, setAccountCtx);
      }
      setSucceeded(true);
    } catch (error) {
      console.warn(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!deleteImgHook.error) return;
    console.warn('Could not delete event poster ' + deleteImgHook.error);
  }, [deleteImgHook.error]);

  return {
    error,
    succeeded,
    loading,
    deleteEvent,
    posterDeletedError: deleteImgHook.error,
  };
};

export default useDeleteEvent;
