import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Tag from '../../components/Tag';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import useAuthState from '../../hooks/auth/use-auth-state';
import useGetDocument from '../../hooks/firebase/use-get-document';
import useExternalLink from '../../hooks/utilities/use-external-link';
import { colors, fonts } from '../../styles';
import {
  appThemeColor,
  captionTxtTrpYellow,
  defaultCardTheme,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import { AccountContext } from '../AppView';

import ScreenWrapper from '../app/ScreenWrapper';

import BlogSection from './sections/BlogSection';
import useBroadcastPushNotification from '../../hooks/notifications/use-send-notification';

const HomeTags = [
  {
    text: 'Zusammen Stehen Wir',
    action_id: 'planed_events_province',
  },
];

const HomeTag = ({
  action_id,
  text,
  onPress = function (action_id) {},
  containerStyles,
  accountContext,
}) => {
  const { sendSingleNotification } = useBroadcastPushNotification();
  const sendTestPush = async () => {
    console.log('sending test push..');
  };
  return (
    <TouchableOpacity onPress={sendTestPush}>
      <Tag
        text={text}
        textStyles={{ fontWeight: 'bold', color: colors.white }}
        containerStyles={[
          {
            ...styles.optionButton,
            backgroundColor: colors.primary,
            borderColor: colors.primaryDark,
          },
          containerStyles && containerStyles,
        ]}
      />
    </TouchableOpacity>
  );
};

const Home = () => {
  const { role } = useAuthState();
  const navigation = useNavigation();
  const [accountContext] = useContext(AccountContext);
  const { documentData, getDocument, error } = useGetDocument();
  const linkHook = useExternalLink();

  const handlePressedTag = action => {};

  useEffect(() => {
    console.log('\n ACCOUNT CONTEXT => ', accountContext);
    if (!documentData)
      getDocument({
        collectionPath: 'Promotions',
        document_id: 'main_promotion',
      });
  }, [accountContext]);

  // if the promo badge fails to load because of network issues it retries it
  useEffect(() => {
    if (!error) return;
    if (error.toLowerCase().includes('offline') && !documentData) {
      setTimeout(
        () =>
          getDocument({
            collectionPath: 'Promotions',
            document_id: 'main_promotion',
          }),
        1000 * 5,
      );
    }
  }, [error]);

  if ((!documentData && !error) || !accountContext)
    return (
      <ScreenWrapper>
        <ActivityIndicator
          style={{ margin: 'auto', padding: 20 }}
          size={'large'}
          color={colors.bluish}
        />
        <Text
          style={[
            mediumHeadlineText,
            { textAlign: 'center', fontSize: getFontSize(19) },
          ]}
        >
          Ladevorgang..
        </Text>
      </ScreenWrapper>
    );

  if (!documentData && error && !error.toLowerCase().includes('offline'))
    return (
      <ScreenWrapper>
        <MaterialIcons
          size={100}
          color={colors.brightRed}
          name="error-outline"
          style={{ margin: 'auto', padding: 15, opacity: 0.8 }}
        />
        <Text
          style={[
            mediumHeadlineText,
            {
              textAlign: 'center',
              fontSize: getFontSize(19),
              maxWidth: 300,
              margin: 'auto',
            },
          ]}
        >
          Ein Fehler ist aufgetreten, bitte starte die App neu. Wir arbeiten an
          einer Lösung.
        </Text>
      </ScreenWrapper>
    );

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Header section */}

      <View style={styles.header}>
        {/* Header Badges */}
        <View style={styles.headerOptions}>
          {HomeTags.map(tag => (
            <HomeTag
              accountContext={accountContext}
              containerStyles={{ borderRadius: 5 }}
              action_id={tag.action_id}
              text={tag.text}
              key={tag.action_id}
              onPress={action => handlePressedTag(action)}
            />
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            gap: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Events', { screen: 'Event Feed' })
            }
          >
            <Ionicons name="newspaper" color={colors.bluish} size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings" color={colors.bluish} size={25} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title section */}
      <View style={styles.titleSection}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { maxWidth: 350 }]}>
            Willkommen {role === 'Admin' && 'zum Admin Panel '}
          </Text>
          <Text style={styles.storageInfo}>
            {role !== 'Admin'
              ? 'Es ist eine Menge los, bleib bei uns auf dem laufenden'
              : 'Verwalte hier eingereichte Events und erstelle Beiträge und Events.'}
          </Text>
        </View>
      </View>

      {/* Promotional section */}

      <React.Fragment>
        {documentData ? (
          <View
            style={{
              marginBottom: 5,
              ...screenPadding,
            }}
          >
            <TouchableOpacity
              disabled={!documentData.external_link}
              style={[styles.promoSection, { borderColor: colors.primaryDark }]}
              onPress={() =>
                documentData.external_link
                  ? linkHook.openLink(documentData.external_link)
                  : {}
              }
            >
              <View
                style={{
                  padding: 20,
                  backgroundColor: colors.darkGray + 'ae',
                  width: '100%',
                  borderRadius: 10,
                }}
              >
                <Text style={styles.promoText}>{documentData.promo_title}</Text>
                <Text
                  style={[
                    styles.promoText,
                    {
                      color: colors.white,
                      fontSize: getFontSize(16),
                      maxWidth: 350,
                    },
                  ]}
                >
                  {documentData.promo_content}
                </Text>
              </View>
              <Image
                source={{
                  uri:
                    documentData.promo_image ||
                    'https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fapp%2Fimages%2Fjohn-cameron--_5IRj1F2rY-unsplash.jpg?alt=media&token=8fdde37b-9163-455a-9377-7b9a103329be',
                }}
                style={styles.illustration}
              />
            </TouchableOpacity>
            {/* Date and file category selector */}
            <View style={styles.fileSelector}>
              <Text style={styles.dateText}>Zusammen Stehen Wir · 2024</Text>
              {/* Buttons for text files and photos */}
            </View>
            {role === 'Admin' && (
              <Text style={[smallCaptionTextGray, { textAlign: 'center' }]}>
                Promotions sind anpassbar.
              </Text>
            )}
          </View>
        ) : (
          error && (
            <Text style={[captionTxtTrpYellow, { ...screenPadding }]}>
              {error}
            </Text>
          )
        )}
      </React.Fragment>

      {/* Theme Sections */}
      <View style={{ marginTop: 20 }}>
        <BlogSection />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  sectionBadgeText: {
    fontFamily: fonts.primarySemiBold,
    fontWeight: 'bold',
    fontSize: getFontSize(20),
    lineHeight: 23,
  },
  image2: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
  },
  header: {
    marginTop: 12,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,

    ...screenPadding,
  },
  headerOptions: {
    flexDirection: 'row',
    paddingBottom: 0,
    gap: 10,
    flexWrap: 'wrap',
  },
  optionButton: {
    marginHorizontal: 0,
    paddingHorizontal: 12,
    borderRadius: 20,
    paddingVertical: 5,
    ...defaultCardTheme,
    backgroundColor: colors.primary,
  },
  titleContainer: {
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  titleSection: {
    marginTop: 0,
    marginBottom: 0,
    ...screenPadding,
  },
  title: {
    fontSize: getFontSize(32),
    fontWeight: 'bold',
    color: colors.bluish,
    maxWidth: Dimensions.get('window').width - 90,
  },
  storageInfo: {
    fontSize: getFontSize(18),
    color: colors.lightGray,
    maxWidth: Dimensions.get('window').width - 90,
  },
  promoSection: {
    marginHorizontal: 0,
    backgroundColor: '#e1ecf4',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.bluish,
  },
  promoText: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: 'white',
  },
  fileSelector: {
    marginHorizontal: 0,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: getFontSize(16),
    color: colors.lightGray,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 360,
  },
  illustration: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    borderRadius: 10,
    // Add further styling for the illustration
  },
  fileCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderColor: colors.primaryDark,
    width: '100%',
    marginTop: 15,
    borderRadius: 5,
    ...screenPadding,
    paddingBottom: 0,
  },
  categoryButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 15,

    width: 150,
    alignItems: 'center',
    ...defaultCardTheme,
    backgroundColor: colors.primary, // Add further styling for the category buttons
  },
  // Additional styles for other components
});

export default Home;
