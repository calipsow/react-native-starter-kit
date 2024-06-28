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
import Markdown from './MarkdownView';
import SingleTag from '../../components/SingleTag';
import GalleryScreen from '../gallery/GalleryView';
import { stubImages } from '../gallery/GalleryState';

const HomeTags = [
  {
    text: 'Ship Native',
    action_id: 'ship_native',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [accountContext] = useContext(AccountContext);
  const { documentData, setDocumentData, error } = useGetDocument();
  const linkHook = useExternalLink();

  useEffect(() => {
    // sample api call
    if (!documentData) {
      setTimeout(() => setDocumentData(sampleBannerData), 1500); // Simulate API call
    }
  }, [documentData]);

  if (!documentData || !accountContext)
    return (
      <ScreenWrapper className="items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-center text-lg">Loading...</Text>
      </ScreenWrapper>
    );

  return (
    <KeyboardAwareScrollView className="py-3 px-4 antialiased bg-slate-900 text-slate-200 tracking-tight flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        {HomeTags.map((tag, i) => (
          <SingleTag
            className={'bg-slate-500 p-1.5 rounded-lg px-4'}
            style={{ backgroundColor: '#475569' }}
            key={i}
            txt={tag.text}
          />
        ))}
        {/* Icons top right */}
        <View className="flex-row pb-2.5 gap-2.5 justify-end items-center">
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
      {/* Promotional Badge */}
      <TouchableOpacity
        disabled={!documentData.external_link}
        onPress={() =>
          documentData.external_link
            ? linkHook.openLink(documentData.external_link)
            : {}
        }
        className="mb-1.5 bg-blue-200 rounded-lg mt-2 items-center justify-center border border-slate-100"
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

      {/* Markdown */}
      <GalleryScreen images={stubImages} />
      <View className="h-6" />
    </KeyboardAwareScrollView>
  );
};

export default Home;
