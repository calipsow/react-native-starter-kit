import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ArticleCard } from './partials/ArticleCard';
import BackButton from '../../components/BackButtonTop';
import { sampleArticleData } from '../../constants/constants';
import { appThemeColor } from '../../styles/partials';

const BlogsView = ({ navigation }) => {
  const renderArticles = () => {
    return (
      <View style={styles.articlesList}>
        {Array(3)
          .fill(sampleArticleData[0])
          .map((article, idx) => (
            <ArticleCard
              article={article}
              idx={idx}
              key={idx + article.article_id}
            />
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} backbuttonTitle="" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {sampleArticleData.length > 0 && renderArticles()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
    paddingHorizontal: 12,
  },
  articlesList: {
    marginVertical: 0,
    marginTop: 30,
  },
});

export default BlogsView;
