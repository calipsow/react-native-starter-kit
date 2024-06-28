import React from 'react';
import { Text } from 'react-native';
import { styles } from '../Product';

export const ProductListItem = ({ children }) => (
  <Text className="text-gray-400 font-medium text-lg">{children}</Text>
);
