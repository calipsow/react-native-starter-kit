import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import getFontSize from '../functions/ui/resolve-relative-font-size';

export function FormField({
  label,
  placeholder,
  type,
  onChange = function ({ text, label, id }) {},
  fieldStyles,
  keyboardType,
  id,
  value,
}) {
  return (
    <View style={styles.formFieldContainer}>
      {false && (
        <Text style={styles.label}>
          {label} <Text style={styles.required}>*</Text>
        </Text>
      )}
      <TextInput
        onChangeText={text => onChange({ text, label, id })}
        style={fieldStyles ? fieldStyles : styles.input}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC"
        secureTextEntry={type === 'password'}
        keyboardType={keyboardType}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formFieldContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#D1D5DB', // text-gray-300
    marginBottom: 4,
  },
  required: {
    color: '#EF4444', // text-red-600
  },
  input: {
    backgroundColor: '#1F2937', // Assuming a dark input bg like bg-gray-800
    color: '#D1D5DB', // text-gray-300
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: getFontSize(16),
  },
});
