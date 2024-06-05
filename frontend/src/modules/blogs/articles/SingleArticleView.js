import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Tag from '../../../components/Tag';
import updateFirestoreDocument from '../../../functions/firestore/update-document-field-async';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import { resolveAdminAccessLevel } from '../../../hooks/auth/use-auth-listener';
import useFetchPublicUserData from '../../../hooks/firebase/use-fetch-public-user-data';
import useGetDocument from '../../../hooks/firebase/use-get-document';
import { useToastNotify } from '../../../hooks/screen/use-toast-notification';
import useExternalLink from '../../../hooks/utilities/use-external-link';
import { useImageDimensionsDynamic } from '../../../hooks/utilities/use-size-from-sourced-image';
import useDeleteArticle from '../../../hooks/workflows/use-delete-article';
import { colors, height, width } from '../../../styles';
import {
  appThemeColor,
  bodyTextRegular,
  flexBoxRow,
  mediumHeadlineText,
  regularTextLight,
  screenPadding,
  sectionTitleCreme,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import { SubmitButton } from '../../admin/newsletter/CreateNewsletter';
import ScreenWrapper from '../../app/ScreenWrapper';
import { DividerCaption } from '../../auth/Signin/Signin';
import { ModalContext } from '../../provider/ModalProvider';
import { AvatarComponent } from '../UI/ArticlePreviewCard';
import { CommentForm, LightboxView } from './ArticlePage';
import { styles } from './styles';
import Comment from '../comments/Comment';

const SingleArticleView = ({ navigation, route }) => {
  const delArt = useDeleteArticle();
  const [accessLvl, setAccessLvl] = useState(null);
  const { article_id } = route.params;
  const { documentData, getDocument, loading, error } = useGetDocument();
  const { getImageDimensions, relativeHeight } = useImageDimensionsDynamic();
  const { fetchUserData, userData, loadingUser } = useFetchPublicUserData();
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const extLinkHook = useExternalLink();
  const { showModalConfirmation } = useContext(ModalContext);
  const { showToastNotification } = useToastNotify();

  const handleDeletion = () => {
    showModalConfirmation(
      'Achtung!',
      'Möchtest du wirklich diesen Artikel löschen? Diese Aktion ist irreversibel.',
      () => delArt.deleteArticle({ article_id }),
    );
  };

  useEffect(() => {
    // gets image dimensions and creator data if the doc is loaded

    if (documentData?.poster) {
      console.log('loading dimensions...');

      getImageDimensions(documentData.poster, width);
    }
    if (documentData?.creator_uid) {
      console.log('loading creator...');

      fetchUserData(documentData.creator_uid);
    }
  }, [documentData]);

  useEffect(() => {
    // initial loading

    if (documentData || loading || !accountCtx) return;
    getDocument({
      collectionPath: 'Newsletter',
      document_id: article_id,
    });
    resolveAdminAccessLevel(accountCtx.uid).then(permission => {
      setAccessLvl(permission);
    });
  }, []);

  useEffect(() => {
    if (!error) return;
    if (error.includes('offline')) {
      setTimeout(() => {
        getDocument({
          collectionPath: 'Newsletter',
          document_id: article_id,
        });
      }, 1000);
    }
  }, [error]);

  // updating the views if the content is loaded
  useEffect(() => {
    if (documentData && userData && relativeHeight) {
      updateFirestoreDocument(
        'Newsletter',
        article_id,
        'views',
        typeof documentData.views === 'number' ? documentData.views + 1 : 1,
      );
    }
  }, [documentData, userData, relativeHeight]);

  useEffect(() => {
    if ((accessLvl !== 'full' && accessLvl !== 'article') || !delArt.succeeded)
      return;
    showToastNotification({ msg: 'Der Artikel wurde gelöscht' });
    // setTimeout(() => navigation.goBack(), 15000);
  }, [delArt.succeeded]);

  if (delArt.loading)
    return (
      <ScreenWrapper>
        <>
          <ActivityIndicator
            size={'small'}
            style={{ margin: 'auto' }}
            color={colors.bluish}
          />
          <Text
            style={[regularTextLight, { margin: 'auto', textAlign: 'center' }]}
          >
            Lösche Artikel..
          </Text>
        </>
      </ScreenWrapper>
    );

  if (delArt.succeeded)
    return (
      <ScreenWrapper>
        <>
          <Text
            style={[
              mediumHeadlineText,
              { margin: 'auto', textAlign: 'center' },
            ]}
          >
            Artikel wurde gelöscht.
          </Text>
          <SubmitButton
            style={{ margin: 'auto' }}
            text="Zurück"
            onPress={() => navigation.goBack()}
          />
        </>
      </ScreenWrapper>
    );

  if (!documentData || !userData || !relativeHeight)
    return (
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        {!error ? (
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
            Der Artikel wurde nicht gefunden. Möglicherweise wurde dieser
            entfernt.
          </Text>
        )}
      </View>
    );
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[styles.container, { paddingBottom: 10, minHeight: height }]}
      >
        <View
          style={[
            flexBoxRow,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 9,
            },
            screenPadding,
          ]}
        >
          <AvatarComponent
            createdAt={
              documentData.pub_date
                ? new Date(
                    documentData.pub_date.seconds * 1000,
                  ).toLocaleString()
                : '2024'
            }
            createdBy={userData}
            imageLink={userData?.photoURL || documentData.poster}
          />
          {accessLvl === 'article' || accessLvl === 'full' ? (
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
                text="Artikel Löschen"
                onPress={handleDeletion}
              />
            </View>
          ) : null}
        </View>
        {/* Article Title */}
        <Text style={[mediumHeadlineText, screenPadding]}>
          {documentData.article_title &&
            documentData.article_title.replace(
              documentData.article_title.charAt(0),
              documentData.article_title[0].toUpperCase(),
            )}
        </Text>
        {/* Tags Partials */}

        <View
          style={[
            flexBoxRow,
            { gap: 8, ...screenPadding, flexWrap: 'wrap', marginTop: 3 },
          ]}
        >
          {documentData.tags
            .filter(t => t)
            .map((tag, i) => (
              <Tag
                key={i + '---'}
                text={tag.toLowerCase()}
                containerStyles={{
                  backgroundColor: colors.gray + '6f',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: colors.lightGray,
                }}
                textStyles={{ color: colors.white }}
              />
            ))}
        </View>

        <View style={styles.content}>
          <React.Fragment>
            <LightboxView
              navigator={navigation}
              onClose={() => {}}
              onOpen={() => {}}
            >
              <Image
                src={documentData.poster}
                style={[
                  styles.postImage,
                  {
                    height:
                      height > relativeHeight
                        ? relativeHeight
                        : (relativeHeight / height) * 300,
                    objectFit: 'cover',
                    resizeMode: 'center',
                  },
                ]}
              />
            </LightboxView>
            {/* Resize Icon absolute position */}
            <View
              style={{
                top: 43,
                left: 0,
                width: width,
                position: 'absolute',
                padding: 0,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Entypo
                name="resize-full-screen"
                size={20}
                style={{
                  marginBottom: 120,
                  marginRight: 5,
                  backgroundColor: appThemeColor.darkBlue,
                  borderRadius: 360,
                  padding: 6,
                  opacity: 0.78,
                }}
                color={colors.bluish}
              />
            </View>
          </React.Fragment>
          {documentData.content_sections.map((section, i) => (
            <View key={i + '--'}>
              {section.section_title ? (
                <Text
                  style={[
                    mediumHeadlineText,
                    screenPadding,
                    { fontSize: getFontSize(19) },
                  ]}
                >
                  {section.section_title.replace(
                    section.section_title.charAt(0),
                    section.section_title[0].toUpperCase(),
                  )}
                </Text>
              ) : null}
              <Text
                style={[
                  bodyTextRegular,
                  screenPadding,
                  { fontSize: getFontSize(16) },
                  !section.section_title && { marginTop: 15 },
                ]}
              >
                {section.section_content}
              </Text>
            </View>
          ))}
        </View>
        {/* Article Links (If Given) */}
        {documentData?.external_links &&
        Array.isArray(documentData?.external_links) ? (
          <View style={[{ gap: 5, ...screenPadding }]}>
            <Text
              style={[
                sectionTitleCreme,
                { fontSize: getFontSize(18), color: colors.lightBlue },
              ]}
            >
              Weiterführende Links
            </Text>
            <View style={[flexBoxRow, { gap: 13, flexWrap: 'wrap' }]}>
              {documentData.external_links.map((extLink, i) => (
                <TouchableOpacity
                  key={i + extLink.nodeID}
                  onPress={() => {
                    showModalConfirmation(
                      'Webseite im Browser besuchen',
                      `Möchtest du zur Webseite ${extLink.url} wechseln?`,
                      async () =>
                        await extLinkHook.stateLessOpenLink(extLink.url),
                    );
                  }}
                >
                  <Tag
                    text={extLink.linkText}
                    containerStyles={{
                      marginVertical: 0,
                      borderRadius: 5,
                      backgroundColor: colors.primary,
                      borderColor: colors.bluish,
                      paddingVertical: 12,
                      opacity: 0.75,
                    }}
                    textStyles={{ color: colors.bluish }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}
        <DividerCaption caption={'Danke fürs lesen'} />
        {/*<Comment
          comment={{
            author: 'test',
            content: 'some comment for this article',
            nested_comment_relation: [],
            replies: [],
            upvotes: 4,
          }}
        />
        <CommentForm />*/}
      </View>
    </ScrollView>
  );
};

export default SingleArticleView;
