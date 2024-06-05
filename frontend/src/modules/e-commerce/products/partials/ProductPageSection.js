import React from 'react';
import { View, Text } from 'react-native';
import { sectionTitleCreme } from '../../../../styles/partials';

export const ProductPageSection = ({ children, title }) => (
  <View style={[{ paddingVertical: 30 }]}>
    <Text style={[sectionTitleCreme, { paddingBottom: 10 }]}>
      {title && title}
    </Text>
    {children}
  </View>
);
