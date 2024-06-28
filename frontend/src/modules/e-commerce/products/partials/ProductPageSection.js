import React from 'react';
import { View, Text } from 'react-native';
import { sectionTitleCreme } from '../../../../styles/partials';

export const ProductPageSection = ({ children, title }) => (
  <View style={[{ paddingVertical: 5 }]}>
    <Text className="text-slate-100 font-semibold text-2xl pt-1">
      {title && title}
    </Text>
    {children}
  </View>
);
