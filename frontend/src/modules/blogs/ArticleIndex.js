import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FBImage from '../../components/FBImage';
import { ZusammenStehenWir_LOGO_SRC } from '../../constants/constants';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import useFirestoreCollection from '../../hooks/firebase/use-firestore-collection';
import useResetScreen from '../../hooks/screen/use-screen-reset';
import { colors, fonts, width } from '../../styles';
import {
  appThemeColor,
  blueCaptionText,
  bodyTextRegular,
  flexBoxRow,
  grayCaption,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
  tag,
  tagText,
} from '../../styles/partials';
import { fallback_img } from '../availableInFullVersion/sample-data';
import { TopBarMenu } from '../../components/TopScreenDescription';

export const BackButton = ({
  navigation,
  styles = {},
  navigationState = null,
  backbuttonTitle = '',
}) => (
  <Pressable onPress={() => navigation.goBack()}>
    <View style={[flexBoxRow, { alignItems: 'center' }]}>
      <Text
        style={[
          grayCaption,
          {
            padding: 5,

            fontSize: getFontSize(16),
            ...screenPadding,
            color: colors.bluish,
            marginBottom: 0,
            paddingVertical: 12,
            lineHeight: 16,
            opacity: 0.9,
          },
          styles && styles,
        ]}
        numberOfLines={1}
      >
        <Text style={{ color: colors.lightBlue, opacity: 1 }}>Zurück</Text>{' '}
        {backbuttonTitle ? '· ' + backbuttonTitle : ''}
      </Text>
    </View>
  </Pressable>
);

export const ArticlePreviewCard = ({
  article,
  idx,
  setSnapBack = function () {},
}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    setSnapBack(true);
    navigation.navigate('Single Article', {
      article_id: article.article_id,
    });
  };

  return (
    <View
      key={`idx-${article.article_title || article.title}-${idx}`}
      style={styles.article}
    >
      <TouchableOpacity onPress={handleClick}>
        <View style={{ width: '100%', ...screenPadding }}>
          <FBImage
            fallbackStyles={{}}
            src={article.poster || fallback_img}
            style={styles.featuredImage}
          />
        </View>
      </TouchableOpacity>

      <Pressable onPress={handleClick}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
            gap: 0,
            ...screenPadding,
          }}
        >
          <Text
            numberOfLines={1}
            style={[
              blueCaptionText,
              {
                opacity: 1,
                marginRight: 10,
                marginBottom: 0,
                lineHeight: 16,
                fontStyle: 'italic',
                fontWeight: 'bold',
              },
            ]}
          >
            {article?.author?.includes('@')
              ? 'Zusammen Stehen Wir · Admin'
              : article?.author}
          </Text>

          <Text
            numberOfLines={1}
            style={[
              blueCaptionText,
              { lineHeight: 16, fontStyle: 'italic', marginLeft: -6 },
            ]}
          >
            am{' '}
            {article.pub_date?.seconds
              ? new Date(article.pub_date?.seconds * 1000).toLocaleDateString()
              : article.pub_date?.toString()}
          </Text>
        </View>

        <View style={{ ...screenPadding }}>
          <Text
            style={[
              mediumHeadlineText,
              {
                letterSpacing: -0.5,
                paddingTop: 0,
                color: colors.bluish,
                fontSize: getFontSize(19),
              },
            ]}
          >
            {article.article_title || article.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 8,
              rowGap: 2,

              paddingTop: 3,
            }}
          >
            {Array.isArray(article.tags) &&
              article.tags.map((text, i) => (
                <View
                  style={[tag, { marginVertical: 0, borderRadius: 5 }]}
                  key={text + i}
                >
                  <Text style={tagText}>{text?.toLowerCase()}</Text>
                </View>
              ))}
          </View>

          <Text
            style={[
              bodyTextRegular,
              {
                marginBottom: 50,
                paddingTop: 2,
                fontSize: getFontSize(16),
                opacity: 0.8,
              },
            ]}
          >
            {article.description}
          </Text>
        </View>
      </Pressable>
      {false && (
        <View style={styles.articleInfo}>
          {/* Author */}
          <View style={styles.avatars}>
            <Image src={ZusammenStehenWir_LOGO_SRC} style={styles.avatar} />
          </View>
        </View>
      )}
    </View>
  );
};

