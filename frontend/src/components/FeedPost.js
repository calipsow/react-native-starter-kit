/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PopupMenu from './PopUpMenu';
import { fbImage } from '../constants/constants';
import formatDateTimeString from '../helpers/format-datetime';
import useSharing from '../hooks/app/use-sharing';
import useImageDimensions from '../hooks/utilities/use-size-from-sourced-image';
import { colors, fonts, width } from '../styles';
import {
  appThemeColor,
  blueCaptionText,
  bodyTextRegular,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
} from '../styles/partials';
import { AccountMeta } from '../modules/pages/AccountMetaLoader';
import getFontSize from '../helpers/resolve-relative-font-size';

const ContentPost = ({ poster = '', description, title }) => {
  const [openMenu, setOpenMenu] = useState(false); // handles menu
  const { handleSharingAction } = useSharing(); // social sharing
  const [_poster] = useState(poster || fbImage);

  const [readMore, setReadMore] = useState(false); // for large card text content
  const { relativeHeight, imgWidth, imgHeight } = useImageDimensions(
    poster,
    width,
  ); // adjusts the image relative to device sizes and original image sizes, ensuring images are displayed best as possible
  const [height, setHeight] = useState(600); // initial height for the image

  // adjusts the image dimensions based on the dimensions of the source image
  useEffect(() => {
    if (!imgWidth || !imgHeight) return;
    if (imgWidth > relativeHeight) setHeight(relativeHeight);
  }, [relativeHeight]);

  return (
    <View style={styles.post}>
      <ShareOptionsMenu />
      <View style={styles.header}>
        <AccountMeta userData={{}} />
        <ShareButton />
      </View>
      {/* Post Body Content */}
      <View style={styles.body}>
        <Pressable onPress={() => {}}>
          <View>
            <CardImage />
            <CardTitle title={title} />
            <PublishedAt />
          </View>
        </Pressable>
        {/* Text Content */}
        <Pressable onPress={() => setReadMore(!readMore)}>
          <Text
            style={[bodyTextRegular, { paddingHorizontal: 12 }]}
            numberOfLines={readMore ? 5000 : 5}
          >
            {description ||
              'Culpa magna ut aliqua commodo fugiat sunt ullamco. Sunt in reprehenderit veniam velit pariatur id tempor magna esse et cillum ut quis nulla. Sit ullamco tempor eu cupidatat laboris. Ea proident et cillum in sunt officia et fugiat exercitation cillum do in proident voluptate.'}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  function ShareOptionsMenu() {
    return (
      <PopupMenu
        onItemPressed={share_action =>
          handleSharingAction(
            share_action,
            'Sharable Deeplink\n\n' + 'https://app.domain.com/app/content/',
          )
        }
        popupMenuStyles={{ left: 0, top: 56 }}
        visible={openMenu}
        onClose={() => setOpenMenu(false)}
      />
    );
  }

  function ShareButton() {
    return (
      <TouchableOpacity onPress={() => setOpenMenu(!openMenu)}>
        <Entypo
          name="share"
          size={25}
          color={colors.lightBlue}
          style={styles.shareIcon}
        />
      </TouchableOpacity>
    );
  }

  function CardImage({ uri = fbImage }) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.threadImage,
          {
            height: height,
          },
        ]}
        resizeMethod="auto"
        resizeMode="contain"
      />
    );
  }
};

export const styles = StyleSheet.create({
  shareIcon: {
    margin: 'auto',
    padding: 5,
    paddingRight: 0,
    paddingTop: 10,
  },
  threadImage: {
    width: '100%',
    height: Dimensions.get('window').width,
    objectFit: 'cover',
    marginBottom: 8,
  },
  cardTitle: {
    ...mediumHeadlineText,
    letterSpacing: 0,
    marginBottom: 0,
    opacity: 0.83,
    paddingHorizontal: 12,
    fontSize: getFontSize(19),
  },
  post: {
    backgroundColor: appThemeColor.darkBlue, // Tailwind's bg-white
    marginVertical: 0, // space-y-2.5 in Tailwind
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4, // for Android shadow
    paddingBottom: 40, // Tailwind's p-5
    paddingHorizontal: 0, // Tailwind's p-5
    width: '100%',
    gap: 15,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // items-start in Tailwind
    marginBottom: 0, // Tailwind's mb-3
    paddingHorizontal: 12,
  },
  userContainer: {
    marginLeft: -2,
    paddingTop: 0,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center', // Tailwind's items-center
  },
  userImage: {
    width: 39,
    height: 39,
    borderRadius: 22.5, // Tailwind's rounded-full
  },
  userName: {
    color: colors.white, // Tailwind's text-slate-800
    fontSize: getFontSize(16), // Tailwind's text-sm
    marginBottom: 1, // Tailwind's mb-0.5
    fontFamily: fonts.primaryBold,
    lineHeight: 16,
  },
  postTime: {
    color: colors.lightGray, // Tailwind's text-slate-500
    fontSize: getFontSize(14), // Tailwind's text-xs
    fontFamily: fonts.primarySemiBold,
    lineHeight: 14,
    letterSpacing: -0.2,
  },
  body: {
    color: '#1f2937', // Tailwind's text-slate-800
    fontSize: getFontSize(14), // Tailwind's text-sm
    lineHeight: 19, // Tailwind's leading-5
    // Tailwind's mb-5
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Tailwind's space-x-4
    gap: 30,
    paddingHorizontal: 12,
  },
  footerText: {
    color: colors.bluish, // Tailwind's text-slate-400
    fontSize: getFontSize(19), // Tailwind's text-sm
    fontFamily: fonts.primaryRegular,
    opacity: 0.7,
    lineHeight: 20,
  },
  socialInteractionBox: {
    ...flexBoxRow,

    columnGap: 12,
    paddingHorizontal: 12,
    marginHorizontal: 0,
    marginTop: 2,
  },
  socialCaptionTxt: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    opacity: 1,
    fontWeight: '600',
  },
  socialCounter: {
    opacity: 1,
    fontWeight: 'bold',
    fontFamily: fonts.primaryBold,
  },
});

export default ContentPost;

// card ui partials

function CardTitle({ title = '' }) {
  return (
    <Text style={styles.cardTitle} numberOfLines={5}>
      {title ||
        'Labore nulla occaecat sit velit quis reprehenderit dolore laboris quis et nisi velit.'}
    </Text>
  );
}

function PublishedAt({ timeString = new Date().toISOString() }) {
  return (
    <View style={[flexBoxRow, { opacity: 0.8, paddingHorizontal: 12 }]}>
      <Text
        style={[
          {
            ...blueCaptionText,
            paddingHorizontal: 12,
          },
        ]}
      >
        {formatDateTimeString(timeString)}
      </Text>
    </View>
  );
}
