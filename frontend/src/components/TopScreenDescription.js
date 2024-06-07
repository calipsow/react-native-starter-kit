import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../styles';
import {
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../styles/partials';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getFontSize from '../functions/ui/resolve-relative-font-size';

export const TopBarMenu = ({
  navigation,
  title = 'Nächste Events',
  navigationRoute = 'Suche',
  navigationParams = {},
  actionButtonText = 'Suche',
  actionButtonIcon,
  hideActionButton = false,
}) => {
  return (
    <View
      style={[
        flexBoxRow,
        screenPadding,
        {
          paddingVertical: 8,
          opacity: 0.8,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
    >
      <Text
        style={[
          mediumHeadlineText,
          { marginBottom: -2, fontSize: getFontSize(22) },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      {!hideActionButton ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(navigationRoute, navigationParams)}
        >
          <View
            style={[
              flexBoxRow,
              {
                gap: 5,
                borderRadius: 8,
                backgroundColor: colors.primaryDark,
                paddingHorizontal: 15,
                paddingVertical: 3,
              },
            ]}
          >
            {typeof actionButtonIcon === 'function' ? (
              actionButtonIcon()
            ) : (
              <FontAwesome
                name="search"
                size={15}
                color={colors.white}
                style={{ margin: 'auto' }}
              />
            )}
            <Text
              style={[
                smallCaptionTextGray,
                {
                  fontSize: getFontSize(18),
                  color: '#fff',
                  fontFamily: fonts.primaryBold,
                },
              ]}
            >
              {actionButtonText}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ height: 27 }}></View>
      )}
    </View>
  );
};
