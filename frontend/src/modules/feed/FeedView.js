import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { CTACard, TextPost } from './partials/TextPostCard';
import { ImagePostCard } from './partials/ImagePostCard';
import { CommentCard, PostCard } from './partials/CommentCard';

export default function FeedView() {
  return (
    <ScrollView className="bg-slate-900">
      <View className="pb-5">
        <CTACard />
        <TextPost />
        <ImagePostCard />
        <PostCard />
        <CommentCard />
      </View>
    </ScrollView>
  );
}
