import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RNSButton from '../../../components/Button';
import { fbImage } from '../../../constants/constants';
import { EVENT_SCHEME } from '../../../constants/firestore-schemes';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import generateUniqueID from '../../../helpers/generate-uid';
import getFriendlyErrorMessage from '../../../helpers/message-from-firebase-error';
import { resolveRole } from '../../../hooks/auth/use-auth-listener';
import useAuthState from '../../../hooks/auth/use-auth-state';
import useCreateDocument from '../../../hooks/firebase/use-create-document';
import useDeleteImage from '../../../hooks/firebase/use-delete-image';
import useImageUpload from '../../../hooks/firebase/use-image-upload';
import useUpdateDocumentField from '../../../hooks/firebase/use-update-document-field';
import useBroadcastPushNotification from '../../../hooks/notifications/use-send-notification';
import { colors, fonts } from '../../../styles';
import {
  blueCaptionText,
  captionTxtTrpYellow,
  flexBoxRow,
  screenPadding,
  smallCaptionTextGray,
  smallTextGray,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import {
  LegalText,
  SubmitButton,
} from '../../admin/newsletter/CreateNewsletter';
import { DividerCaption } from '../../auth/Signin/Signin';
import { LocationForm } from '../../e-commerce/checkout/Checkout';
import SubSectionLayout from '../../home/sections/partials/SubSectionLayout';
import { ModalContext } from '../../provider/ModalProvider';

export const SuccessMessage = ({
  message = '',
  navigation,
  hideButton = false,
  onPressReset = null,
}) => (
  <View
    style={{
      flex: 1,
      paddingTop: 8,
      gap: 10,
      ...screenPadding,
      justifyContent: 'center',
      alignSelf: 'center',
    }}
  >
    {message && (
      <Text
        style={[
          smallTextGray,
          {
            maxWidth: 330,
            fontFamily: fonts.primaryRegular,
            textAlign: 'center',
          },
        ]}
      >
        {message}
      </Text>
    )}
    {!hideButton && (
      <RNSButton
        onPress={() => navigation.navigate('Blogs')}
        bgColor={colors.lightBlue}
        textColor={colors.white}
        bordered
        caption="Zum Newsletter"
      />
    )}
    {typeof onPressReset === 'function' && (
      <SubmitButton
        style={{ backgroundColor: colors.primaryDark, margin: 'auto' }}
        textStyle={{ color: colors.white, fontFamily: fonts.primaryBold }}
        text="Weiteres Event einreichen"
        onPress={onPressReset}
      />
    )}
  </View>
);

const CreateNewEvent = () => {
  const { user, currentUser } = useAuthState();
  const [loading, setLoading] = useState(false);
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const { showModalAlert } = useContext(ModalContext);
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();
  const deleteImgHook = useDeleteImage();
  const { sendAdminNotification } = useBroadcastPushNotification();
  const { updateField, updatedDoc } = useUpdateDocumentField();
  const [newEventProcess, setNewEventProcess] = useState('IDLE');
  const {
    startImageUpload,
    imageUrl,
    isUploading,
    uploadError,
    uploadProgress,
    setImageUrl,
  } = useImageUpload();
  const { createDocument, error, succeeded, setSucceeded } =
    useCreateDocument();
  const [event, setEvent] = useState({
    description: '',
    title: '',
    user: user,
    organizer: {},
    poster: '',
    startTime: new Date(new Date().getTime()),
    location: null,
    additionalInfo: '',
  });

  const validate = () => {
    setErrorMsg('');
    if (event.startTime.getTime() <= new Date().getTime()) {
      setErrorMsg(
        'Der Veranstaltungsstart darf nicht in der Vergangenheit liegen.',
      );
      return false;
    }
    for (let key of Object.keys(event)) {
      if (
        (!event[key] && ['title', 'description', 'poster'].includes(key)) ||
        (key === 'location' && !event[key]?.province)
      ) {
        // console.log(event[key], key);
        let msg = `Bitte `;
        switch (key) {
          case 'title':
            msg += 'trage den Veranstaltungsnamen ein.';
            break;
          case 'poster':
            msg += 'füge ein Bild mit ein.';
            break;
          case 'location':
            msg += 'trage bitte mindestens das Bundesland und die Stadt ein.';
            break;

          default:
            msg += 'prüfe das Formular und fülle die Felder vollständig aus.';
            break;
        }
        setErrorMsg(`${msg}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setNewEventProcess('PROCESSING');
    let event_id = `E#${generateUniqueID()}${generateUniqueID()}${generateUniqueID()}`;
    EVENT_SCHEME.creator_uid = accountCtx.uid;
    EVENT_SCHEME.approval.approved = false;
    EVENT_SCHEME.description = event.description;
    EVENT_SCHEME.start_time = event.startTime;
    EVENT_SCHEME.event_id = event_id;
    EVENT_SCHEME.event_poster = event.poster || fbImage;
    EVENT_SCHEME.location = event.location;
    EVENT_SCHEME.name = event.title;
    EVENT_SCHEME.visible = true;
    EVENT_SCHEME.organizer.email =
      accountCtx?.username ||
      accountCtx?.firebase_auth_data?.displayName ||
      'Zusammen Stehen Wir · Nutzer';
    event.additionalInfo &&
      EVENT_SCHEME.event_descriptions.push({
        image: null,
        text: event.additionalInfo,
      });
    EVENT_SCHEME.created_at = new Date().toLocaleString();
    EVENT_SCHEME.created_by = {
      uid: accountCtx?.uid,
      email:
        accountCtx?.username ||
        accountCtx?.firebase_auth_data?.displayName ||
        'Zusammen Stehen Wir · Nutzer',
      username:
        accountCtx?.firebase_auth_data?.displayName ||
        accountCtx?.username ||
        'Zusammen Stehen Wir · Nutzer',
      displayName:
        accountCtx?.firebase_auth_data?.displayName ||
        accountCtx?.username ||
        'Zusammen Stehen Wir · Nutzer',
      joined_since: accountCtx?.firebase_auth_data?.createdAt || null,
      last_seen: accountCtx?.firebase_auth_data?.lastLoginAt || null,
      photoURL: accountCtx?.firebase_auth_data?.photoURL || null,
    };
    await createDocument('Events', event_id, EVENT_SCHEME);
    setAccountCtx(prev => ({
      ...prev,
      events_posted: [...accountCtx.events_posted, event_id],
    }));

    setLoading(false);
  };

  const resetForm = () => {
    setSucceeded(false); // reset the create doc hook
    setEvent({
      // clears form
      description: '',
      title: '',
      user: user,
      organizer: {},
      poster: '',
      startTime: new Date(new Date().toDateString()),
      location: null,
      additionalInfo: '',
    });
    setImageUrl(''); // clears last uploaded image
    setNewEventProcess('IDLE'); // resets the general processing state
    setErrorMsg(''); // rests the form errors
  };

  useEffect(() => {
    if (succeeded) {
      (async function () {
        const role = await resolveRole(accountCtx.uid);
        if (role === 'user') {
          await sendAdminNotification({
            imageUrl: event.poster,
            body: `Ein neues Event würde zur Prüfung eingereicht.\n${event.title}`,
            data: {
              type: 'admin',
              targetScreen: 'Home',
            },
          });
        }
        setNewEventProcess('COMPLETED');
      })();
    }
  }, [succeeded]);

  useEffect(() => {
    if (user && !event.user) setEvent(p => ({ ...p, user: user }));
  }, [user, event.user]);

  useEffect(() => {
    if (imageUrl && !event.poster) setEvent(p => ({ ...p, poster: imageUrl }));
  }, [imageUrl, event.poster]);

  useEffect(() => {
    if (errorMsg) {
      showModalAlert(errorMsg);
    }
  }, [errorMsg]);

  return (
    <View style={{ width: '100%' }}>
      <SubSectionLayout
        title={
          newEventProcess !== 'COMPLETED'
            ? 'Veranstaltung einreichen'
            : 'Event wurde eingereicht.'
        }
        subTitle={
          newEventProcess !== 'COMPLETED'
            ? 'Reiche ein neues Event ein und teile es mit der Community.'
            : 'Die Veranstaltung wird schnellstmöglich geprüft.'
        }
      >
        {newEventProcess !== 'COMPLETED' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {/* Start Time */}
            <View
              style={{
                ...screenPadding,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DividerCaption caption={'Startzeit Event'} />
              <View
                style={{
                  width: '100%',
                  gap: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={[
                    blueCaptionText,
                    { textAlign: 'center', color: colors.bluish },
                  ]}
                >
                  {event.startTime.toLocaleDateString()} um{' '}
                  {[
                    event.startTime.toLocaleTimeString().split(':')[0],
                    event.startTime.toLocaleTimeString().split(':')[1],
                  ].join(':')}{' '}
                  Uhr
                </Text>
                <DatePicker
                  is24hourSource="locale"
                  minimumDate={new Date(Date())}
                  mode="datetime"
                  locale="de"
                  date={event.startTime}
                  onDateChange={date =>
                    setEvent(prev => ({ ...prev, startTime: date }))
                  }
                  buttonColor={colors.primaryDark}
                  dividerColor={colors.primaryDark}
                  theme="dark"
                  maximumDate={new Date('2029-01-01')}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              {/* Event Information */}
              <DividerCaption caption={'Allgemeine Inforationen'} />
              <TextInput
                style={[styles.input, styles.flex]}
                placeholder="Veranstaltungsname"
                placeholderTextColor="#9b9b9b"
                multiline={true}
                onChangeText={text =>
                  setEvent(pre => ({ ...pre, title: text }))
                }
              />
              <TextInput
                onChangeText={text =>
                  setEvent(pre => ({ ...pre, description: text }))
                }
                style={[styles.input, styles.flex]}
                multiline={true}
                placeholder="Beschreibung"
                placeholderTextColor="#9b9b9b"
              />

              {/* Image Upload */}
              <TouchableOpacity
                onPress={() => startImageUpload(`/public/events/${user?.uid}/`)}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    ...styles.input,
                    paddingVertical: 10,
                  }}
                >
                  {!imageUrl && !isUploading ? (
                    <Text
                      style={[
                        {
                          verticalAlign: 'middle',
                          margin: 'auto',
                          fontSize: getFontSize(15),
                          lineHeight: 16,
                          color: colors.lightGray,
                        },
                      ]}
                    >
                      Bild hochladen
                    </Text>
                  ) : isUploading ? (
                    <ActivityIndicator size={'small'} color={colors.bluish} />
                  ) : imageUrl && !uploadError ? (
                    <View
                      style={[
                        flexBoxRow,
                        {
                          gap: 30,
                        },
                      ]}
                    >
                      <Image
                        src={imageUrl}
                        style={{
                          width: 120,
                          height: 80,
                          borderRadius: 10,
                          objectFit: 'cover',
                        }}
                      />
                      <Pressable
                        onPress={async () => {
                          await deleteImgHook.deleteImage(imageUrl);
                          setImageUrl('');
                          setEvent(p => ({ ...p, poster: '' }));
                        }}
                      >
                        <Text
                          style={[
                            smallCaptionTextGray,
                            {
                              padding: 5,
                              color: colors.lightGray,
                              fontWeight: '500',
                              fontSize: getFontSize(16),
                            },
                          ]}
                        >
                          {'Löschen'}
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    uploadError && (
                      <Text style={captionTxtTrpYellow}>
                        {getFriendlyErrorMessage(uploadError)}
                      </Text>
                    )
                  )}
                </View>
              </TouchableOpacity>

              {/* Location */}
              <DividerCaption caption={'Veranstaltungsort'} />

              <LocationForm
                onChangeLocation={locationState =>
                  locationState &&
                  setEvent(prev => ({ ...prev, location: locationState }))
                }
              />
              {/* Additional Info */}

              <DividerCaption caption={'Zusätzliche Informationen'} />

              <TextInput
                multiline={true}
                placeholderTextColor="#9b9b9b"
                style={[styles.input, styles.textField]}
                onChangeText={text =>
                  setEvent(p => ({ ...p, additionalInfo: text }))
                }
              />
              {errorMsg && (
                <Text
                  style={[
                    captionTxtTrpYellow,
                    { textAlign: 'center', padding: 5 },
                  ]}
                >
                  {errorMsg}
                </Text>
              )}
              {/* Buttons */}
              <View
                style={[
                  {
                    gap: 10,
                  },
                ]}
              >
                <LegalText />

                <View
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <RNSButton
                    secondary
                    onPress={() => !loading && handleSubmit()}
                    bgColor={colors.primaryGradientStart}
                    textColor={colors.primaryDark}
                    caption="Einreichen"
                    loading={newEventProcess === 'PROCESSING'}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <SuccessMessage
            navigation={navigation}
            hideButton={true}
            onPressReset={resetForm}
          />
        )}
      </SubSectionLayout>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    maxWidth: 600,
  },
  input: {
    backgroundColor: colors.primary,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: colors.bluish,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: getFontSize(16),
    lineHeight: 20,
    height: 'auto', // Damit das Textfeld dynamisch wächst
    paddingVertical: 9,
  },
  textField: {
    height: 'auto', // Damit das Textfeld dynamisch wächst
    minHeight: 40, // Mindesthöhe des Textfelds (optional)
    fontFamily: fonts.primarySemiBold,
    fontSize: getFontSize(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
});

export default CreateNewEvent;
