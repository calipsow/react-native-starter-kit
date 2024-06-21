import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, Text, View } from 'react-native';
import FBImage from './FBImage';
import { fbImage, pbImage } from '../constants/constants';

const AccountMeta = ({
  userData = {},
  captionText = '',
  containerStyles = {},
}) => {
  const handleClick = async () => {};

  return (
    <Pressable onPress={handleClick} className="flex-row items-center p-2">
      <FBImage
        src={pbImage}
        fallbackSrc={pbImage}
        className="w-8 h-8 rounded-full bg-white"
      />
      <View className="pt-1.5 pl-2">
        <Text className="text-lg font-semibold">calipsow</Text>
        <Text className="text-sm text-gray-500 truncate">
          published an update
        </Text>
      </View>
    </Pressable>
  );
};

// Loading Animation
const AccountMetaLoader = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => fadeInOut());
    };
    fadeInOut();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View className="flex-row items-center p-2">
        <Image
          source={{ uri: fbImage }}
          className="w-8 h-8 rounded-full bg-white"
        />
        <View className="pt-1.5 pl-2">
          <Text className="text-lg font-semibold">Ship Native · User</Text>
          <Text className="text-sm text-gray-500 truncate">
            Shared something with the community...
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export { AccountMeta, AccountMetaLoader };
