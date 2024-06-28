import React from 'react';
import { Text, View } from 'react-native';

export default function SingleTag({ txt, style, className, textClassName }) {
  return (
    <View
      style={[style && style]}
      className={className || 'bg-slate-500 p-1 rounded-lg my-0.5 px-2'}
    >
      <Text
        className={textClassName || 'text-slate-100/70 text-xs font-semibold'}
      >
        {txt}
      </Text>
    </View>
  );
}
