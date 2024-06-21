import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ArticlePreviewCard } from './ArticlePreviewCard';
import BackButton from '../../components/BackButtonTop';
import { sampleArticleData } from '../../constants/constants';

import { colors, fonts, width } from '../../styles';
import { appThemeColor } from '../../styles/partials';
import getFontSize from '../../helpers/resolve-relative-font-size';

const ArticleIndexScreen = ({ navigation, route }) => {
  const { blog_id } = route.params; // use nav params to pass the id of your content and fetch it then

  const loadingContent = async () => {
    console.log('loading content triggered..'); // write here the logic down of your api fetches
  };

  useEffect(() => {
    loadingContent(); // fetch initial data
  }, []);

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} backbuttonTitle="" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Dependency if no data could be loaded */}
        {sampleArticleData.length && (
          <View style={styles.articlesList}>
            {sampleArticleData.map((article, idx) => (
              <ArticlePreviewCard
                article={article}
                idx={idx}
                key={idx + article.article_id}
              />
            ))}
          </View>
        )}
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
    paddingHorizontal: 12,
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
