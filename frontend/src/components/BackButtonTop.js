import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { flexBoxRow, grayCaption } from '../styles/partials';
import { colors } from '../styles';
import getFontSize from '../helpers/resolve-relative-font-size';

const BackButton = ({ styles, backbuttonTitle = '' }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <View style={[_styles.container, flexBoxRow, styles && styles]}>
        <Text style={_styles.text}>
          <Text style={_styles.goBackText} numberOfLines={1}>
            Go Back
          </Text>
          {backbuttonTitle ? ` · ${backbuttonTitle}` : ''}
        </Text>
      </View>
    </Pressable>
  );
};

const _styles = StyleSheet.create({
  container: { alignItems: 'center' },
  text: {
    paddingHorizontal: 12,
    color: colors.bluish,
    paddingVertical: 10,
    paddingBottom: 0,
    ...grayCaption,
  },
  goBackText: {
    color: colors.lightBlue,
    opacity: 0.8,
    fontSize: getFontSize(16),
  },
});

export default BackButton;
