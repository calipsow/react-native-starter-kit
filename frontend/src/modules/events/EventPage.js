import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fbImage } from '../../constants/constants';
import updateFirestoreDocument from '../../functions/firestore/update-document-field-async';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import { formatNumberShort } from '../../helpers/format-int-short-string';
import isPastInGermany from '../../helpers/is-past-timestamp';
import { resolveAdminAccessLevel } from '../../hooks/auth/use-auth-listener';
import useFetchPublicUserData from '../../hooks/firebase/use-fetch-public-user-data';
import useGetDocument from '../../hooks/firebase/use-get-document';
import useBroadcastPushNotification from '../../hooks/notifications/use-send-notification';
import { useToastNotify } from '../../hooks/screen/use-toast-notification';
import { useImageDimensionsDynamic } from '../../hooks/utilities/use-size-from-sourced-image';
import useDeleteEvent from '../../hooks/workflows/use-delete-event';
import useEventCommitment from '../../hooks/workflows/use-event-commitment';
import { colors, fonts, width } from '../../styles';
import {
  appThemeColor,
  blueCaptionText,
  bodyTextRegular,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import { AccountContext } from '../AppView';
import { SubmitButton } from '../../components/SubmitButton';
import ScreenWrapper from '../app/ScreenWrapper';
import { AccountMeta } from '../../components/FeedPost';
import { AccountMetaLoader } from '../../components/AccountMetaLoader';
import { ModalContext } from '../provider/ModalProvider';
import getDocument from '../../functions/firestore/get-document-async';
import { isEqual } from 'lodash';

export const SocialInteractionBadge = ({
  icon = () => <></>,
  captionTxt = '',
  count = 0,
  countCaptionVariants = ['singular', 'plural'],
  containerStyles = {},
  textStylesCount = {},
  textStylesCaption = {},
}) => {
  return (
    <View
      style={[
        flexBoxRow,
        {
          alignItems: 'center',
          marginHorizontal: 0,
          columnGap: 4,
          opacity: 0.8,
          fontFamily: fonts.primaryBold,
        },
        containerStyles,
      ]}
    >
      {icon()}
      <Text
        numberOfLines={1}
        style={[
          styles.footerText,
          {
            fontSize: getFontSize(16),
            fontWeight: 'bold',
            fontFamily: fonts.primaryBold,
          },
          textStylesCount,
        ]}
      >{`${formatNumberShort(count)}`}</Text>

      <Text
        numberOfLines={1}
        style={[
          styles.footerText,
          {
            color: colors.white,
            fontSize: getFontSize(16),
            lineHeight: 16,
            fontWeight: '600',
          },
          textStylesCaption,
        ]}
      >
        {captionTxt
          ? captionTxt
          : count === 1
          ? countCaptionVariants[0]
          : countCaptionVariants[1]}
      </Text>
    </View>
  );
};

const SingleEventView = ({ navigation, route }) => {
  const [accessLvl, setAccessLvl] = useState(null);
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const delEvent = useDeleteEvent();
  const { sendSingleNotification, succeed } = useBroadcastPushNotification();
  const { event_id } = route.params;
  const { CommitmentButton, hasCommitted, totalCommitments } =
    useEventCommitment(event_id, sendSingleNotification);
  const fetchContent = useGetDocument();
  const [buttonDimension, setDimension] = useState(null);
  const { getImageDimensions, relativeHeight, error } =
    useImageDimensionsDynamic();
  const { fetchUserData, userData, loadingUser } = useFetchPublicUserData();
  const [_poster, setPoster] = useState(null);
  const { showModalConfirmation } = useContext(ModalContext);
  const { showToastNotification } = useToastNotify();

  const handleDeletion = () => {
    showModalConfirmation(
      'Achtung!',
      'Möchtest du wirklich dieses Event löschen? Diese Aktion ist irreversibel.',
      () => delEvent.deleteEvent({ event_id }),
    );
  };

  //* adds the viewing account uid to the event clicked by items on the event data
  useEffect(() => {
    if (!fetchContent.documentData) return;
    console.log('Checking document Event Clicked By..');
    let { creator_uid, event_clicked_by } = fetchContent.documentData;

    // Log initial fetched values
    console.log('Loaded data from document:', {
      creator_uid,
      event_clicked_by,
    });

    const loadedData = event_clicked_by;

    if (creator_uid === accountCtx.uid) {
      console.log('Creator is the current user, no action needed.');
      return;
    }

    if (!Array.isArray(event_clicked_by)) {
      console.log(
        'event_clicked_by is not an array, initializing with current user UID.',
      );
      event_clicked_by = [accountCtx.uid];
    } else if (!event_clicked_by.includes(accountCtx.uid)) {
      console.log(
        'Current user UID not found in event_clicked_by, adding UID.',
      );
      event_clicked_by = [...event_clicked_by, accountCtx.uid];
    }

    if (!isEqual(loadedData, event_clicked_by)) {
      console.log(
        'Updating Firestore document with new event_clicked_by data:',
        event_clicked_by,
      );
      updateFirestoreDocument(
        'Events',
        event_id,
        'event_clicked_by',
        event_clicked_by,
      );
    } else {
      console.log(
        'No changes detected in event_clicked_by, no update required.',
      );
    }
  }, [fetchContent.documentData]);

  //* checks if the user behind the creator uid of the event actually has the event in there account linked
  useEffect(() => {
    if (!fetchContent.documentData) return;
    (async () => {
      const creator = await getDocument(
        'Users',
        fetchContent.documentData.creator_uid,
      );
      if (!creator) return;
      const { events_posted } = creator;
      if (!events_posted || !Array.isArray(events_posted)) {
        console.log('adding missing field path events_posted to user');
        return await updateFirestoreDocument(
          'Users',
          fetchContent.documentData.creator_uid,
          'events_posted',
          [],
        );
      }
      if (!events_posted.includes(event_id)) {
        console.log('adding missing event id to the creator..');
        await updateFirestoreDocument(
          'Users',
          fetchContent.documentData.creator_uid,
          'events_posted',
          [...events_posted, event_id],
        );
        return;
      }
    })();
  }, [fetchContent.documentData]);

  useEffect(() => {
    // gets image dimensions and creator data if the doc is loaded
    if (!fetchContent.documentData) return;
    if (fetchContent.documentData.event_poster) {
      getImageDimensions(fetchContent.documentData.event_poster, width);
    }
    if (fetchContent.documentData.creator_uid) {
      fetchUserData(fetchContent.documentData.creator_uid);
    }
  }, [fetchContent.documentData]);

  useEffect(() => {
    // initial loading
    if (fetchContent.documentData) return;

    fetchContent.getDocument({
      collectionPath: 'Events',
      document_id: event_id,
    });
    resolveAdminAccessLevel(accountCtx.uid).then(permission => {
      setAccessLvl(permission);
    });
  }, [fetchContent.documentData]);

  useEffect(() => {
    if (fetchContent.error.includes('client is offline')) {
      fetchContent.getDocument({
        collectionPath: 'Events',
        document_id: event_id,
      });
      resolveAdminAccessLevel(accountCtx.uid).then(permission => {
        setAccessLvl(permission);
      });
    } else fetchContent.error && console.warn(fetchContent.error);
  }, [fetchContent.error]);

  //* updating the views if the content is loaded
  useEffect(() => {
    if (fetchContent.documentData && userData && relativeHeight) {
      updateFirestoreDocument(
        'Events',
        event_id,
        'views',
        typeof fetchContent.documentData.views === 'number'
          ? fetchContent.documentData.views + 1
          : 1,
      );
    }
  }, [fetchContent.documentData, userData, relativeHeight]);

  //* callback if the deletion is successful
  useEffect(() => {
    if ((accessLvl !== 'full' && accessLvl !== 'event') || !delEvent.succeeded)
      return;
    showToastNotification({ msg: 'Das Event wurde gelöscht' });
    // setTimeout(() => navigation.goBack(), 15000);
  }, [delEvent.succeeded]);

  if (delEvent.loading)
    return (
      <ScreenWrapper>
        <>
          <ActivityIndicator
            size={'small'}
            style={{ margin: 'auto', paddingBottom: 5 }}
            color={colors.bluish}
          />
          <Text
            style={[
              mediumHeadlineText,
              { margin: 'auto', textAlign: 'center' },
            ]}
          >
            Lösche Event..
          </Text>
        </>
      </ScreenWrapper>
    );

  if (delEvent.succeeded)
    return (
      <ScreenWrapper>
        <>
          <Text
            style={[
              mediumHeadlineText,
              { margin: 'auto', textAlign: 'center', paddingBottom: 20 },
            ]}
          >
            {'Event wurde gelöscht.'}
          </Text>
          <SubmitButton
            style={{ margin: 'auto' }}
            text="Zurück"
            onPress={() => navigation.goBack()}
          />
        </>
      </ScreenWrapper>
    );

  if (!fetchContent.documentData || !userData || (!relativeHeight && !error))
    return (
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        {!fetchContent.error ? (
          <ActivityIndicator
            style={{ margin: 'auto' }}
            size={'large'}
            color={colors.bluish}
          />
        ) : (
          <Text
            style={[
              mediumHeadlineText,
              { margin: 'auto', textAlign: 'center' },
            ]}
          >
            Das Event wurde nicht gefunden. Möglicherweise wurde dieses
            entfernt.
          </Text>
        )}
      </View>
    );

  return (
    <View style={[styles.container, { paddingBottom: 10, paddingTop: 10 }]}>
      <View style={{ ...screenPadding }}>
        {userData ? (
          <AccountMeta
            containerStyles={{ paddingTop: 0, paddingBottom: 10 }}
            userData={userData}
            type="Event"
            captionText={`Deutschland · ${fetchContent.documentData?.location?.province.replace(
              fetchContent.documentData?.location?.province[0],
              fetchContent.documentData?.location?.province[0].toUpperCase(),
            )}`}
          />
        ) : (
          <AccountMetaLoader />
        )}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {/* Event Poster */}
          <Image
            source={{
              uri: !error ? fetchContent.documentData.event_poster : fbImage,
            }}
            style={[
              styles.threadImage,
              {
                width: '100%',
                height: width > 1000 ? relativeHeight * 0.65 : relativeHeight,
                objectFit: 'contain',
              },
            ]}
            ActivityIndicator={
              <ActivityIndicator
                size={'small'}
                color={colors.lightBlue}
                style={{ margin: 'auto' }}
              />
            }
            resizeMode="contain"
            onError={e => {
              setPoster(fbImage);
              e.target.onError = null;
            }}
          />
          {/* Event Title */}
          <View
            style={[
              screenPadding,
              {
                paddingBottom: 0,
                opacity: 0.8,
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text
              style={[
                mediumHeadlineText,
                {
                  marginBottom: 0,
                  textAlign: 'center',
                },
              ]}
              numberOfLines={4}
            >
              {fetchContent.documentData.name}
            </Text>
            {/* Veranstaltungsstart  */}
            <Text style={[blueCaptionText]}>
              {fetchContent.documentData.start_time
                ? new Date(fetchContent.documentData.start_time.seconds * 1000)
                    .toLocaleString()
                    .replace(',', ' ab')
                    .split(':')
                    .filter((_, i) => i < 2)
                    .join(':') + ' Uhr'
                : '2024'}
            </Text>
          </View>
          {/* Interaction and Commitments */}
          <View
            style={[
              flexBoxRow,
              {
                columnGap: 12,
                paddingVertical: 8,
                paddingTop: 8,
                ...screenPadding,
                justifyContent: 'center',
              },
            ]}
          >
            {typeof fetchContent.documentData.views === 'number' ? (
              <SocialInteractionBadge
                textStylesCount={{
                  opacity: 1,
                  fontFamily: fonts.primaryBold,
                }}
                textStylesCaption={{
                  color: colors.white,
                  fontFamily: fonts.primaryBold,
                  opacity: 1,
                }}
                containerStyles={{ columnGap: 4 }}
                count={fetchContent.documentData.views}
                countCaptionVariants={['Aufruf', 'Aufrufe']}
                icon={() => <></>}
              />
            ) : null}
            {typeof totalCommitments === 'number' ? (
              <SocialInteractionBadge
                textStylesCount={{
                  opacity: 1,
                  fontFamily: fonts.primaryBold,
                }}
                textStylesCaption={{
                  color: colors.white,
                  fontFamily: fonts.primaryBold,
                  opacity: 1,
                }}
                containerStyles={{ columnGap: 4 }}
                count={totalCommitments}
                countCaptionVariants={['Zusage', 'Zusagen']}
                icon={() => <></>}
              />
            ) : null}
          </View>
          {/* Description, Location and Google Maps Button */}
          <View
            style={{
              ...screenPadding,
              marginTop: 10,
              ...styles.textInput,
              borderWidth: 0,
            }}
          >
            <TextInput
              placeholder=""
              placeholderTextColor="#fff"
              value={`${fetchContent.documentData?.description}`}
              onChangeText={() => {}}
              multiline
              textContentType="addressCityAndState"
              allowFontScaling={false}
              style={[styles.textInput, { marginTop: 10 }, bodyTextRegular]}
              editable={false}
            />

            <View style={[flexBoxRow, { flex: 1, gap: 8, marginTop: 10 }]}>
              <TextInput
                placeholder=""
                placeholderTextColor="#fff"
                value={`${
                  fetchContent.documentData?.location?.street
                    ? fetchContent.documentData?.location?.street + '\n'
                    : ''
                }${
                  fetchContent.documentData?.location?.postCode
                    ? fetchContent.documentData?.location?.postCode + ' '
                    : ''
                }${
                  fetchContent.documentData?.location?.city
                    ? fetchContent.documentData?.location?.city + '\n'
                    : ''
                }${fetchContent.documentData?.location?.province}, Deutschland`}
                onChangeText={() => {}}
                multiline
                textContentType="addressCityAndState"
                allowFontScaling={false}
                style={[
                  styles.textInput,
                  { flex: 0.5, verticalAlign: 'middle' },
                  bodyTextRegular,
                ]}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  // prettier-ignore
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  const { city, province, street, postCode } = fetchContent.documentData?.location;

                  const cleanString = (str = '') => {
                    return encodeURIComponent(
                      `${str}`.trim().replace(/\s+/g, '+'),
                    );
                  };

                  // Erstellt die Google Maps-Such-URL
                  const createGoogleMapsSearchUrl = (
                    city,
                    province,
                    street,
                    postCode,
                  ) => {
                    const country = 'deutschland';
                    const parts = [city, province, street, postCode, country]
                      .filter(part => part) // Entfernt nicht vorhandene Teile
                      .map(part => cleanString(part)) // Säubert und formatiert
                      .join('+'); // Verbindet die Teile

                    return `https://www.google.de/maps/search/${parts}`;
                  };

                  // Öffnet die Google Maps-URL
                  const url = createGoogleMapsSearchUrl(
                    city,
                    province,
                    street,
                    postCode,
                  );
                  Linking.openURL(url);
                }}
                onLayout={event =>
                  !buttonDimension &&
                  setDimension({ ...event.nativeEvent.layout })
                }
                style={[
                  styles.textInput,
                  { flex: 0.5, height: '100%', padding: 0 },
                ]}
              >
                {buttonDimension && (
                  <Image
                    src={
                      'https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Fimages%2Fimage.png?alt=media&token=dc2301c8-1c94-42a4-a30e-ebe2556377fb'
                    }
                    style={{
                      flex: 1,
                      objectFit: 'cover',
                      width: buttonDimension.width,
                      height: buttonDimension.height,
                      borderRadius: 5,
                    }}
                  />
                )}
                {buttonDimension && (
                  <View
                    style={[
                      {
                        position: 'absolute',
                        margin: 'auto',
                        top: 0,
                        left: 0,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        gap: 5,
                      },
                      flexBoxRow,
                    ]}
                  >
                    <FontAwesome
                      name="external-link-square"
                      color={colors.primary}
                      size={20}
                      style={{ margin: 'auto', opacity: 0.84 }}
                    />
                    <Text
                      style={[
                        smallCaptionTextGray,
                        {
                          fontSize: getFontSize(17),
                          color: colors.primary,
                          fontFamily: fonts.primaryBold,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      Maps
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Event commitment button */}
          <View style={{ ...screenPadding, paddingBottom: 30 }}>
            {fetchContent.documentData.start_time &&
            typeof hasCommitted === 'boolean' &&
            !isPastInGermany(
              fetchContent.documentData.start_time.seconds * 1000,
            ) ? (
              <React.Fragment>
                <CommitmentButton />
              </React.Fragment>
            ) : null}
            <Text
              style={[
                smallCaptionTextGray,
                {
                  fontStyle: 'italic',
                  textAlign: 'center',
                  ...screenPadding,
                  paddingTop: 3,
                },
              ]}
            >
              Der auf Google Maps angezeigte Standort, kann vom eigentlichen
              Veranstaltungsort abweichen.
            </Text>
          </View>
          {accessLvl === 'event' || accessLvl === 'full' ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                maxHeight: 80,
              }}
            >
              <SubmitButton
                style={{ margin: 'auto', borderColor: colors.brightRed }}
                textStyle={{ color: colors.lightRed }}
                text="Event Löschen"
                onPress={handleDeletion}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appThemeColor.darkBlue,
    flex: 1,
  },
  userContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center', // Tailwind's items-center
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5, // Tailwind's rounded-full
  },
  userName: {
    color: colors.white, // Tailwind's text-slate-800
    fontSize: getFontSize(14), // Tailwind's text-sm
    fontWeight: '600', // Tailwind's font-semibold
    marginBottom: 0, // Tailwind's mb-0.5
    fontStyle: 'italic',
  },
  postTime: {
    color: colors.lightGray, // Tailwind's text-slate-500
    fontSize: getFontSize(14), // Tailwind's text-xs
    fontStyle: 'italic',
  },
  threadImage: {
    marginBottom: 8,
  },
  body: {
    color: '#1f2937', // Tailwind's text-slate-800
    fontSize: getFontSize(14), // Tailwind's text-sm
    lineHeight: 19, // Tailwind's leading-5
    // Tailwind's mb-5
  },
  textInput: {
    minHeight: 20,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: colors.bluish,
  },
  footerText: {
    color: colors.bluish, // Tailwind's text-slate-400
    fontSize: getFontSize(16), // Tailwind's text-sm
    fontFamily: fonts.primaryRegular,
    opacity: 0.7,
    lineHeight: 16,
  },
});

export default SingleEventView;
