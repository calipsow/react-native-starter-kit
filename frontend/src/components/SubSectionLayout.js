import React from 'react';
import { Text, View } from 'react-native';

export const SubSectionLayout = ({ children, title, subTitle, styles }) => {
  return (
    <View className="mb-1 pb-5">
      <View className="mb-3 mx-5 py-2 items-center" style={[styles && styles]}>
        <Text className="text-center text-2xl font-semibold text-slate-300 max-w-sm">
          {title}
        </Text>
        {subTitle && (
          <Text className="text-center text-xl font-semibold text-slate-500 max-w-sm">
            {subTitle}
          </Text>
        )}
      </View>

      {children}
    </View>
  );
};
export default SubSectionLayout;
