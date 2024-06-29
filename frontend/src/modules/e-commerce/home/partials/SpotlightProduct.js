import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNSButton from '../../../../components/Button';
import { colors } from '../../../../styles';
import { smallCaptionTextGray } from '../../../../styles/partials';
import { styles } from '../Shop';
import { useNavigation } from '@react-navigation/native';
import getFontSize from '../../../../helpers/resolve-relative-font-size';
import {
  SecondarySubmitButton,
  SubmitButton,
} from '../../../../components/SubmitButton';

export const SpotlightProduct = ({
  imageSrc = 'https://example.com/image.jpg',
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card} className="rounded-xl bg-slate-300">
      <Pressable onPress={() => navigation.navigate('Collection')}>
        <Image source={{ uri: imageSrc }} style={styles.cardImage} />
      </Pressable>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          Mode Based Mechanical Keyboard For Gaming and Office
        </Text>
        <Text
          style={[
            {
              marginBottom: 5,
              fontSize: getFontSize(17),
              letterSpacing: -0.2,
            },
          ]}
          className="rounded-xl text-slate-800 font-semibold text-sm"
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
              {Array(4)
                .fill()
                .map((_, i) => (
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
          <SecondarySubmitButton
            className={`rounded-lg px-8 py-2.5 items-center mt-2 mb-2 border-slate-900`}
            text="More details"
            textClassName="text-slate-700 text-[16px] font-semibold opacity-[.8]"
            onPress={() => navigation.navigate('Product')}
          />
          <SubmitButton
            text="Add to card"
            className={
              'bg-slate-800 text-gray-800 rounded-lg px-8 py-3 items-center mt-2 mb-2'
            }
            onPress={() => navigation.navigate('Product')}
          />
        </View>
      </View>
    </View>
  );
};
