import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { LOGO_SRC } from '../../../../constants/constants';
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
          {
            color: colors.lightBlue,
            fontVariant: ['small-caps'],
            textAlign: 'center',
          },
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </Pressable>
  );
  return (
    <View style={{ marginBottom: 50 }}>
      <View
        style={[
          styles.footerButtonContainer,
          { columnGap: 15, flexWrap: 'wrap' },
        ]}
      >
        <View style={{ gap: 5, alignItems: 'flex-center' }}>
          {[
            {
              link: 'https://development.calllipson.com/about-us',
              txt: 'About Us',
            },
            { link: 'https://development.calllipson.com', txt: 'Services' },
            {
              link: 'https://development.calllipson.com/contact',
              txt: 'Contact',
            },
          ].map((item, i) => (
            <LinkItem key={`${i}-l`} source={item.link} text={item.txt} />
          ))}
        </View>
      </View>
    </View>
  );
};
