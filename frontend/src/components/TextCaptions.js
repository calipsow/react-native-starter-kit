import React from 'react';
import { Text, Pressable, View } from 'react-native';
import getFriendlyErrorMessage from '../helpers/message-from-firebase-error';
import { useNavigation } from '@react-navigation/native';

export function HintTextCaption({ caption = '' }) {
  return (
    <Text className="text-gray-400 text-center text-lg mb-7.5">{caption}</Text>
  );
}

export function TextCaptionWarning({ errorText = '', text = '' }) {
  return (
    <Text className="text-amber-300 text-center text-lg font-semibold">
      {errorText ? getFriendlyErrorMessage(errorText) : text}
    </Text>
  );
}

export const SmallCaptionHint = ({ caption = '' }) => (
  <Text className="text-gray-400 text-center text-lg">{caption}</Text>
);

export const SmallCaptionLink = ({
  linkText = '',
  onPress = function () {},
}) => (
  <Pressable onPress={onPress} className="py-1.5">
    <Text className="text-indigo-300 text-center text-lg mb-2">{linkText}</Text>
  </Pressable>
);
export function CaptionWithLink({
  screen = 'Sign Up',
  navigationParams = { params: {} },
  caption = '',
  linkText = '',
}) {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-center items-center flex-wrap">
      <Text className="text-gray-400">
        {caption || 'Don&#39;t have an account?'}
      </Text>
      <Pressable onPress={() => navigation.navigate(screen, navigationParams)}>
        <Text className="text-indigo-300">{linkText || 'Register'}</Text>
      </Pressable>
    </View>
  );
}
export function LinkText({ screen = '', linkText = '', className = '' }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate(screen)} className="py-1.5">
      <Text className={'text-indigo-300 ' + className}>
        {linkText || 'Forgot Password?'}
      </Text>
    </Pressable>
  );
}
