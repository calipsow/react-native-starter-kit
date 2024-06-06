import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DividerCaption = ({ caption = '', textStyle, containerStyle }) => (
  <View style={[styles.dividerContainer, containerStyle && containerStyle]}>
    <View style={styles.dividerLine} />
    <Text style={[styles.dividerText, textStyle && textStyle]}>{caption}</Text>
    <View style={styles.dividerLine} />
  </View>
);

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4B5563',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#9CA3AF',
  },
});
