import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, Text, View } from 'react-native';
import { styles } from './FeedPost';
import FBImage from '../../../components/FBImage';
import { pbImage } from '../../../constants/constants';
import { colors } from '../../../styles';

export const AccountMeta = ({
  userData = {},
  captionText = '',
  containerStyles = {},
}) => {
  const handleClick = async () => {};

  return (
    <Pressable onPress={handleClick}>
      <View style={[styles.userContainer, containerStyles]}>
        <FBImage
          src={pbImage}
          fallbackSrc={pbImage}
          style={[styles.userImage, { backgroundColor: colors.white }]}
          fallbackStyles={{
            width: 34,
            height: 34,
            backgroundColor: colors.white,
          }}
        />

        <View style={{ paddingTop: 5 }}>
          {<Text style={styles.userName}>calipsow</Text>}
          <Text style={styles.postTime} numberOfLines={1}>
            published an update
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

// Loading Animation

export const AccountMetaLoader = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // initiale Transparenz

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // vollständig sichtbar
          duration: 1000, // 1 Sekunde für Fade-In
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true, // optimiert die Animation
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // vollständig unsichtbar
          duration: 1000, // 1 Sekunde für Fade-Out
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => fadeInOut()); // Schleife wiederholen
    };

    fadeInOut(); // Animation starten
  }, [fadeAnim]); // Effekt wird bei Veränderung von `fadeAnim` ausgelöst

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.userContainer}>
        <Image
          source={require('../../../../assets/images/default-avatar.png')}
          style={[styles.userImage, { backgroundColor: 'white' }]}
        />
        <View style={{ paddingTop: 5 }}>
          <Text style={styles.userName}>{'Zusammen Stehen Wir · Nutzer'}</Text>
          <Text style={styles.postTime} numberOfLines={1}>
            {'Hat etwas mit der Community geteilt..'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};
