import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Tag from '../../components/Tag';
import useAuthState from '../../hooks/auth/use-auth-state';
import useGetDocument from '../../hooks/firebase/use-get-document';
import useExternalLink from '../../hooks/utilities/use-external-link';
import ScreenWrapper from '../layouts/ScreenWrapper';
import { sampleBannerData } from '../../constants/constants';
import { AccountContext } from '../AppView';

const HomeTags = [
  {
    text: 'Ship Native Starter',
    action_id: 'ship_native',
  },
];

const HomeTag = ({
  action_id,
  text,
  onPress = function (action_id) {},
  containerStyles,
  accountContext,
}) => (
  <Tag
    text={text}
    className={`font-bold text-white bg-primary border-primary-dark ${containerStyles}`}
  />
);

const Home = () => {
  const navigation = useNavigation();
  const [accountContext] = useContext(AccountContext);
  const { documentData, setDocumentData, error } = useGetDocument();
  const linkHook = useExternalLink();

  useEffect(() => {
    if (!documentData) {
      setTimeout(() => setDocumentData(sampleBannerData), 1500); // Simulate API call
    }
  }, [accountContext, documentData]);

  useEffect(() => {
    if (error && error.toLowerCase().includes('offline') && !documentData) {
      setTimeout(() => setDocumentData(sampleBannerData), 5000);
    }
  }, [error, documentData]);

  if ((!documentData && !error) || !accountContext)
    return (
      <ScreenWrapper className="items-center justify-center">
        <ActivityIndicator size="large" color="#fff" className="m-auto p-5" />
        <Text className="text-center text-lg m-auto">Loading...</Text>
      </ScreenWrapper>
    );

  if (!documentData && error && !error.toLowerCase().includes('offline'))
    return (
      <ScreenWrapper className="items-center justify-center">
        <MaterialIcons
          name="error-outline"
          size={100}
          color="red-500"
          className="m-auto p-4 opacity-80"
        />
        <Text className="text-center text-lg m-auto max-w-xs">
          An error occurred, please restart the app. We are working on a
          solution.
        </Text>
      </ScreenWrapper>
    );

  return (
    <KeyboardAwareScrollView className="p-3 antialiased bg-slate-900 text-slate-200 tracking-tight flex-1">
      {/* Header section */}
      <View className="flex-row justify-between items-center">
        {/* Header Badges */}
        {HomeTags.map(tag => (
          <HomeTag
            key={tag.action_id}
            action_id={tag.action_id}
            text={tag.text}
            onPress={action => console.log(action)}
            accountContext={accountContext}
          />
        ))}
        <View className="flex-row pb-2.5 gap-2.5 justify-end items-center">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Events', { screen: 'Event Feed' })
            }
          >
            <Ionicons name="newspaper" color="#fff" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Title section */}
      <View className="pt-2.5">
        <View>
          <Text className="font-bold text-slate-200 text-4xl mx-w-[200px]">
            Welcome ✨
          </Text>
          <Text className="text-gray-300 text-lg">
            Theres a lot going on, stay up to date with us
          </Text>
        </View>
      </View>
      {/* Promotional section */}
      {documentData && (
        <TouchableOpacity
          disabled={!documentData.external_link}
          onPress={() =>
            documentData.external_link
              ? linkHook.openLink(documentData.external_link)
              : {}
          }
          className="mb-1.5 bg-blue-200 rounded-lg mt-5 items-center justify-center border border-slate-100"
        >
          <View className="p-4 bg-gray-900/80 w-full rounded-lg">
            <Text className="font-bold text-slate-300 text-2xl pr-20 leading-7">
              {documentData.title}
            </Text>
            <Text className="text-gray-300 text-lg max-w-xs">
              {documentData.content}
            </Text>
          </View>
          <Image
            source={{ uri: documentData.image }}
            className="absolute w-full h-full rounded-lg z-[-1]"
          />
        </TouchableOpacity>
      )}
      {error && <Text className="text-yellow-200 px-3">{error}</Text>}
      <View className="mt-5"></View>
    </KeyboardAwareScrollView>
  );
};

export default Home;
