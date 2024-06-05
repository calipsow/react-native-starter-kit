import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { AccountContext } from '../../modules/AppView';
import { colors, fonts } from '../../styles';
import { isEqual } from 'lodash';
import getFontSize from '../../functions/ui/resolve-relative-font-size';

const useEventCommitment = (
  event_id,
  sendSingleNotification = async function ({ body, data, token, title }) {},
) => {
  const db = getFirestore(); // Firestore-Datenbank
  const [hasCommitted, setHasCommitted] = useState(null); // State, der angibt, ob der Benutzer bereits zugesagt hat
  const [totalCommitments, setTotalCommitments] = useState(null);
  const [error, setError] = useState(null);
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const [previousCommitmentState, setPreviousCommitmentState] = useState(null);
  const [event, setEvent] = useState(null);

  const sendPushToPublisher = async () => {
    const eventDoc = doc(db, 'Notification_Tokens', event.creator_uid); // Dokument für die Veranstaltung
    const docSnapshot = await getDoc(eventDoc);
    if (docSnapshot.exists()) {
      const token = docSnapshot.data().token;
      console.log('found notification token of the publisher', token);

      await sendSingleNotification({
        body: `${accountCtx.username} hat zu deinem Event zugesagt.`,
        data: {
          type: 'event',
          params: {
            event_id,
          },
          targetScreen: 'Single Event',
        },
        token: token,
        sendToUserUID: event.creator_uid,
        title: `Es gibt einen neuen Teilnehmer für die Veranstaltung ${event.name}`,
      });
    } else {
      console.log(
        'No push notification token found to notify the creator about the commitment',
      );
    }
  };

  useEffect(() => {
    if (typeof sendSingleNotification !== 'function') return;
    if (previousCommitmentState === null && typeof hasCommitted === 'boolean') {
      // sets the initial state to the previous one without take action
      setPreviousCommitmentState(hasCommitted);
      return;
    }

    if (previousCommitmentState === false && hasCommitted === true) {
      console.log('Sending push notification to the publisher');
      // the user has new committed to the event
      sendPushToPublisher().finally(() => {
        setPreviousCommitmentState(hasCommitted);
      });
    } else {
      console.log('not push notification to the publisher');
      // user has undo his commitment
      setPreviousCommitmentState(hasCommitted);
    }
  }, [hasCommitted]);

  // Effekt zum Überprüfen, ob der Benutzer bereits zugesagt hat
  useEffect(() => {
    const checkCommitment = async () => {
      const eventDoc = doc(db, 'Events', event_id); // Dokument für die Veranstaltung
      const docSnapshot = await getDoc(eventDoc);

      if (docSnapshot.exists()) {
        const commitments = docSnapshot.data().event_commitments || [];
        if (!Array.isArray(commitments))
          throw new Error(
            'invalid field value resolved in useEventCommitment hook on field event_commitments' +
              ' event_id ' +
              event_id,
          );
        setEvent(docSnapshot.data());
        setTotalCommitments(commitments.length);
        setHasCommitted(commitments.includes(accountCtx.uid));
      } else {
        console.warn(`Dokument für Event ID ${event_id} existiert nicht.`);
        setError(`Dokument für Event ID ${event_id} existiert nicht.`);
      }
    };

    if (accountCtx && event_id) {
      checkCommitment();
    }
  }, [accountCtx, event_id]);

  // Funktion zum Umschalten der Zusage
  const toggleCommitment = async () => {
    const eventDoc = doc(db, 'Events', event_id);

    if (!hasCommitted) {
      await updateDoc(eventDoc, {
        event_commitments: arrayUnion(accountCtx.uid),
      });
      setHasCommitted(true);
      setAccountCtx(previous => ({
        ...previous,
        event_commitments: [...previous.event_commitments, event_id],
      }));
      setTotalCommitments(totalCommitments + 1);
    } else {
      await updateDoc(eventDoc, {
        event_commitments: arrayRemove(accountCtx.uid),
      });
      setHasCommitted(false);
      setAccountCtx(previous => ({
        ...previous,
        event_commitments: previous.event_commitments.filter(
          eventID => eventID !== event_id,
        ),
      }));
      setTotalCommitments(totalCommitments - 1);
    }
  };

  // Komponenten-Button für Zusagen
  const CommitmentButton = () => (
    <View>
      {typeof hasCommitted === 'boolean' ? (
        <TouchableOpacity
          style={[
            styles.commitmentButton,
            {
              backgroundColor: hasCommitted
                ? colors.darkRed + 'd0'
                : colors.primaryDark,
            },
          ]}
          onPress={toggleCommitment}
        >
          <Text
            style={[
              styles.buttonText,
              { fontFamily: fonts.primaryBold, fontSize: getFontSize(18) },
            ]}
          >
            {hasCommitted ? 'Absagen' : 'Zusagen'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return {
    hasCommitted,
    toggleCommitment,
    CommitmentButton,
    totalCommitments,
    error,
  };
};

const styles = StyleSheet.create({
  commitmentButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: 300,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default useEventCommitment;
