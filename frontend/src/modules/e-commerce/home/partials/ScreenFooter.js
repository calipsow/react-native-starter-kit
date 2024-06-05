import React from 'react';
import { Text, View } from 'react-native';
import RNSButton from '../../../../components/Button';
import { styles } from '../Shop';
import { useNavigation } from '@react-navigation/native';

export const ScreenFooter = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footerContainer}>
      {/* ZusammenStehenWir Blog Promotion */}

      <Text style={styles.footerSectionTitle}>New Tech Blog Released 🎉</Text>
      <Text style={styles.footerSubHeaderText}>
        Take a breath from shopping and take a look on our tech blog about
        Windows, Apple and much more ✨
      </Text>
      <View style={styles.footerButtonContainer}>
        <RNSButton
          caption="Blogs"
          onPress={() => navigation.navigate('Blogs')}
          secondary
        />
        <RNSButton
          caption="Latest Blog"
          bordered
          onPress={() =>
            navigation.navigate('Blogs', {
              screen: 'Article',
              params: {},
            })
          }
          primary
        />
      </View>
    </View>
  );
};
