import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

const comments = [
  {
    id: 1,
    name: 'Sophie Wenner',
    time: '44min',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `@EricaSpriggs Reading through and really enjoying "Zero to Sold" by Arvid.`,
  },
  {
    id: 2,
    name: 'Kyla Scanlon',
    time: '1h',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `Depends on the company you're running, but if I had to choose just one book, it'd be The Personal MBA by Josh Kaufman.`,
  },
];

export const posts = [
  {
    id: 1,
    name: 'Erica Spriggs',
    time: 'Yesterday at 2:34 PM',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Any book recommendations for a first-time entrepreneur? 📚',
    reactions: {
      likes: 122,
      retweets: 7,
      comments: 298,
    },
    comments: comments,
  },
];

export const CommentCard = ({ comment = comments[0] }) => {
  return (
    <View className="bg-gray-700 rounded-lg p-4 mt-2 mx-2">
      <View className="flex-row items-center">
        <Image src={comment.profileImage} className="w-8 h-8 rounded-full" />
        <View className="ml-4">
          <Text className="text-white font-bold">{comment.name}</Text>
          <Text className="text-gray-400">{comment.time}</Text>
        </View>
      </View>
      <Text className="text-white mt-2">{comment.content}</Text>
    </View>
  );
};

export const PostCard = ({ post = posts[0] }) => {
  return (
    <View className="bg-gray-800 rounded-lg p-4 m-2">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image src={post.profileImage} className="w-12 h-12 rounded-full" />
          <View className="ml-4">
            <Text className="text-white text-lg font-bold">{post.name}</Text>
            <Text className="text-gray-400">{post.time}</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-gray-700  rounded-xl px-4 py-2">
          <Text className="text-white">···</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white mt-4">{post.content}</Text>
      <View className="flex-row mt-4 justify-around">
        <Text className="text-gray-400">❤️ {post.reactions.likes}</Text>
        <Text className="text-gray-400">🔁 {post.reactions.retweets}</Text>
        <Text className="text-gray-400">💬 {post.reactions.comments}</Text>
      </View>
      {post.comments &&
        post.comments.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-400">2 of 67 comments</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">View More Comments</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mt-2">
        <Image
          src={
            'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          className="w-8 h-8 rounded-full"
        />
        <TextInput
          className="bg-gray-900 text-white p-2 rounded-lg flex-1 ml-2"
          placeholder="Write a comment..."
          placeholderTextColor="gray"
        />
      </View>
    </View>
  );
};
