import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import {
  ZusammenStehenWir_LOGO_SRC,
  ZusammenStehenWir_META_DATA,
} from '../../../../constants/constants';
import { colors } from '../../../../styles';
import {
  sectionTitleCreme,
  smallCaptionTextGray,
  smallTextGray,
} from '../../../../styles/partials';
import { styles } from '../Shop';

export const SectionPageLinks = ({ navigation, links }) => {
  const LinkItem = ({ text = 'Link', source }) => (
    <Pressable onPress={() => console.log(source || 'nav')}>
      <Text
        style={[
          smallTextGray,
          { color: colors.lightBlue, fontVariant: ['small-caps'] },
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </Pressable>
  );
  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={[sectionTitleCreme, { opacity: 0.7, textAlign: 'center' }]}>
        ZusammenStehenWir Shop
      </Text>
      <View
        style={[styles.footerButtonContainer, { rowGap: 10, flexWrap: 'wrap' }]}
      >
        <View style={{ width: '50%', gap: 10 }}>
          <Image
            source={{ uri: ZusammenStehenWir_LOGO_SRC }}
            style={{
              objectFit: 'contain',
              width: 150,
              height: 90,
              borderRadius: 8,
              opacity: 0.8,
            }}
          />
          <Text style={smallCaptionTextGray}>
            {ZusammenStehenWir_META_DATA.company_name}
          </Text>
        </View>
        <View style={{ width: '50%', gap: 10, alignItems: 'flex-end' }}>
          {[
            'http://otti.ae/ozoefca',
            'http://unocido.la/nek',
            'http://ihtuwga.cf/nape',
          ].map((l, i) => (
            <LinkItem
              key={`${i}-l`}
              source={l}
              text={l.split('://').at(-1).split('/')[0].toUpperCase()}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
