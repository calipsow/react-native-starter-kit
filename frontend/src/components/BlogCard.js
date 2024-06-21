import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SingleTag from './SingleTag';

const BlogCard = ({
  blogTitle,
  blogDescription,
  tags,
  publisher,
  featuredImage = null,
  id,
}) => {
  console.log(blogTitle);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Blogs', {
      screen: 'Blog Articles',
      params: {
        blog_id: id,
      },
    });
  };

  return (
    <Pressable
      className="flex-row bg-slate-800 rounded-2xl my-2 mb-0.5 overflow-hidden shadow"
      onPress={handlePress}
    >
      {featuredImage && (
        <Image source={{ uri: featuredImage }} className="w-28 h-full" />
      )}
      <View className="flex-1 p-4">
        <View>
          <Text className="text-[19px] font-bold text-creme mb-0">
            {blogTitle}
          </Text>
          <Text className="text-sm text-gray-400 font-medium">
            {'01.01.2022'} - {publisher}
          </Text>
        </View>
        <View className="flex-row flex-wrap items-center mt-1">
          {Array.isArray(tags) &&
            tags.map((tag, i) => (
              <SingleTag txt={tag.toLowerCase()} key={`${tag}-${i}`} />
            ))}
        </View>
        <Text className="text-gray-500 text-sm">{blogDescription}</Text>
      </View>
    </Pressable>
  );
};

export default BlogCard;
