/* eslint-disable no-undef */
import { useEffect } from 'react';
import getDocument from '../../functions/firestore/get-document-async';

const useRerunCallbackOnDisconnect = (
  callBack = function () {},
  refreshAfter = 3000,
  dependency,
) => {
  useEffect(() => {
    if (!dependency) return;
    if (error.toLowerCase().includes('offline') && !documentData) {
      setTimeout(
        () =>
          getDocument({
            collectionPath: 'Promotions',
            document_id: 'main_promotion',
          }),
        1000 * 5,
      );
    }
  }, [dependency]);
};
