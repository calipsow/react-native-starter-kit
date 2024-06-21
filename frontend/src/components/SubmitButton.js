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
    className={
      className ||
      `bg-slate-500 text-gray-200 rounded-lg px-6 py-2 items-center mt-2 mb-2`
    }
  >
    <Text className="text-white text-[16px] font-semibold opacity-[.8]">
      {text}
    </Text>
  </TouchableOpacity>
);

export const SecondarySubmitButton = ({
  onPress = function () {},
  text = '',
  className = '',
  textClassName = '',
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={
      className ||
      `rounded-lg px-6 py-2 items-center mt-2 mb-2 border-slate-300 border-solid border`
    }
  >
    <Text
      className={
        textClassName || 'text-slate-300 text-[16px] font-semibold opacity-[.8]'
      }
    >
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

// eslint-disable-next-line no-undef
export const DangerButton = ({
  onPress = function () {},
  text = '',
  className,
  textClassName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-xl px-2 py-1 items-center border-red-300 border-solid border`}
    >
      <Text className={'text-red-300 text-[16px] font-semibold opacity-[.8]'}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
