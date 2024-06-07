import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import getFontSize from '../functions/ui/resolve-relative-font-size';
import { colors, fonts } from '../styles';
import {
  flexBoxRow,
  mediumHeadlineText,
  smallCaptionTextGray,
  smallTextGray,
  tag,
  tagText,
  tagsWrapperBox,
} from '../styles/partials';
import { lastUpdate } from '../../availableInFullVersion/sample-data';

const BlogCard = ({
  blogTitle,
  blogDescription,
  tags,
  publisher,
  featuredImage = null,
  likes,
  comments,
  id,
  data,
}) => {
  const navigation = useNavigation();
  // console.log(data);
  const handlePress = () => {
    navigation.navigate('Blogs', {
      screen: 'Blog Articles',
      params: {
        blog_id: id,
      },
    });
  };

  const BlogTag = ({ txt }) => (
    <View
      style={[
        tag,
        {
          backgroundColor: colors.lightBlue + '1f',
          borderColor: colors.lightBlue,
        },
      ]}
    >
      <Text style={[tagText, { color: colors.lightBlue }]}>{txt}</Text>
    </View>
  );

  return (
    <Pressable style={styles.article} onPress={handlePress}>
      {false && (
        <Image source={{ uri: featuredImage }} style={styles.meetupImage} />
      )}
      <View style={styles.content}>
        <View>
          <Text style={[mediumHeadlineText, { marginBottom: 0 }]}>
            {blogTitle}
          </Text>
          <Text style={smallCaptionTextGray}>
            {lastUpdate} - {publisher}
          </Text>
        </View>

        <View style={tagsWrapperBox}>
          {Array.isArray(tags) &&
            tags.map((tag, i) => (
              <BlogTag txt={tag.toLowerCase()} key={`${tag}-${i}`} />
            ))}
        </View>
        <Text style={smallTextGray}>{blogDescription}</Text>
        {/* Likes and Comments */}
        {false && (
          <View style={styles.metaInfoContainer}>
            <View style={[flexBoxRow, { gap: 5 }]}>
              <AntDesign name="heart" size={19} color={colors.brightRed} />
              <Text style={styles.metaInfoText}>{likes}</Text>
            </View>
            <View style={[flexBoxRow, { gap: 5 }]}>
              <MaterialCommunityIcons
                name="message"
                size={19}
                color={colors.textCreme}
              />
              <Text style={styles.metaInfoText}>{comments}</Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  article: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    overflow: 'hidden',
    marginBottom: 24,
    marginTop: 8,
    elevation: 4, // for shadow
  },
  meetupImage: {
    width: 110, // adjust width as needed
    height: '100%', // adjust height as needed
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 9,
    gap: 4,
  },
  metaInfoContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },
  metaInfoText: {
    fontFamily: fonts.primaryBold,
    color: colors.lightGray,
    fontSize: getFontSize(18),
    lineHeight: 19,
  },
});

export default BlogCard;
