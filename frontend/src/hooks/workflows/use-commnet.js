import { useContext, useState } from 'react';
import { AccountContext } from '../../modules/AppView';
import updateFirestoreDocument from '../../functions/firestore/update-document-field-async';
import getDocument from '../../functions/firestore/get-document-async';
import generateUniqueID from '../../helpers/generate-uid';
import { COMMENT } from '../../constants/firestore-schemes';
import writeDocument from '../../functions/firestore/write-document-async';
const COLLECTION_TYPE_REFS = {
  event: 'Events',
  article: 'Newsletter',
};

const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [accountCtx] = useContext(AccountContext);

  const resetStates = () => {
    setError(null);
    setSucceeded(false);
  };
  const handleException = err => {
    console.error('failed to execute comment workflow', err);
    setError(err);
    setLoading(false);
  };
  /**
   *
   * @prop {comment: string} submitted comment as string
   * @prop {contentType: string} ['event', 'article'] one of those type are valid
   * @prop {contentID: string} the id of the commented content
   * @returns {Promise}
   */
  const submitComment = async ({
    comment = '',
    contentType = '',
    contentID = '',
  }) => {
    resetStates();
    // prettier-ignore
    if ((!comment || !contentType || !contentID) || !COLLECTION_TYPE_REFS[contentType]) {
            let errMsg = 
            !COLLECTION_TYPE_REFS[contentType] && contentType ? 'the provided contentType value is invalid! ' + contentType
            : 'got missing params for creating comment!'
            return handleException(errMsg)  
    }
    setLoading(true);
    try {
      console.log('fetching content from db..');
      const content = await getDocument(
        COLLECTION_TYPE_REFS[contentType],
        contentID,
      );
      if (!content) return handleException('content not found');
      console.log('creating comment dataset for db');
      const commentID = generateUniqueID();
      COMMENT.comment = comment;
      COMMENT.comment_id = commentID;
      COMMENT.content_type = contentType;
      COMMENT.related_content_id = contentID;
      COMMENT.created_by = accountCtx.uid;
      COMMENT.created_at = new Date(new Date().getTime());
      console.log('store comment data in Comments');
      let err = await writeDocument('Comments', commentID, COMMENT, true).catch(
        e => e,
      );
      if (err) return handleException(err);
      console.log('adding comment ref to content data');
      err = await updateFirestoreDocument(
        COLLECTION_TYPE_REFS[contentType],
        contentID,
        'comments',
        Array.isArray(content?.comments)
          ? [...content.comments, commentID]
          : [commentID],
      );
      if (err)
        return handleException(
          'failed to add comment ref to the related content ' + err.message,
        );
      console.log('comment created successfully');
      setLoading(false);
      setSucceeded(true);
    } catch (error) {
      console.log('unexpected error occurred while exec commenting workflow.');
      handleException(error.message);
    }
  };

  return {
    loading,
    succeeded,
    error,
    submitComment,
  };
};

export default useComment;
