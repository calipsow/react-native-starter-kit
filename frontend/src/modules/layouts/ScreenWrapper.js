import React from 'react';
import { View } from 'react-native';

const ScreenWrapper = ({ children }) => (
  <View className="flex-1 bg-slate-800 justify-center items-center">
    {children}
  </View>
);

export const ScreenWrapperDefault = ({ children, customStyles }) => (
  <View className={`flex-1 bg-slate-800 ${customStyles}`}>{children}</View>
);

export default ScreenWrapper;
