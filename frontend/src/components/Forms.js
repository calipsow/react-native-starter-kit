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
  className = '',
}) {
  return (
    <View className="mb-2 mt-2">
      {label && (
        <Text className="block text-sm text-slate-400 font-medium mb-1">
          {label} <Text className="text-red-900">*</Text>
        </Text>
      )}
      <TextInput
        onChangeText={text => onChange({ text, label, id })}
        style={fieldStyles ? fieldStyles : styles.input}
        className={
          'bg-slate-800 text-gray-200 rounded-lg px-3 py-3.5 text-lg w-full text-sm text-slate-400 font-medium' +
            className || ''
        }
        placeholder={placeholder}
        placeholderTextColor="#71717ae0"
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
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: getFontSize(16),
  },
});
