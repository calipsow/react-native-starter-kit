/* eslint-disable no-undef */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FBImage from '../../../components/FBImage';
import PopupMenu from '../../../components/PopUpMenu';
import SlideUpComponent from '../../../components/SlideUpGestureModal';
import { fbImage, pbImage } from '../../../constants/constants';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import formatDateTimeString from '../../../helpers/format-datetime';
import useSharing from '../../../hooks/app/use-sharing';
import useFetchPublicUserData from '../../../hooks/firebase/use-fetch-public-user-data';
import useImageDimensions from '../../../hooks/utilities/use-size-from-sourced-image';
import { colors, fonts, width } from '../../../styles';
import {
  appThemeColor,
  blueCaptionText,
  bodyTextRegular,
  flexBoxRow,
  grayCaption,
  mediumHeadlineText,
  screenPadding,
} from '../../../styles/partials';
import { SocialInteractionBadge } from '../../events/event/SingleEventView';
import useClickAnalytics from '../../../hooks/analytics/use-click-event-analytics';
import generateUniqueID from '../../../helpers/generate-uid';
import { AccountContext } from '../../AppView';
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

export const AccountMeta = ({
  userData = {},
  type = 'Event',
  captionText = '',
  containerStyles = {},
}) => {
  const navigation = useNavigation();

  const handleClick = async () => {
    navigation.navigate('User Account', {
      screen: 'Statistiken',
      params: { user_uid: userData.uid },
    });
  };

  return (
    <Pressable onPress={handleClick}>
      <View style={[styles.userContainer, containerStyles]}>
        <FBImage
          src={userData?.photoURL || pbImage}
          fallbackSrc={pbImage}
          style={[
            styles.userImage,
            !userData?.photoURL && { backgroundColor: colors.white },
          ]}
          fallbackStyles={{
            width: 34,
            height: 34,
            backgroundColor: colors.white,
          }}
        />

        <View style={{ paddingTop: 5 }}>
          {
            <Text style={styles.userName}>
              {userData?.displayName
                ? userData?.displayName
                : type === 'Article'
                ? 'Zusammen Stehen Wir · Admin'
                : 'Zusammen Stehen Wir · Nutzer'}
            </Text>
          }
          <Text style={styles.postTime} numberOfLines={1}>
            {captionText
              ? captionText
              : type === 'Event'
              ? 'Hat ein Event erstellt'
              : 'Hat einen Artikel veröffentlicht'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const FeedArticlePost = ({
  poster = 'https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fapp%2Fimages%2Fimage-error-fallback.png?alt=media&token=a874f503-f8c2-47e4-a45e-62c3cbd28f4f',
  startDate = '',
  description,
  title,
  type,
  data = {},
  creator_uid,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { handleSharingAction } = useSharing();
  const [isSlideUpVisible, setIsSlideUpVisible] = useState(false); // slide up component
  const [_poster, setPoster] = useState(
    data.event_poster || data.poster || poster || fbImage,
  );

  const navigation = useNavigation();
  const [readMore, setReadMore] = useState(false);
  const { fetchUserError, fetchUserData, loadingUser, userData, setUserData } =
    useFetchPublicUserData();
  const committedUser = useFetchPublicUserData();
  const { relativeHeight, error, imgWidth, imgHeight } = useImageDimensions(
    poster,
    width,
  );
  const [height, setHeight] = useState(600);
  const [lastCommittingUser, setLastCommittingUser] = useState(null);
  /*
  const PAGE_ROUTING = {
    'Blog Articles': 'Article',
    'Event Feed': 'Event',
  };
  const navigationState = useNavigationState(
    state => state.routes[state.index].name,
  );*/
  const handlePressOnContent = () => {
    // console.log(PAGE_ROUTING[navigationState] || 'Event');
    if (!data) return;
    if (data?.article_id || data?.event_id) {
      if (data?.event_id) {
        return navigation.navigate('Single Event', {
          event_id: data?.event_id,
        });
      }
      if (data?.article_id) {
        return navigation.navigate('Single Article', {
          article_id: data?.article_id,
        });
      }
    }
  };

  const resolveSharableDeepLink = async action_id => {
    let deepLinks = ['https://zusammen-stehen-wir.de/app/', 'zsw://'];
    let sharingMessage = 'ZSW App';
    if (data.article_id) {
      deepLinks = deepLinks.map(
        variant => `${variant}article/${data.article_id}`,
      );
      sharingMessage = `${sharingMessage}\n\nHey hast du schon den Artikel von ZSW gelesen?\n\n${deepLinks[0]}`;
    }
    if (data.event_id) {
      deepLinks = deepLinks.map(variant => `${variant}event/${data.event_id}`);
      sharingMessage = `${sharingMessage}\n\nHey hast du schon die neue Veranstaltung gesehen?\n\n${deepLinks[0]}`;
    }
    handleSharingAction(action_id, sharingMessage);
  };

  // adjusts the image dimensions based on the dimensions of the source image
  useEffect(() => {
    if (!imgWidth || !imgHeight) return;
    if (imgWidth > relativeHeight) setHeight(relativeHeight);
  }, [relativeHeight]);
  // fetches the user wich is the content from based on the user id

  useEffect(() => {
    fetchUserData(creator_uid);
    // console.log(data);
  }, []);

  useEffect(() => {
    // userData && console.log(userData.displayName);
    fetchUserError &&
      console.error('FIREBASE FETCH USER DATA ERROR', fetchUserError);
  }, [fetchUserError, userData]);

  useEffect(() => {
    if (
      !lastCommittingUser &&
      Array.isArray(data?.event_commitments) &&
      data?.event_commitments.length
    ) {
      committedUser.fetchUserData(data?.event_commitments.at(-1));
    }
  }, [lastCommittingUser]);

  return (
    <View style={styles.post}>
      <PopupMenu
        onItemPressed={resolveSharableDeepLink}
        popupMenuStyles={{ left: 0, top: 56 }}
        visible={openMenu}
        onClose={() => setOpenMenu(false)}
      />
      {/* Header */}
      <View style={styles.header}>
        {userData ? (
          <AccountMeta userData={userData} type={type} />
        ) : (
          <AccountMetaLoader />
        )}
        <TouchableOpacity onPress={() => setOpenMenu(!openMenu)}>
          <Entypo
            name="share"
            size={25}
            color={colors.lightBlue}
            style={[
              {
                margin: 'auto',
                padding: 5,
                paddingRight: 0,
                paddingTop: 10,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View style={styles.body}>
        <Pressable onPress={handlePressOnContent}>
          <View>
            <Image
              source={{ uri: _poster }}
              style={[
                styles.threadImage,
                {
                  width: '100%',
                  height: height,
                },
              ]}
              resizeMethod="auto"
              ActivityIndicator={
                <ActivityIndicator
                  size={'small'}
                  color={colors.lightBlue}
                  style={{ margin: 'auto' }}
                />
              }
              onError={e => {
                e.target.onError = null;
                fbImage !== _poster && setPoster(fbImage);
              }}
              resizeMode="contain"
            />
            {/* Social Interactions */}
            {data && (
              <View
                style={[
                  flexBoxRow,
                  {
                    columnGap: 12,
                    ...screenPadding,
                    marginHorizontal: 0,
                    marginTop: 2,
                  },
                ]}
              >
                {typeof data.views === 'number' ? (
                  <SocialInteractionBadge
                    textStylesCount={{
                      opacity: 1,
                      fontWeight: 'bold',
                      fontFamily: fonts.primaryBold,
                    }}
                    textStylesCaption={{
                      color: colors.white,
                      fontFamily: fonts.primaryBold,
                      opacity: 1,
                      fontWeight: '600',
                    }}
                    containerStyles={{ columnGap: 4, opacity: 0.8 }}
                    count={data.views}
                    countCaptionVariants={['Aufruf', 'Aufrufe']}
                    icon={() => <></>}
                  />
                ) : null}
                {data?.event_commitments?.length ? (
                  <SocialInteractionBadge
                    textStylesCount={{
                      opacity: 1,
                      fontWeight: 'bold',
                      fontFamily: fonts.primaryBold,
                    }}
                    textStylesCaption={{
                      color: colors.white,
                      fontWeight: '600',
                      fontFamily: fonts.primaryBold,
                      opacity: 1,
                    }}
                    containerStyles={{ columnGap: 4, opacity: 0.8 }}
                    count={data?.event_commitments?.length}
                    countCaptionVariants={['Zusage', 'Zusagen']}
                    icon={() => <></>}
                  />
                ) : null}
              </View>
            )}

            <Text
              style={[
                mediumHeadlineText,
                {
                  letterSpacing: 0,
                  marginBottom: 0,
                  opacity: 0.83,
                  ...screenPadding,
                  fontSize: getFontSize(19),
                },
              ]}
              numberOfLines={5}
            >
              {title || 'Keine Titelbeschreibung vorhanden'}
            </Text>
            {/* Veranstaltungsstart oder Artikel veröffentlicht am */}
            <View
              style={[
                flexBoxRow,
                { opacity: 0.8 },
                data.article_id && { ...screenPadding },
              ]}
            >
              {startDate ? (
                <Text
                  style={[
                    {
                      ...blueCaptionText,
                    },
                    type === 'Event' && { ...screenPadding },
                  ]}
                >
                  {formatDateTimeString(startDate, type)}
                </Text>
              ) : null}
            </View>
          </View>
        </Pressable>
        {/* Location */}
        {type === 'Event' ? (
          <View style={{ ...screenPadding }}>
            <Text style={[grayCaption]}>
              {data?.location?.province
                .replace(
                  data?.location?.province[0],
                  data?.location?.province[0].toUpperCase(),
                )
                ?.trim()}
            </Text>
          </View>
        ) : null}

        {/* Description */}
        {description?.length >= 25 ? (
          <Pressable onPress={() => setReadMore(!readMore)}>
            <Text
              style={[bodyTextRegular, { ...screenPadding }]}
              numberOfLines={readMore ? 5000 : 5}
            >
              {description}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Slide Up Component */}
      {isSlideUpVisible && (
        <SlideUpComponent
          isVisible={isSlideUpVisible}
          onClose={() => setIsSlideUpVisible(false)}
          headerText="Optionen"
        >
          <Text style={mediumHeadlineText}>Something</Text>
        </SlideUpComponent>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  threadImage: {
    width: '100%',
    height: Dimensions.get('window').width,
    objectFit: 'cover',

    marginBottom: 8,
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
    ...screenPadding,
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
    ...screenPadding,
  },
  footerText: {
    color: colors.bluish, // Tailwind's text-slate-400
    fontSize: getFontSize(19), // Tailwind's text-sm
    fontFamily: fonts.primaryRegular,
    opacity: 0.7,
    lineHeight: 20,
  },
});

export default FeedArticlePost;
