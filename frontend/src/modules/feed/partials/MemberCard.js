import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const members = [
  {
    id: 1,
    name: 'Dominik McNeail',
    country: 'IT',
    profileImage:
      'https://images.unsplash.com/photo-1719314835625-c1b4c113086b?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 2,
    name: 'Ivan Mesaros',
    country: 'FR',
    profileImage:
      'https://images.unsplash.com/photo-1719427947920-5eb759c381b8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 3,
    name: 'Tisha Yanchev',
    country: 'DE',
    profileImage:
      'https://images.unsplash.com/photo-1719425061857-8194ff16ee14?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 4,
    name: 'Sergio Gonnelli',
    country: 'IT',
    profileImage:
      'https://images.unsplash.com/photo-1564436644974-d6e275defaa1?q=80&w=1646&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 5,
    name: 'Jerzy Wierzy',
    country: 'ES',
    profileImage:
      'https://images.unsplash.com/photo-1566572176693-74c6688e0141?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 6,
    name: 'Mirko Grubisic',
    country: 'DE',
    profileImage:
      'https://images.unsplash.com/photo-1566713217157-bb5ec782cd65?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
];

const MemberCard = ({ member = members[0] }) => {
  return (
    <View className="bg-gray-800 rounded-lg p-4 my-2 w-full">
      <View className="flex-row justify-between items-center">
        <Image
          style={{ borderColor: 'white', borderWidth: 1 }}
          src={member.profileImage}
          className="w-14 h-14 rounded-full"
        />
        <TouchableOpacity className="bg-gray-700  rounded-lg px-4 py-2">
          <Text className="text-white">···</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-xl font-bold text-white mt-2">{member.name}</Text>
      <Text className="text-gray-400 mt-2">→ {member.country}</Text>
      <Text className="text-sm text-gray-400">{member.description}</Text>
      <View className="flex-row mt-4">
        <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg mr-2">
          <Text className="text-white">Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-600 px-4 py-2 rounded-lg">
          <Text className="text-white">Visit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberCard;
