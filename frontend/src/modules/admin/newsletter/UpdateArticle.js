/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import getFriendlyErrorMessage from '../../../helpers/message-from-firebase-error';
import useGetDocument from '../../../hooks/firebase/use-get-document';
import { colors } from '../../../styles';
import { flexBoxRow } from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import { DividerCaption } from '../../auth/Signin/Signin';
import { SuccessMessage } from '../../events/create/CreateEvent';
import SubSectionLayout from '../../home/sections/partials/SubSectionLayout';
import { ModalContext } from '../../provider/ModalProvider';
import { LegalText, SubmitButton } from './CreateNewsletter';

const UpdateExistingArticle = ({ article_id }) => {
  const { documentData, getDocument, loading, error } = useGetDocument();
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const { showModalConfirmation } = useContext(ModalContext);
  const [newsletterContent, setNewsLetterContent] = useState(null);
  const [adminAccess, setAdminAccess] = useState(null);

  // init loading article
  useEffect(() => {
    if (!documentData && !loading) {
      getDocument({
        collectionPath: 'Newsletter',
        document_id: article_id,
      });
    } else if (documentData && !loading && !newsletterContent) {
      setNewsLetterContent(documentData);
    }
  }, [documentData]);

  if (!newsletterContent || !adminAccess)
    return (
      <ActivityIndicator
        size={'large'}
        style={{ margin: 'auto' }}
        color={colors.bluish}
      />
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
                  text={!vtHook.isPending ? 'Link hinzufügen' : 'Prüfe Link..'}
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
                  flexBoxRow,
                  {
                    gap: 10,
                    flexShrink: 3,
                    flexGrow: 3,
                    flexBasis: 'auto',
                    flexWrap: 'wrap',
                  },
                ]}
              >
                <LegalText />
                <View style={{ width: '100%' }}>
                  <RNSButton
                    onPress={() => validate() && !loading && handleSubmit()}
                    textColor={colors.bluish}
                    bgColor={colors.primaryGradientStart}
                    caption="Teilen"
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
    height: 'auto', // Damit das Textfeld dynamisch wächst
    minHeight: 40, // Mindesthöhe des Textfelds (optional)
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

export default UpdateExistingArticle;
