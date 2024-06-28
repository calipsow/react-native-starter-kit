import React from 'react';
import { Text, View } from 'react-native';
import RNSButton from '../../../../components/Button';
import { styles } from '../Shop';
import { useNavigation } from '@react-navigation/native';
import {
  FormSubmitButton,
  SecondarySubmitButton,
  SubmitButton,
} from '../../../../components/SubmitButton';

export const CTA = () => {
  return (
    <View className="rounded-xl bg-white p-4">
      {/* ZusammenStehenWir Blog Promotion */}

      <Text className="text-slate-950 font-extrabold text-2xl">
        Latest Tech Trends
      </Text>
      <Text style={styles.footerSubHeaderText} className="mb-4">
        Incididunt irure proident qui laboris et eiusmod in.Duis sint amet dolor
        laboris magna ut ea incididunt ut officia tempor ut labore.
      </Text>
      <FormSubmitButton title="Ship Native Blog" />
    </View>
  );
};
