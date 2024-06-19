import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

export const SubmitButton = ({
  onPress = function () {},
  text = '',
  className = '',
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`justify-center items-center p-2 rounded ${className}`}
  >
    <Text className="align-middle text-blue-500 opacity-90 text-lg">
      {text}
    </Text>
  </TouchableOpacity>
);

export function FormSubmitButton({
  loading = false,
  handleSubmit = function () {},
  title = '',
  disabled = null,
}) {
  return (
    <TouchableOpacity
      disabled={typeof disabled === 'boolean' ? disabled : loading}
      className={`bg-slate-800 text-gray-200 rounded-lg px-3 py-3.5 w-full items-center mt-2 mb-2 ${
        loading ? 'bg-gray-400' : 'bg-slate-500'
      } ${disabled ? 'opacity-50' : ''}`}
      onPress={handleSubmit}
    >
      {!loading ? (
        <Text className="text-white text-[17px] font-semibold opacity-[.8]">
          {title}
        </Text>
      ) : (
        <ActivityIndicator size="small" color="#3b82f6" />
      )}
    </TouchableOpacity>
  );
}
