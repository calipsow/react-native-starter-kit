import React from 'react';
import { Text, View } from 'react-native';
import getFontSize from '../functions/ui/resolve-relative-font-size';
import { colors } from '../styles';
import {
  grayCaption,
  mediumHeadlineText,
  screenPadding,
} from '../styles/partials';

export const SubSectionLayout = ({ children, title, subTitle, styles }) => {
  return (
    <View style={[{ marginBottom: 5, paddingBottom: 20 }]}>
      <View
        style={[
          {
            marginBottom: 20,
            marginVertical: 5,
            paddingHorizontal: 10,
            ...screenPadding,
            alignItems: 'center',
          },
          styles && styles,
        ]}
      >
        <Text
          style={[
            mediumHeadlineText,
            {
              textAlign: 'center',
              fontSize: getFontSize(18),
              letterSpacing: -0.5,
              color: colors.bluish,
              maxWidth: 350,
            },
          ]}
        >
          {title}
        </Text>
        {subTitle && (
          <Text
            style={[
              grayCaption,
              { textAlign: 'center', fontSize: getFontSize(14), maxWidth: 320 },
            ]}
          >
            {subTitle}
          </Text>
        )}
      </View>

      {children}
    </View>
  );
};
export default SubSectionLayout;
