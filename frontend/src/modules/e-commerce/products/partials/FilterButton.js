import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import getFontSize from '../../../../functions/ui/resolve-relative-font-size';

// Filter Button Component
export const FilterButton = ({ title, isActive = false, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.filterButtonText,
        isActive && styles.filterButtonTextActive,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterButtonText: {
    color: '#1E293B',
    fontSize: getFontSize(14),
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
});
