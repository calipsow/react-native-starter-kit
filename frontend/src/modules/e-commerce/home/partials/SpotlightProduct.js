import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNSButton from '../../../../components/Button';
import { colors } from '../../../../styles';
import { smallCaptionTextGray } from '../../../../styles/partials';
import { styles } from '../Shop';
import { useNavigation } from '@react-navigation/native';
import getFontSize from '../../../../functions/ui/resolve-relative-font-size';

export const SpotlightProduct = ({
  imageSrc = 'https://example.com/image.jpg',
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Pressable onPress={() => navigation.navigate('Collection')}>
        <Image source={{ uri: imageSrc }} style={styles.cardImage} />
      </Pressable>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          Mode Based Mechanical Keyboard For Gaming and Office
        </Text>
        <Text
          style={[
            smallCaptionTextGray,
            {
              color: colors.primaryDark,
              marginBottom: 5,
              fontSize: getFontSize(17),
              letterSpacing: -0.2,
            },
          ]}
        >
          The color-changing LEDs react to the music you are listening to and
          create a colorful and entertaining atmosphere.
          {'\n'}
          It is easy to use and install and has built-in microphone technology
          that matches the light to the rhythms and beats of your music.
        </Text>
        <View style={styles.cardFooter}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {/*<Text style={[grayCaption, {}]}></Text>*/}
            <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
              {['', '', '', '', ''].map((_, i) => (
                <FontAwesome
                  key={`star-${i}`}
                  name="star"
                  color={colors.yellow}
                  size={20}
                />
              ))}
            </View>
          </View>
          <Text style={styles.cardPrice}>$89.00</Text>
        </View>
        <View style={styles.demoButtonsContainer}>
          <RNSButton
            style={[styles.demoButton, { flexBasis: '47%' }]}
            secondary
            caption="Details"
            bgColor={colors.primary}
            onPress={() => navigation.navigate('Product')}
          />
          <RNSButton
            bordered
            style={[
              styles.demoButton,
              { flexBasis: '47%', borderColor: colors.lightBlue },
            ]}
            primary
            caption="Add"
            onPress={() => navigation.navigate('Product')}
          />
        </View>
      </View>
    </View>
  );
};
