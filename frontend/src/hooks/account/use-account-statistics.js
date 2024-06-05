import { useEffect, useState } from 'react';
import useGetDocument from '../firebase/use-get-document';
import useFetchPublicUserData from '../firebase/use-fetch-public-user-data';
import updateFirestoreDocument from '../../functions/firestore/update-document-field-async';
import getDocument from '../../functions/firestore/get-document-async';
import resolveDateObjectFromStr from '../../helpers/resolve-date-from-string';
import calculate30DayUserScores from '../../functions/calculations/calculate-user-scores';

const useAccountStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const userInfoHook = useFetchPublicUserData();
  const getUserDocHook = useGetDocument();
  const [preparedEventData, setPreparedEventData] = useState(null);
  const [accountScores, setAccountScores] = useState(null);

  const resetStates = () => {
    setStatistics(null);
    setError(null);
    setPreparedEventData(null);
    getUserDocHook.setDocumentData(null);
    userInfoHook.setUserData(null);
  };

  const resolveAccountStatistics = async user_uid => {
    if (!user_uid) return;
    setIsProcessing(true);
    resetStates();
    if (!userInfoHook.userData && !userInfoHook.loadingUser) {
      userInfoHook.fetchUserData(user_uid);
    }
    if (!getUserDocHook.documentData && !getUserDocHook.loading) {
      getUserDocHook.getDocument({
        collectionPath: 'Users',
        document_id: user_uid,
      });
    }
  };

  const resolve_prepared_dataset = async events_posted => {
    const event_datasets = [];
    for (const event_id of events_posted) {
      let preparedData = {};
      const event = await getDocument('Events', event_id);
      if (!event) continue;
      const { created_at, event_clicked_by } = event;
      /*console.log(
        ` ${new Date(formatTimeStrungToIso8601(created_at)).getTime()}`,
      );*/
      if (!event_clicked_by) {
        console.log(
          'event_clicked_by property is missing adding an empty array to the event',
        );
        await updateFirestoreDocument(
          'Events',
          event_id,
          'event_clicked_by',
          [],
        );
      }

      if (!created_at) {
        console.log('adding missing created at timestamp to event', event_id);
        let t_string = new Date('1.1.2024').toLocaleString();
        await updateFirestoreDocument(
          'Events',
          event_id,
          'created_at',
          t_string,
        );
      }
      if (!Array.isArray(event.event_commitments))
        console.log(
          'no valid event_commitments field found in event',
          event_id,
          event.event_commitments,
        );
      preparedData = {
        event_clicked_by: event_clicked_by || [],
        // prettier-ignore
        created_at: typeof created_at === "object" && created_at?.seconds ? (created_at?.seconds * 1000) : resolveDateObjectFromStr(created_at).getTime(),
        commitments: Array.isArray(event.event_commitments)
          ? event.event_commitments.length
          : 0,
      };
      event_datasets.push(preparedData);
    }
    setPreparedEventData(event_datasets);
  };

  const processEvents = async events_posted => {
    let posted_event_count = 0,
      event_views_overall = 0,
      event_commitments_overall = 0;
    for (let i = 0; i < events_posted.length; i++) {
      const event_id = events_posted[i];
      const event = await getDocument('Events', event_id);
      if (!event) {
        console.warn(
          'found an event id that does not exist anymore in db',
          event_id,
        );
        console.log('updating Statistiken and removing the event id', event_id);
        await updateFirestoreDocument(
          'Users',
          accountData.uid,
          'events_posted',
          events_posted.filter(ev_id => ev_id !== event_id),
        );
        continue; // Weiter zur nächsten Iteration
      }

      posted_event_count++;

      const { views, event_commitments } = event;

      if (typeof views !== 'number') {
        console.log('adding missing field value views to event', event_id);
        await updateFirestoreDocument('Events', event_id, 'views', 0);
      }

      if (!Array.isArray(event_commitments)) {
        console.log(
          'adding missing field value event_commitments to event',
          event_id,
        );
        await updateFirestoreDocument(
          'Events',
          event_id,
          'event_commitments',
          [],
        );
      }

      if (typeof views === 'number') {
        event_views_overall += views;
      }

      if (Array.isArray(event_commitments)) {
        event_commitments_overall += event_commitments.length;
      }
    }

    setStatistics({
      posted_events: posted_event_count,
      event_views_overall: event_views_overall,
      event_commitments_overall: event_commitments_overall,
    });
  };

  const fetchOverallStatistics = async () => {
    const { events_posted } = accountData;
    if (!Array.isArray(events_posted))
      return console.error(
        'got invalid user data events posted prop is missing!',
      );
    await resolve_prepared_dataset(events_posted);
    await processEvents(events_posted);
  };

  const getOverAllScores = () => {
    const { event_commitments_overall, event_views_overall } = statistics;
    const { ACTIVITY_SCORE, COMMITMENT_SCORE, COMMITMENTS_PER_CLICK_SCORE } =
      calculate30DayUserScores(
        event_views_overall,
        event_commitments_overall,
        preparedEventData,
      );
    console.log(`
    ACTIVITY_SCORE: ${ACTIVITY_SCORE}
    COMMITMENT_SCORE: ${COMMITMENT_SCORE}
    COMMITMENTS_PER_CLICK_SCORE: ${COMMITMENTS_PER_CLICK_SCORE}
        `);
    setAccountScores({
      ACTIVITY_SCORE,
      COMMITMENT_SCORE,
      COMMITMENTS_PER_CLICK_SCORE,
    });
    setIsProcessing(false);
  };

  useEffect(() => {
    if (userInfoHook.userData && getUserDocHook.documentData) {
      setAccountData({
        ...getUserDocHook.documentData,
        ...userInfoHook.userData,
      });
    }
  }, [userInfoHook.userData, getUserDocHook.documentData]);

  useEffect(() => {
    if (accountData) {
      // console.log(accountData);
      fetchOverallStatistics();
    }
  }, [accountData]);

  useEffect(() => {
    if (statistics && preparedEventData) {
      getOverAllScores();
    }
  }, [statistics, preparedEventData]);

  return {
    resolveAccountStatistics,
    statistics,
    accountScores,
    isProcessing,
    error,
    accountData,
  };
};

export default useAccountStatistics;
