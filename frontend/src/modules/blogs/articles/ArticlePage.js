import { useNavigationState } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Lightbox from 'react-native-lightbox-v2';
import Entypo from 'react-native-vector-icons/Entypo';
import RNSButton from '../../../components/Button';
import Tag from '../../../components/Tag';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useGetDocumentsByFieldValue from '../../../hooks/firebase/use-doument-by-field-value';
import useFetchPublicUserData from '../../../hooks/firebase/use-fetch-public-user-data';
import useTryToExtractCreatedBy from '../../../hooks/helper/use-extract-created-by';
import useIsScreenVisible from '../../../hooks/screen/use-screen-visibility';
import useExternalLink from '../../../hooks/utilities/use-external-link';
import useImageDimensions from '../../../hooks/utilities/use-size-from-sourced-image';
import { colors, width } from '../../../styles';
import {
  appThemeColor,
  flexBoxRow,
  grayCaption,
  mediumHeadlineText,
  regularTextLight,
  screenPadding,
  sectionTitleCreme,
  subHeaderTextLightGray,
  textBtnDark,
} from '../../../styles/partials';
import { DividerCaption } from '../../auth/Signin/Signin';
import { COMMENTS } from '../../availableInFullVersion/sample-data';
import { ModalContext } from '../../provider/ModalProvider';
import { BackButton } from '../ArticleIndex';
import { AvatarComponent } from '../UI/ArticlePreviewCard';
import Comment from '../comments/Comment';
import extractContentFromArticleDataSet from './helpers/extractFullContentFromArticle';
import { styles } from './styles';
/*
const ArticleTitle = ({ blogTitle }) => (
  <View style={styles.header}>
    <Text style={styles.headerBlogText}>{blogTitle}</Text>
  </View>
);
*/

export const LightboxView = ({
  navigator,
  onOpen = function () {},
  onClose = function () {},
  children,
}) => (
  <Lightbox onOpen={onOpen} onClose={onClose}>
    {children}
  </Lightbox>
);

