import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const AvatarComponent = () => {
  const imageUri = 'https://example.com/default-image.png'; // Static image URL

  return (
    <View style={styles.avatars}>
      <Image
        source={{ uri: imageUri }}
        style={styles.avatar}
        onError={() => console.log('Error loading image')}
      />
      <View style={[{ flexWrap: 'wrap', marginLeft: -3 }]}>
        <Text style={styles.more}>Standard User</Text>
        <Text style={styles.more}>01.01.2022</Text>
      </View>
    </View>
  );
};

const ArticlePreviewCard = () => {
  return (
    <View style={styles.article}>
      <View style={styles.imageLink}>
        <Image
          source={{ uri: 'https://example.com/default-cover.jpg' }}
          style={styles.coverImage}
        />
      </View>

      <View style={styles.content}>
        <AvatarComponent />
        <Text style={styles.title}> Example Title </Text>
        <Text style={[styles.date]}> 02.02.2022 </Text>
        <Text style={[styles.description]}>
          {' '}
          This is a sample description for the preview card.{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    backgroundColor: '#1A222E',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8EA6C0',
    overflow: 'hidden',
    width: Dimensions.get('window').width - 16,
    justifyContent: 'space-between',
  },
  imageLink: {
    width: '100%',
    height: 250,
    paddingBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: 12,
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f1f1f1',
    marginBottom: 0,
  },
  description: {
    fontSize: 15,
    color: '#f1f5f9',
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: -5,
  },
  avatar: {
    width: 39,
    height: 39,
    borderRadius: 39,
    borderWidth: 2,
    backgroundColor: '#377dff',
    borderColor: '#ffffff',
    marginRight: -5,
  },
  more: {
    paddingLeft: 15,
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: 'bold',
    opacity: 0.9,
  },
});

export default ArticlePreviewCard;