const ArticleIndexScreen = ({ navigation, route }) => {
  const paginationHook = useFirestoreCollection();
  const {
    loading,
    error,
    documents,
    fetchDocuments,
    hasMore,
    resetLoadedProgress,
  } = useFirestoreCollection();

  const loadingContent = async () => {
    resetLoadedProgress();

    fetchDocuments({
      collectionPath: 'Newsletter',
      maxItems: 10,
      sortedBy: 'pub_date,desc',
      pageIndex: 0,
    });
    paginationHook.fetchDocuments({
      collectionPath: 'Events',
      maxItems: 10,
      pageIndex: 0,
      sortedBy: 'approval.approved_since,desc',
    });
  };

  useResetScreen(loadingContent);

  return (
    <View style={styles.container}>
      {false && (
        <View
          style={[
            screenPadding,
            { paddingBottom: 5, opacity: 0.8, paddingVertical: 3 },
          ]}
        >
          <Text style={mediumHeadlineText}>Newsletter</Text>
        </View>
      )}
      <TopBarMenu
        navigation={navigation}
        hideActionButton={true}
        title="Newsletter"
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text
            style={[
              smallCaptionTextGray,
              { maxWidth: 300, fontSize: getFontSize(13) },
            ]}
          >
            Mit unseren Artikeln zu den neuesten Themen bliebst du mit dem
            Bündnis auf dem neuesten Stand.
          </Text>
        </View>

        {/* Error and Loading */}
        {loading || error ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              ...screenPadding,
            }}
          >
            {loading ? (
              <ActivityIndicator
                style={{ marginTop: 150 }}
                size={'large'}
                color={colors.bluish}
              />
            ) : (
              <Text style={mediumHeadlineText}>
                Etwas ist schiefgelaufen, probiere es später nochmal.
              </Text>
            )}
          </View>
        ) : null}

        {/* Articles List */}
        {documents.length ? (
          <View style={styles.articlesList}>
            {documents.map((article, idx) => (
              <ArticlePreviewCard
                article={article}
                idx={idx}
                key={idx + article.article_id}
              />
            ))}
          </View>
        ) : null}

        {/* More Events Button */}
        {!loading ? (
          <View
            style={{
              ...screenPadding,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                smallCaptionTextGray,
                {
                  fontSize: getFontSize(17),
                  color: colors.bluish,
                  opacity: 0.8,
                },
              ]}
            >
              Das waren alle Newsletter bis jetzt.
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Events', { screen: 'Event Feed' })
              }
            >
              <Text
                style={[
                  smallCaptionTextGray,
                  {
                    fontSize: getFontSize(20),
                    color: colors.lightBlue,
                    padding: 10,
                  },
                ]}
              >
                Events aufrufen
              </Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  metaText: {
    color: colors.lightBlue,
    marginHorizontal: 0,
    fontFamily: fonts.primaryRegular,
    opacity: 0.8,
    fontSize: getFontSize(16),
    lineHeight: 16,
    paddingTop: 2,
  },
  tag: {
    backgroundColor: colors.lightBlue,
    opacity: 1,
    borderRadius: 9999, // rounded-full equivalent
    paddingHorizontal: 13,
    paddingVertical: 5,
    justifyContent: 'space-evenly',
    marginRight: 5,
  },
  tagText: {
    fontSize: getFontSize(18),
    lineHeight: 18,
    color: colors.primary,
    fontFamily: fonts.primaryBold,
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  articleInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 0,
    borderRadius: 10,
  },
  articlesListContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
  },
  avatar: {
    width: 79,
    opacity: 0.86,
    height: 50,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#f1f1f1',
    resizeMode: 'contain',
  },
  subHeader: {
    marginVertical: 0,
    textAlign: 'left',
    fontSize: getFontSize(27),
    fontFamily: fonts.primaryBold,
    color: colors.textLight,
  },
  pageHeader: {
    ...screenPadding,
    marginTop: 3,
  },
  pageTitle: {
    fontSize: getFontSize(30),
    fontWeight: 'bold',
    color: colors.bluish,
    textAlign: 'center',
  },
  pageDescription: {
    fontSize: getFontSize(15),
    color: colors.lightGray,
    textAlign: 'center',
  },
  article: {
    marginBottom: 0,
  },
  featuredImage: {
    width: '100%',
    height: width <= 600 ? 200 : 450,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  featuredTitle: {
    fontSize: getFontSize(28),
    fontWeight: 'bold',
    color: colors.bluish,
    marginVertical: 5,
    fontFamily: fonts.primarySemiBold,
  },
  featuredSummary: {
    textAlign: 'justify',
    fontSize: getFontSize(17),
    fontFamily: fonts.primaryRegular,
    marginBottom: 50,
    paddingTop: 10,
  },
  articlesList: {
    marginVertical: 0,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: getFontSize(25),
    color: colors.lightGray,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 40,
  },
  articleItem: {
    // Define styles for individual articles
  },
  pagination: {
    alignItems: 'center',
    marginTop: 20,
  },
  paginationText: {
    fontSize: getFontSize(16),
  },
});

export default ArticleIndexScreen;
