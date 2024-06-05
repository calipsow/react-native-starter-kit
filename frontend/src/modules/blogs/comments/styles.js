import { Dimensions, StyleSheet } from 'react-native';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

export const styles = StyleSheet.create({
  readMoreContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    paddingVertical: 8,
  },
  readMoreSubCmntsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    paddingVertical: 8,
  },
  recursiveCommentContainer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    height: 'auto',
  },
  commentContainer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: Dimensions.get('window').width,
    height: 'auto',
  },
  voteContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  voteContainerNested: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  upvoteText: {
    color: 'white',
  },
  upvoteTextNested: {
    fontSize: getFontSize(13),
    color: 'white',
    paddingLeft: 5,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: 'lightblue',
  },
  repliedToText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  commentText: {
    color: 'white',
  },
  defaultText: {
    flexWrap: 'wrap',
    maxWidth: '90%',
    textAlign: 'left',
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
    marginLeft: 4,
    color: 'white',
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 5,
    borderTopWidth: 0,
    borderTopColor: 'grey',
  },
  recursiveNestedRepliesContainer: {
    marginTop: 10,
    paddingLeft: 0,
    borderTopWidth: 0,
    borderTopColor: 'grey',
  },
});
