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
import RNSButton from '../../../components/Button';
import Tag from '../../../components/Tag';
import { ARTICLE_SCHEME } from '../../../constants/firestore-schemes';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import generateUniqueID from '../../../helpers/generate-uid';
import getFriendlyErrorMessage from '../../../helpers/message-from-firebase-error';
import { resolveAdminAccessLevel } from '../../../hooks/auth/use-auth-listener';
import useAuthState from '../../../hooks/auth/use-auth-state';
import useCreateDocument from '../../../hooks/firebase/use-create-document';
import useDeleteImage from '../../../hooks/firebase/use-delete-image';
import useImageUpload from '../../../hooks/firebase/use-image-upload';
import useBroadcastPushNotification from '../../../hooks/notifications/use-send-notification';
import useExternalLink from '../../../hooks/utilities/use-external-link';
import useVirusTotal from '../../../hooks/utilities/use-virus-total-check';
import { colors, fonts, width } from '../../../styles';
import {
  bodyTextRegular,
  captionTxtTrpYellow,
  flexBoxRow,
  smallCaptionTextGray,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import { DividerCaption } from '../../auth/Signin/Signin';
import { SuccessMessage } from '../../events/create/CreateEvent';
import SubSectionLayout from '../../home/sections/partials/SubSectionLayout';
import { ModalContext } from '../../provider/ModalProvider';

export const LegalText = () => {
  const navigation = useNavigation();

  return (
    <View style={[flexBoxRow, { flexWrap: 'wrap' }]}>
      <Text
        style={[
          smallCaptionTextGray,
          { fontStyle: 'italic', maxWidth: width - 20 },
        ]}
      >
        Durch das Erstellen und Teilen von Beiträgen stimmst du den geltenden
        AGB&apos;s dieser App zu.
      </Text>
      <Pressable
        onPress={() =>
          navigation.navigate('Settings', {
            screen: 'Rechtliches Dokument',
            params: {
              document_id: 'license',
            },
          })
        }
      >
        <Text style={[{ color: colors.lightBlue }]}>Geschäftsbedingungen</Text>
      </Pressable>
    </View>
  );
};

export const SubmitButton = ({
  onPress = function () {},
  text = '',
  style,
  textStyle,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.input,
          paddingVertical: 8,
          paddingHorizontal: 13,
          borderRadius: 4,
        },
        style && style,
      ]}
    >
      <Text
        style={[
          {
            verticalAlign: 'middle',
            margin: 'auto',
            fontSize: getFontSize(16),
            lineHeight: 16,
            color: colors.bluish,
            opacity: 0.9,
          },
          textStyle && textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export const validateAndSubmitArticle = async ({
  createDocument = async function () {},
  broadcastNotification = async function () {},
  accountCtx = {},
  externalLinks = [],
  newsletter = {},
}) => {
  const creator =
    accountCtx?.username ||
    accountCtx?.firebase_auth_data?.displayName ||
    'Zusammen Stehen Wir · Admin';
  const docID = `A#${generateUniqueID()}${generateUniqueID()}${generateUniqueID()}`;
  ARTICLE_SCHEME.creator_uid = accountCtx.uid;
  ARTICLE_SCHEME.article_id = docID;
  ARTICLE_SCHEME.author =
    accountCtx?.username ||
    accountCtx?.firebase_auth_data?.displayName ||
    'Zusammen Stehen Wir · Official';
  ARTICLE_SCHEME.category = newsletter.category;
  ARTICLE_SCHEME.tags = newsletter.tags;
  ARTICLE_SCHEME.content_sections = [];
  ARTICLE_SCHEME.content_sections.push({
    section_image: null,
    section_title: null,
    section_content: newsletter.content,
  });
  ARTICLE_SCHEME.description = newsletter.description;
  ARTICLE_SCHEME.poster = newsletter.poster;
  ARTICLE_SCHEME.article_title = newsletter.title;
  ARTICLE_SCHEME.pub_date = new Date(new Date().getTime());
  ARTICLE_SCHEME.external_links = externalLinks.length ? externalLinks : null;
  ARTICLE_SCHEME.created_by = {
    uid: accountCtx?.uid || null,
    photoURL: accountCtx?.firebase_auth_data?.photoURL || null,
    displayName: creator,
    email: 'Zusammen Stehen Wir · Admin',
    joined_since: accountCtx?.firebase_auth_data?.createdAt || null,
    last_seen: accountCtx?.firebase_auth_data?.lastLoginAt || null,
    member_since:
      (accountCtx?.firebase_auth_data?.createdAt &&
        parseInt(accountCtx?.firebase_auth_data?.createdAt)) ||
      null,
    username:
      accountCtx?.firebase_auth_data?.displayName ||
      accountCtx?.username ||
      'Administrator',
  };
  console.log('creating doc..');
  await createDocument('Newsletter', docID, ARTICLE_SCHEME);
  console.log('sending notification..');
  await broadcastNotification({
    title: `${
      accountCtx?.username ||
      accountCtx?.firebase_auth_data?.displayName ||
      'Zusammen Stehen Wir'
    } hat ein neuen Beitrag erstellt`,
    body: `${newsletter.title}`,
    imageUrl: newsletter.poster,
    data: {
      type: 'article',
      params: {
        article_id: docID,
      },
      targetScreen: 'Single Article',
    },
  });
  console.log('completes');
};

const CreateNewsletter = () => {
  const { user } = useAuthState();
  const {
    startImageUpload,
    imageUrl,
    isUploading,
    uploadError,
    uploadProgress,
    setImageUrl,
  } = useImageUpload();
  const { createDocument, error, succeeded } = useCreateDocument();
  const [loading, setLoading] = useState(false);
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const { showModalAlert } = useContext(ModalContext);
  const vtHook = useVirusTotal();
  const deleteImgHook = useDeleteImage();
  const extLinkingHook = useExternalLink();
  const notification = useBroadcastPushNotification();
  const [adminAccess, setAdminAccess] = useState(null);

  const fetchAccessRights = async uid => {
    const access = await resolveAdminAccessLevel(uid);
    setAdminAccess(access);
  };

  const [newsletter, setNewsletter] = useState({
    content: '',
    title: '',
    author: '',
    category: '',
    poster: '',
    description: '',
    tags: [],
  });
  const [linkObject, setLinkObj] = useState({ url: '', linkText: '' });
  const [externalLinks, setExternalLinks] = useState([]);
  const [formError, setFormError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (!imageUrl || imageUrl === newsletter.poster) return;
    setNewsletter(prev => ({ ...prev, poster: imageUrl }));
  }, [imageUrl]);

  const handleTags = text => {
    const _tags = text
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
    if (_tags !== newsletter.tags)
      setNewsletter(prev => ({ ...prev, tags: _tags }));
  };

  const handleInput = (text, field) => {
    setNewsletter(prev => ({ ...prev, [field]: text }));
  };

  const validate = () => {
    const { content, title, poster, category } = newsletter;

    if (content && title && poster && category && imageUrl) return true;

    switch (true) {
      case !content:
        setFormError('Inhalt darf nicht leer sein.'); // Fehlermeldung für leeren Inhalt
        return false;

      case !title:
        setFormError('Titel darf nicht leer sein.'); // Fehlermeldung für leeren Titel
        return false;

      case !poster:
        setFormError('Artikel Bild darf nicht leer sein'); // Fehlermeldung für leeres Poster
        return false;

      case !category:
        setFormError('Kategorie muss ausgewählt werden.'); // Fehlermeldung für fehlende Kategorie
        return false;

      case !imageUrl:
        setFormError('Artikel Bild darf nicht leer sein.'); // Fehlermeldung für leere Bild-URL
        return false;

      default:
        setFormError(
          'Etwas ist schiefgelaufen. Bitte überprüfe deine Eingaben.',
        ); // Allgemeiner Fehler
        return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await validateAndSubmitArticle({
      createDocument,
      broadcastNotification: notification.broadcastNotification,
      accountCtx,
      externalLinks,
      newsletter,
    });

    console.log('completes');
    setLoading(false);
  };

  const addExternalLink = async () => {
    // prettier-ignore
    if(Object.keys(linkObject).map(k => linkObject[k]).some( property => property === '')) 
      return showModalAlert('Bitte fülle sowohl das url Feld aus als auch den Link Text vollständig aus.', '');

    if (!extLinkingHook.testLink(linkObject.url))
      return showModalAlert(
        'Überprüfe die eingebende URL. Links müssen mit https:// oder http:// beginnen',
      );
    await vtHook.startURLSecurityLookup(linkObject.url);
  };
  // effect to check if the url is malicious before uploading
  useEffect(() => {
    if (vtHook.apiError) {
      showModalAlert(
        'Ein Fehler ist aufgetreten',
        `Probiere es später nochmal`,
      );
    }
    if (vtHook.virusTotalResult) {
      if (!vtHook.isDangerous) {
        setExternalLinks(prev => [
          ...prev,
          { ...linkObject, nodeID: generateUniqueID() },
        ]);
      } else {
        showModalAlert(
          'Link kann nicht angefügt werden.',
          `Bitte verwende eine andere URL, diese entspricht nicht unseren Richtlinien.`,
        );
      }
      setLinkObj({ url: '', linkText: '' });
    }
  }, [vtHook.virusTotalResult, vtHook.apiError]);

  // callback if the newsletter doc is created successfully
  useEffect(() => {
    if (!succeeded) return;
    setNewsletter({
      content: '',
      title: '',
      author: '',
      category: '',
      poster: '',
      description: '',
      tags: [],
    });
    showModalAlert(
      'Der Beitrag wurde erfolgreich geteilt.',
      'Die Community kann diesen im Zusammen Stehen Wir Blog lesen.',
    );
  }, [succeeded]);

  // fetching for admin access level
  useEffect(() => {
    if (accountCtx && accountCtx?.uid) fetchAccessRights(accountCtx?.uid);
  }, [accountCtx]);

  useEffect(() => {
    if (formError) {
      showModalAlert('Artikel konnte nicht erstellt werden.', formError, () => {
        setFormError('');
      });
    }
  }, [formError]);

  if (adminAccess !== 'full' && adminAccess !== 'article' && adminAccess)
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 150,
        }}
      >
        <Text
          style={[
            bodyTextRegular,
            { margin: 'auto', textAlign: 'center', maxWidth: 320 },
          ]}
        >
          Du hast nicht die erforderlichen Rechte um Artikel zu erstellen und zu
          teilen, bitte wende dich an den App Administrator
        </Text>
      </View>
    );
  return (
    <View style={{ width: '100%' }}>
      {typeof adminAccess === 'string' ? (
        <SubSectionLayout
          title={!succeeded ? 'Beitrag erstellen' : 'Beitrag veröffentlicht 🎉'}
          subTitle={
            error ||
            (uploadError
              ? getFriendlyErrorMessage(uploadError || error)
              : 'Erstelle einen Blogbeitrag.')
          }
        >
          {!succeeded ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <View style={styles.formContainer}>
                <DividerCaption caption="Beitragsinhalt" />

                {/* Title */}

                <TextInput
                  style={[styles.input, styles.flex]}
                  placeholder="Beitragstitel"
                  multiline={true}
                  placeholderTextColor="#9b9b9b"
                  onChangeText={text => handleInput(text, 'title')}
                />
                {/* Description */}

                <TextInput
                  onChangeText={text => handleInput(text, 'description')}
                  style={[styles.input]}
                  multiline={true}
                  placeholder="Kurzbeschreibung"
                  placeholderTextColor="#9b9b9b"
                />
                {/* Tags and Categories */}

                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.flex, { flex: 0.4 }]}
                    placeholder="Kategorie"
                    multiline={true}
                    onChangeText={text => handleInput(text, 'category')}
                    placeholderTextColor="#9b9b9b"
                  />
                  <TextInput
                    style={[styles.input, styles.flex]}
                    multiline={true}
                    placeholder="Tags (mit Komma getrennt)"
                    onChangeText={handleTags}
                    placeholderTextColor="#9b9b9b"
                  />
                </View>
                {/* Image Upload */}
                <TouchableOpacity
                  onPress={() =>
                    startImageUpload(`/public/newsletter/${user?.uid}/`)
                  }
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
                    ) : isUploading || (uploadProgress && !imageUrl) ? (
                      <ActivityIndicator size={'small'} color={colors.bluish} />
                    ) : imageUrl && !uploadError && !isUploading ? (
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
                            if (imageUrl) {
                              await deleteImgHook.deleteImage(imageUrl);
                            }
                            setImageUrl('');
                          }}
                        >
                          <Text
                            style={[
                              smallCaptionTextGray,
                              {
                                padding: 5,
                                color: colors.lightGray,
                                fontWeight: '700',
                                fontSize: getFontSize(16),
                              },
                            ]}
                          >
                            Löschen
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

                {/* Article Text Content Textfield */}
                <TextInput
                  multiline={true}
                  style={[styles.input, styles.textField]}
                  onChangeText={text => handleInput(text, 'content')}
                  placeholder="Inhalt"
                  placeholderTextColor="#9b9b9b"
                />

                {/* External Link Section */}
                <DividerCaption caption="Externe Links" />
                {/* Box to display submitted Links */}
                {externalLinks.length ? (
                  <View
                    style={[
                      flexBoxRow,
                      {
                        gap: 5,
                        flexWrap: 'wrap',
                        marginBottom: 10,
                        alignItems: 'center',
                      },
                    ]}
                  >
                    {externalLinks.map((link, i) => (
                      <TouchableOpacity
                        key={i + link.linkText}
                        onPress={() => {
                          setExternalLinks(
                            externalLinks.filter(
                              __link => __link.nodeID !== link.nodeID,
                            ),
                          );
                        }}
                      >
                        <Tag
                          text={link.linkText + ' · Entfernen'}
                          containerStyles={{
                            backgroundColor: colors.primaryDark,
                          }}
                          textStyles={{ color: colors.white }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}

                {/* Add link subform */}

                <TextInput
                  style={[styles.input]}
                  placeholder="https://..."
                  onChangeText={txt =>
                    setLinkObj(prev => ({ ...prev, url: txt }))
                  }
                  value={linkObject.url}
                  placeholderTextColor="#9b9b9b"
                />
                <TextInput
                  style={[styles.input]}
                  placeholder="Link Text"
                  onChangeText={txt =>
                    setLinkObj(prev => ({ ...prev, linkText: txt }))
                  }
                  value={linkObject.linkText}
                  placeholderTextColor="#9b9b9b"
                />

                {/* submit button to add links */}
                {externalLinks.length < 6 ? (
                  <SubmitButton
                    onPress={addExternalLink}
                    text={
                      !vtHook.isPending ? 'Link hinzufügen' : 'Prüfe Link..'
                    }
                  />
                ) : (
                  <Text
                    style={[
                      smallCaptionTextGray,
                      {
                        textAlign: 'center',
                        padding: 5,
                        paddingBottom: 15,
                        color: colors.lightBlue,
                      },
                    ]}
                  >
                    Du kannst maximal 5 Links hinzufügen.
                  </Text>
                )}

                {/* Submit Button Form */}

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
                      flex: 0.3,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                  >
                    <RNSButton
                      onPress={() => validate() && !loading && handleSubmit()}
                      textColor={colors.bluish}
                      bgColor={colors.primaryGradientStart}
                      caption="Erstellen"
                      loading={loading}
                    />
                  </View>

                  {false && (
                    <RNSButton
                      onPress={() => console.log('empty it')}
                      bgColor={colors.bluish}
                      textColor={colors.primaryDark}
                      caption="Verwerfen"
                      secondary
                      bordered
                    />
                  )}
                </View>
              </View>
            </View>
          ) : (
            <SuccessMessage
              message={
                error
                  ? getFriendlyErrorMessage(error)
                  : 'Dein Blogbeitrag wurde veröffentlicht.'
              }
              navigation={navigation}
            />
          )}
        </SubSectionLayout>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={colors.bluish}
          style={{ margin: 'auto' }}
        />
      )}
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

export default CreateNewsletter;
