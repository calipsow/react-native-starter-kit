import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AccountContext } from '../AppView';

const ProfileView = () => {
  const [accountCtx] = useContext(AccountContext);
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="bg-slate-900 text-gray-100 min-h-screen">
        <Image
          src={
            'https://images.unsplash.com/photo-1719216324560-523fc4ddb8b9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          className="w-full h-40"
        />
        <View className="items-center mt-[-40px]">
          <View
            className="rounded-full border-4 border-gray-950"
            style={{ elevation: 10, shadowColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <Image
              src={
                'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              className="w-24 h-24 rounded-full"
            />
          </View>
          <View className="flex-row items-center mt-4">
            <TouchableOpacity className="bg-gray-700 py-2 px-4 rounded-xl mx-1">
              <Text className="text-white">✅</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-700 py-2 px-4 rounded-xl mx-1">
              <Text className="text-white">🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-slate-400 py-2 px-4 rounded-xl mx-1">
              <Text className="text-white">Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-center mt-4">
          <Text className="text-2xl font-bold">{accountCtx.username} ✨</Text>
          <Text className="text-sm text-gray-400 mt-1 text-center">
            Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP
            Lover.
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-gray-400">📍 Milan, IT</Text>
            <Text className="text-gray-400 ml-2">🌐 carolynmcneail.com</Text>
          </View>
        </View>
        <View className="mt-16 px-6">
          <View className="flex-row justify-between">
            <TouchableOpacity>
              <Text className="text-white font-bold">General</Text>
              <View className="border-b-2 border-slate-600 mt-1"></View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-gray-400 font-bold">Connections</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-gray-400 font-bold">Contributions</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6">
            <Text className="text-xl font-bold text-white">About Me</Text>
            <Text className="text-gray-400 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileView;
