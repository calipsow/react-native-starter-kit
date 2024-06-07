import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../../styles';
import { formatNumberShort } from '../../../helpers/format-int-short-string';

const ActionButton = ({ iconName, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <MaterialCommunityIcons name={iconName} size={16} color="#f1f1f1e0" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);
/**
 *
 * @property {comment: Object} {upvotes: string, nested_comment_relation: [], replies: [], author: string, content: string}
 * @returns
 */
export const Comment = ({
  comment = {
    upvotes: 0,
    nested_comment_relation: [],
    replies: [],
    author: '',
    content: '',
  },
}) => {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [showSubCmnts, setShowSubCmnts] = useState(true);
  const rl = comment.nested_comment_relation.length;

  const isNested = rl !== 0;
  const isDeeplyNested = rl >= 2;

  const handleUpvote = () => {
    setUpvotes(currentUpvotes => currentUpvotes + 1);
  };

  const renderReplies = () => (
    <View style={styles.repliesContainer}>
      {comment.replies.map((comment, i) => (
        <Comment comment={comment} key={i + '--'} />
      ))}
    </View>
  );

  if (!showSubCmnts) {
    return (
      <View style={styles.readMoreContainer}>
        <TouchableOpacity onPress={() => setShowSubCmnts(true)}>
          <Text style={styles.defaultText}>Load More Answers</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={
        !isNested ? styles.commentContainer : styles.nestedCommentContainer
      }
    >
      {!isDeeplyNested && (
        <Pressable onPress={handleUpvote}>
          <View style={styles.voteContainer}>
            <AntDesign name="caretup" size={14} color="white" />
            <Text style={styles.upvoteText}>{`${formatNumberShort(
              upvotes,
            )}`}</Text>
          </View>
        </Pressable>
      )}
      <View style={styles.commentContent}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
          }}
        >
          <Text style={[styles.commentAuthor]} numberOfLines={1}>
            {comment.author}
          </Text>
          <Text style={[styles.commentInfo]} numberOfLines={1}>
            {isNested && !isDeeplyNested
              ? `  @replied`
              : isDeeplyNested && isNested
              ? '  @re-replied'
              : '  @commented'}
          </Text>
        </View>
        <Text style={[styles.commentText, styles.defaultText]}>
          {comment.content}
        </Text>
        <View style={styles.commentActions}>
          <ActionButton
            iconName="reply-circle"
            label="Reply"
            onPress={() => {}}
          />
          <ActionButton
            iconName="share-circle"
            label="Share"
            onPress={() => {}}
          />
          {isDeeplyNested && (
            <ActionButton
              iconName="arrow-up-circle"
              label={formatNumberShort(upvotes)}
              onPress={handleUpvote}
            />
          )}
        </View>
        {renderReplies()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  readMoreContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    paddingVertical: 8,
  },
  commentContainer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    paddingRight: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: Dimensions.get('window').width,
  },
  nestedCommentContainer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 5,
    width: '100%',
    height: 'auto',
  },
  voteContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  upvoteText: {
    color: 'white',
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontFamily: fonts.primaryBold,
    fontWeight: 'bold',
    color: 'lightblue',
  },
  commentInfo: {
    fontWeight: 'normal',
    color: 'gray',
  },
  commentText: {
    color: 'white',
  },
  defaultText: {
    fontFamily: fonts.primaryRegular,
    color: 'white',
    maxWidth: '95%',
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    fontFamily: fonts.primaryRegular,
    marginLeft: 4,
  },
  repliesContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export default Comment;
