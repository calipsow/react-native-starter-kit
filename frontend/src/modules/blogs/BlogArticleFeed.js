import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PaginationNumeric from '../../components/PaginationNumeric';
import SearchBar from '../../components/Searchbar';

import useGetDocumentsByFieldValue from '../../hooks/firebase/use-doument-by-field-value';
import { colors, fonts } from '../../styles';
import {
  appThemeColor,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import BlogCard from '../../components/BlogCard';
import { STATIC_BLOG, STATIC_BLOGS } from '../../constants/constants';
import getFontSize from '../../helpers/resolve-relative-font-size';

export const SearchTopBar = ({ headerText = '', captionText = '' }) => {
  const [searchRes, setSearchRes] = useState([]);

  return (
    <React.Fragment>
      <View style={{ gap: 5 }}>
        {headerText && (
          <Text style={[styles.title, { maxWidth: 320 }]}>{headerText}</Text>
        )}
        <SearchBar
          placeholder="Search for users.."
          onSearchResults={results => setSearchRes(results)}
          collectionID={'Users'}
          fieldPaths={['username']}
        />
        {searchRes.map((result, i) => (
          <View key={i} className="w-full bg-slate-700 rounded-xl p-5">
            <Text className="text-xl font-semibold text-slate-100">
              {result['username']}
            </Text>
            <View className="flex-row w-full" style={{ gap: 5 }}>
              <Text className="text-sm font-semibold text-slate-300">
                Role: {result['role']}
              </Text>
              <Text className="text-sm font-semibold text-slate-300">
                UID: {result['uid']}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </React.Fragment>
  );
};

const members = [
  {
    id: 1,
    name: 'Dominik McNeail',
    country: 'IT',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 2,
    name: 'Ivan Mesaros',
    country: 'FR',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 3,
    name: 'Tisha Yanchev',
    country: 'DE',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 4,
    name: 'Sergio Gonnelli',
    country: 'IT',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 5,
    name: 'Jerzy Wierzy',
    country: 'ES',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
  {
    id: 6,
    name: 'Mirko Grubisic',
    country: 'DE',
    profileImage:
      'https://images.unsplash.com/photo-1718900351979-3e00f88386a3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
  },
];

const MemberCard = ({ member }) => {
  return (
    <View className="bg-gray-800 rounded-lg p-4 my-2 w-full">
      <View className="flex-row justify-between items-center">
        <Image src={member.profileImage} className="w-12 h-12 rounded-full" />
        <TouchableOpacity className="bg-gray-700  rounded-xl px-4 py-2">
          <Text className="text-white">···</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-xl font-bold text-white mt-4">{member.name}</Text>
      <Text className="text-gray-400">→ {member.country}</Text>
      <Text className="text-sm text-gray-400 mt-2">{member.description}</Text>
      <View className="flex-row mt-4">
        <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg mr-2">
          <Text className="text-white">Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-600 px-4 py-2 rounded-lg">
          <Text className="text-white">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProfileList = () => {
  return (
    <View className="p-4">
      <SearchTopBar />
      <TouchableOpacity className="bg-slate-600 p-2 rounded-lg mt-3 mb-1">
        <Text className="text-white text-center">+ Add Member</Text>
      </TouchableOpacity>
      {members.map((item, i) => (
        <MemberCard member={item} key={i} />
      ))}
    </View>
  );
};

const Profiles = () => {
  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ProfileList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue, // Tailwind class: bg-white
    // for dark mode you can toggle backgroundColor
  },
  scrollView: {
    // This is equivalent to overflow-y-auto in Tailwind CSS
  },
  content: {
    paddingVertical: 0, // Tailwind class: p-4
    paddingHorizontal: 12,
    // Here you might handle the responsive max width with conditional styles or a wrapping View
  },
  title: {
    paddingTop: 20,
    fontSize: getFontSize(28), // Tailwind class: text-2xl
    fontWeight: 'bold', // Tailwind class: font-bold
    color: colors.textLight, // Tailwind class: text-slate-800
    fontFamily: fonts.primaryBold,
    // Add dark mode styles here if needed
  },
  filtersContainer: {
    // Style for filters container
    marginBottom: 20, // Tailwind class: mb-5
  },
  meetupsCount: {
    ...smallCaptionTextGray,
    marginTop: 12,
    fontSize: getFontSize(18), // Tailwind class: text-sm
    color: colors.lightBlue, // Tailwind class: text-slate-500
    marginBottom: 3, // Tailwind class: mb-4
    fontFamily: fonts.primarySemiBold, // Tailwind class: italic
    // Add dark mode styles here if needed
  },
  // ... Rest of your styles based on the Tailwind classes
});

export default Profiles;
