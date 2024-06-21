import React from 'react';
import {
  View,
  TouchableOpacity,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FBImage from '../../components/FBImage';

import { format } from 'date-fns';
import { fbImage } from '../../constants/constants';
import {
  blueCaptionText,
  bodyTextRegular,
  mediumHeadlineText,
} from '../../styles/partials';
import { colors } from '../../styles';
import getFontSize from '../../helpers/resolve-relative-font-size';

export const ArticlePreviewCard = ({ article, idx }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Single Article', { article_id: article.article_id });
  };

  return (
    <View style={styles.article} key={`idx-${article.title}-${idx}`}>
      <TouchableOpacity onPress={handleClick}>
        <FBImage
          fallbackStyles={{}}
          src={article.poster || fbImage}
          style={styles.featuredImage}
        />
      </TouchableOpacity>

      <Pressable onPress={handleClick}>
        <View style={styles.authorContainer}>
          <Text style={styles.authorText}>{article?.author}</Text>
          <Text style={styles.dateText}>
            from{' '}
            {format(new Date(article.pub_date?.seconds * 1000), 'MM/dd/yyyy')}
          </Text>
        </View>

        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>{article.description}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  featuredImage: {
    width: '100%',
    height: 200, // Adjust as needed
    borderRadius: 5,
    resizeMode: 'cover',
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  authorText: {
    ...blueCaptionText,
    marginRight: 10,
    marginBottom: 0,
    lineHeight: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  dateText: {
    ...blueCaptionText,
    lineHeight: 16,
    fontStyle: 'italic',
    marginLeft: -6,
  },
  title: {
    ...mediumHeadlineText,
    letterSpacing: -0.5,
    paddingTop: 0,
    color: colors.bluish,
    fontSize: getFontSize(19),
  },
  description: {
    ...bodyTextRegular,
    marginBottom: 50,
    paddingTop: 2,
    fontSize: getFontSize(16),
    opacity: 0.8,
  },
});
