import React from 'react';
import { Text } from 'react-native';
import { styles } from '../Product';

export const ProductListItem = ({ children }) => (
  <Text style={styles.listItem}>{children}</Text>
);