const ContentSection = ({
  title,
  author,
  imageUrl,
  children,
  sectionTitle,
  navigation,
}) => {
  const [resizeFullImage, setResizeFullImage] = useState(false);
  const { relativeHeight, error, imgWidth, imgHeight } = useImageDimensions(
    imageUrl,
    width,
  );

  return (
    <View style={styles.content}>
      {title && (
        <Text style={[mediumHeadlineText, screenPadding]}>
          {title.replace(title.charAt(0), title[0].toUpperCase())}
        </Text>
      )}
      {author && (
        <Text
          style={[
            grayCaption,
            screenPadding,
            {
              color: colors.white,
              fontSize: getFontSize(16),
              fontStyle: 'italic',
            },
          ]}
        >
          {author}
        </Text>
      )}
      {imageUrl && (
        <React.Fragment>
          <LightboxView
            navigator={navigation}
            onClose={() => setResizeFullImage(false)}
            onOpen={() => setResizeFullImage(true)}
          >
            <Image
              src={imageUrl}
              style={[
                styles.postImage,
                {
                  height: relativeHeight,
                  objectFit: 'contain',
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
      )}
      {sectionTitle && (
        <Text style={[sectionTitleCreme, screenPadding]}>
          {sectionTitle.replace(
            sectionTitle.charAt(0),
            sectionTitle[0].toUpperCase(),
          )}
        </Text>
      )}
      <Text
        style={[
          regularTextLight,
          screenPadding,
          { fontSize: getFontSize(16) },
          !sectionTitle && { marginTop: 15 },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

export const CommentForm = () => (
  <View style={styles.footer}>
    <TextInput style={styles.input} placeholder="Leave a comment 🌟" />
    <RNSButton
      bgColor={colors.bluish}
      textColor={colors.primary}
      rounded
      secondary
      onPress={() => console.log('Comment posted')}
    >
      <Text style={textBtnDark}>Post Comment</Text>
    </RNSButton>
  </View>
);

const ArticlePage = ({ navigation, route }) => {
  var {
    articleTitle,
    articleContent,
    sectionTitle,
    author,
    poster = '',
    sections = [],
    articleID,
    pubDate,
    tags = [],
    articleData = {},
  } = route.params;

  const { documents, getDocumentsByValue } = useGetDocumentsByFieldValue();
  const { isVisible } = useIsScreenVisible();
  const [snapBack, setSnapBack] = useState(false);
  const scrollViewRef = useRef(null);
  const { createdBy } = useTryToExtractCreatedBy(articleData);
  const extLinkHook = useExternalLink();
  const { showModalConfirmation } = useContext(ModalContext);

  const navigationState = useNavigationState(
    state => state.routes[state.index].name,
  );
  const { relativeHeight, error, imgWidth, imgHeight } = useImageDimensions(
    poster,
    width,
  );
  const { fetchUserData, loadingUser, userData } = useFetchPublicUserData();
  // console.log(articleData);
  useEffect(() => {
    getDocumentsByValue({
      collectionPath: 'Newsletter',
      fieldPath: 'public',
      value: true,
    });
  }, []);

  useEffect(() => {
    if (articleData?.creator_uid) {
      fetchUserData(articleData.creator_uid);
    }
  }, []);

  useEffect(() => {
    if (snapBack) {
      // Scroll die ScrollView zurück zum Anfang
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      // Setze snapBack zurück auf false, um wiederholte Scrolls zu vermeiden
      setSnapBack(false);
    }
  }, [snapBack]);

  return (
    <ScrollView scrollsToTop={!isVisible} ref={scrollViewRef}>
      <View style={styles.container}>
        {/* Author or Publisher */}
        <View
          style={[
            flexBoxRow,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 9,
              marginTop: 9,
            },
            createdBy && screenPadding,
          ]}
        >
          {userData ? (
            <AvatarComponent
              createdAt={articleData?.created_at}
              createdBy={userData}
              imageLink={userData?.photoURL || poster}
            />
          ) : null}
          <View style={{ marginTop: -10 }}>
            <BackButton
              navigation={navigation}
              navigationState={
                navigationState === 'Article' ? navigationState : undefined
              }
            />
          </View>
        </View>
        {/* Article Title */}
        <Text
          style={[
            mediumHeadlineText,
            screenPadding,
            { maxWidth: 350, fontSize: getFontSize(29) },
          ]}
        >
          {articleTitle &&
            articleTitle.replace(
              articleTitle.charAt(0),
              articleTitle[0].toUpperCase(),
            )}
        </Text>
        {/* Tags Partials */}
        {tags.length ? (
          <View
            style={[
              flexBoxRow,
              { gap: 8, ...screenPadding, flexWrap: 'wrap', paddingBottom: 5 },
            ]}
          >
            {tags
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
        ) : null}
        {/* Content Section Main */}
        <ContentSection
          relativeHeight={450}
          navigation={navigation}
          sectionTitle={sectionTitle || ''}
          author={`${
            articleData?.event_id ? 'Startzeit ·' : 'Veröffentlichung ·'
          } ${`${pubDate && pubDate !== 'Invalid Date' ? pubDate : 2024}`}`}
          imageUrl={poster}
        >
          {extractContentFromArticleDataSet(articleData) ||
            articleData.description}
        </ContentSection>

        {/* Article Links (If Given) */}
        {articleData?.external_links &&
        Array.isArray(articleData.external_links) ? (
          <View style={[{ gap: 5, ...screenPadding }]}>
            <Text style={[sectionTitleCreme, { fontSize: getFontSize(18) }]}>
              Weiterführende Links
            </Text>
            <View style={[flexBoxRow, { gap: 13, flexWrap: 'wrap' }]}>
              {articleData.external_links.map((extLink, i) =>
                // prettier-ignore
                <TouchableOpacity key={i+extLink.nodeID} onPress={() => {
                  showModalConfirmation('Webseite im Browser besuchen', `Möchtest du zur Webseite ${extLink.url} wechseln?`, async() => await extLinkHook.stateLessOpenLink(extLink.url))
                
              }}>
                  <Tag 
                  text={extLink.linkText} 
                  containerStyles={{backgroundColor: colors.primary,borderColor: colors.lightBlue, paddingVertical: 6}}
                  textStyles={{color: colors.lightBlue}} />

              </TouchableOpacity>,
              )}
            </View>
          </View>
        ) : null}

        {/* Article End Divider */}

        <DividerCaption caption={'Danke fürs lesen'} />

        {/* More Articles */}
        {/*<View style={{ minHeight: 50, width: '100%' }}>
          <Text
            style={[
              mediumHeadlineText,
              {
                fontSize: getFontSize(29),
                marginBottom: 35,
                textAlign: 'center',
                ...screenPadding,
              },
            ]}
          >
            Weitere Artikel 🗞️
          </Text>
          {documents
            .filter(art => art.article_id !== articleID)
            .map((article, i) =>
              i < 10 ? (
                <ArticlePreviewCard
                  setSnapBack={setSnapBack}
                  article={article}
                  key={article.article_id}
                  idx={i}
                />
              ) : (
                <></>
              ),
            )}
        </View>*/}
        {/* later versions include that */}
        {/* eslint-disable-next-line no-constant-condition*/}
        {false ? (
          <View accessibilityLabel="comment-section">
            <Text style={subHeaderTextLightGray}>
              {/* eslint-disable-next-line no-undef*/}
              Commentaries {`[ ${currentViewed[0]} - ${currentViewed[1]} ]`}
            </Text>
            <ScrollView
              horizontal
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled
              // eslint-disable-next-line no-undef
              snapToOffsets={currentViewed}
              decelerationRate="fast"
              pagingEnabled
              // eslint-disable-next-line no-undef
              onScroll={updateCurrentViewed}
            >
              {COMMENTS.map(cmnts => (
                <Comment key={`idx-${cmnts.id}`} comment={cmnts} />
              ))}
            </ScrollView>
          </View>
        ) : null}
        {/* eslint-disable-next-line no-constant-condition*/}
        {false ? <CommentForm /> : null}
      </View>
    </ScrollView>
  );
};

export default ArticlePage;
