import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useGetDocument from '../../../hooks/firebase/use-get-document';
import useUpdateDocumentField from '../../../hooks/firebase/use-update-document-field';
import { useToastNotify } from '../../../hooks/screen/use-toast-notification';
import useDeleteEvent from '../../../hooks/workflows/use-delete-event';
import { colors, fonts, width } from '../../../styles';
import {
  captionTxtTrpYellow,
  mediumHeadlineText,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import { ModalContext } from '../../provider/ModalProvider';
import { deleteEventIDFromAccount } from '../profile/sections/PostedEvents';

const EventCard = ({ event_id, onDelete }) => {
  const { documentData, error, getDocument, loading } = useGetDocument();
  const delEvent = useDeleteEvent();
  const { showToastNotification } = useToastNotify();
  const { showModalConfirmation } = useContext(ModalContext);
  const updateDocHook = useUpdateDocumentField();
  const { updateField } = updateDocHook;
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (menuOpen !== menuVisible) setMenuVisible(menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    if (!event_id) throw new Error('Event_ID is undef!');
    if (!documentData && !loading) {
      getDocument({
        collectionPath: 'Events',
        document_id: event_id,
      });
    }
  }, [documentData]);

  useEffect(() => {
    // removes the event id from the user in case the event id could not be resolved from firestore
    if (error) {
      if (error.includes('Dokument existiert nicht')) {
        /* showToastNotification({
          msg: 'Eines deiner veröffentlichten Events konnte nicht geladen werden',
          duration: 3000 * 2,
          placement: 'bottom',
          type: 'warning',
        });
        */
        onDelete(event_id);
      }
    }
  }, [error]);

  //* delete event
  useEffect(() => {
    if (!delEvent.error) return;
    showToastNotification({
      msg: 'Event konnte nicht gelöscht werden',
      type: 'warning',
    });
  }, [delEvent.error]);

  useEffect(() => {
    if (!delEvent.succeeded) return;
    showToastNotification({
      msg: 'Event wurde gelöscht',
    });
    deleteEventIDFromAccount(event_id, setAccountCtx);
  }, [delEvent.succeeded]);

  if (!documentData || !documentData.approval.approved || documentData.deleted)
    return null;

  return (
    <Pressable
      onPress={() => navigation.navigate('Single Event', { event_id })}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: documentData.event_poster }}
          style={styles.image}
        />
        <View style={[styles.header, { paddingBottom: 0 }]}>
          <Text
            numberOfLines={1}
            style={[
              mediumHeadlineText,
              {
                fontSize: getFontSize(18),
                marginBottom: 0,
                lineHeight: 22,
                paddingRight: 10,
              },
            ]}
          >
            {documentData.name}
          </Text>

          <TouchableWithoutFeedback
            onPress={() =>
              showModalConfirmation(
                'Achtung!',
                'Willst du Wirklich das Event löschen?\nDiese Aktion kann nicht rückgängig gemacht werden.',
                () => delEvent.deleteEvent({ event_id }),
                () => {},
              )
            }
          >
            <MaterialCommunityIcons
              name="delete"
              size={25}
              color={colors.brightRed + 'fe'}
              style={{
                opacity: 1,
                position: 'absolute',
                top: -109,
                right: -8,
                backgroundColor: colors.primary,
                borderRadius: 10,
                padding: 6,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text style={styles.dateText}>
            {documentData.start_time
              ? `${new Date(
                  documentData.start_time.seconds * 1000,
                ).toLocaleDateString()} um ${new Date(
                  documentData.start_time.seconds * 1000,
                ).toLocaleTimeString()}`
              : '2024'}
          </Text>

          <Text
            style={[
              captionTxtTrpYellow,
              { opacity: 0.7, fontSize: getFontSize(14) },
            ]}
          >
            {documentData.location.province}
          </Text>
        </View>

        <View style={styles.details}>
          {documentData.views ? (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {`${
                  documentData.views === 1
                    ? documentData.views + ' Aufruf'
                    : documentData.views + ' Aufrufe'
                }`}
              </Text>
            </View>
          ) : null}
          {documentData.event_commitments?.length ? (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {documentData.event_commitments.length < 2
                  ? '1 Zusage'
                  : documentData.event_commitments.length + ' Zusagen'}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width * 0.8,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
    borderRadius: 5,
    margin: 5,
    maxWidth: 500,
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dateText: {
    fontSize: getFontSize(15),
    opacity: 0.8,
    color: colors.lightBlue,
    fontFamily: fonts.primarySemiBold,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: getFontSize(14),
    fontWeight: '600',
    color: colors.bluish,
    fontFamily: fonts.primarySemiBold,
  },
  contentContainer: {
    padding: 10,
  },
});
export default EventCard;
