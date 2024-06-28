import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

export const posts = [
  {
    id: 1,
    name: 'Mark Karimani',
    isSponsored: true,
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Designing an Earth-positive future, together 🌿',
    image:
      'https://images.unsplash.com/photo-1715512518630-18b8f4aea693?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHwyODl8fHxlbnwwfHx8fHw%3D',
    link: 'togethernature.com',
    reactions: {
      likes: 4,
      retweets: 44,
      comments: 7,
    },
  },
];

export const ImagePostCard = ({ post = posts[0] }) => {
  return (
    <View className="bg-gray-800 rounded-lg p-4 m-2">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image src={post.profileImage} className="w-12 h-12 rounded-full" />
          <View className="ml-4">
            <Text className="text-white text-lg font-bold">{post.name}</Text>
            {post.isSponsored && (
              <View className="flex-row items-center">
                <Text className="text-yellow-500">⚡ Sponsored</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity className="bg-gray-700  rounded-xl px-4 py-2">
          <Text className="text-white">···</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white mt-4">{post.content}</Text>
      {post.image && (
        <Image src={post.image} className="w-full h-40 rounded-lg mt-4" />
      )}
      {post.link && (
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-white">{post.link}</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">Learn More ➡️</Text>
          </TouchableOpacity>
        </View>
      )}
      <View className="flex-row mt-4 justify-around">
        <Text className="text-gray-400">❤️ {post.reactions.likes}</Text>
        <Text className="text-gray-400">🔁 {post.reactions.retweets}</Text>
        <Text className="text-gray-400">💬 {post.reactions.comments}</Text>
      </View>
    </View>
  );
};
