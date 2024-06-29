import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

const posts = [
  {
    id: 1,
    username: 'Dominik Lamakani',
    time: 'Yesterday at 10:48 AM',
    content: `👋
It's more likely that people reading your blog will opt in with their email addresses if you give them something highly relevant in return. Ditch that too-general lead magnet and create "content upgrades" for your highest-traffic articles.
Thread 👇`,
    likes: 4,
    shares: 44,
    comments: 7,
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const TextPost = ({ post = posts[0] }) => {
  return (
    <View className="bg-gray-800 rounded-lg p-4 m-2">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image src={post.profileImage} className="w-12 h-12 rounded-full" />
          <View className="ml-4">
            <Text className="text-white text-lg font-bold">
              {post.username}
            </Text>
            <Text className="text-gray-400">{post.time}</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-gray-700  rounded-xl px-4 py-2">
          <Text className="text-white">···</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white text-lg mt-4">{post.content}</Text>
      <View className="flex-row justify-start mt-4" style={{ columnGap: 16 }}>
        <Text className="text-gray-400">❤️ {post.likes}</Text>
        <Text className="text-gray-400">🔁 {post.shares}</Text>
        <Text className="text-gray-400">💬 {post.comments}</Text>
      </View>
    </View>
  );
};

export const CTACard = () => {
  return (
    <View className="py-4 mx-2">
      <View className="bg-gray-800 rounded-lg p-4 flex-row items-center">
        <Image
          src={
            'https://images.unsplash.com/photo-1718931216724-40371852f48b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          className="w-12 h-12 rounded-full"
        />
        <TextInput
          className="bg-gray-900 text-white p-2 rounded-lg flex-1 ml-4"
          placeholder="What's happening, Mark?"
          placeholderTextColor="gray"
        />
      </View>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity className="bg-slate-600 px-4 py-2 rounded-lg flex-1 mx-1">
          <Text className="text-white text-center">Media</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-slate-600 px-4 py-2 rounded-lg flex-1 mx-1">
          <Text className="text-white text-center">GIF</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-slate-600 px-4 py-2 rounded-lg flex-1 mx-1">
          <Text className="text-white text-center">Emoji</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-slate-600 px-4 py-2 rounded-lg">
          <Text className="text-white">Send ➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
