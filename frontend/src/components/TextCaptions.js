import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import getFriendlyErrorMessage from '../helpers/message-from-firebase-error';
import { colors } from '../styles';
import { smallCaptionTextGray } from '../styles/partials';
import getFontSize from '../functions/ui/resolve-relative-font-size';

export function HintTextCaption({ caption = '' }) {
  return (
    <Text style={[smallCaptionTextGray, styles.subHeader]}>{caption}</Text>
  );
}
export function TextCaptionWarning({ errorText = '', text = '' }) {
  return (
    <Text
      style={[
        styles.subHeader,
        {
          color: colors.brightYellow,
        },
      ]}
    >
      {errorText ? getFriendlyErrorMessage(errorText) : text}
    </Text>
  );
}

export const SmallCaptionHint = ({ caption = '' }) => (
  <Text style={[smallCaptionTextGray, { textAlign: 'center' }]}>{caption}</Text>
);

export const SmallCaptionLink = ({
  linkText = '',
  onPress = function () {},
}) => (
  <Pressable onPress={onPress} style={{ padding: 5 }}>
    <Text
      style={[
        smallCaptionTextGray,
        styles.linkText,
        {
          marginBottom: 13,
          textAlign: 'center',
        },
      ]}
    >
      {linkText}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  subHeader: {
    fontSize: getFontSize(16),
    color: '#9CA3AF', // text-gray-400
    textAlign: 'center',
    marginBottom: 30,
  },
  agreementText: {
    fontSize: getFontSize(15),
    color: '#9CA3AF', // text-gray-500
    textAlign: 'center',

    lineHeight: 17,
  },
  linkText: {
    color: '#818CF8', // purple-500
    lineHeight: 14,
  },
  S,
});
