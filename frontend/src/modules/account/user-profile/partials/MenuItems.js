import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fonts } from '../../../../styles';
import {
  bodyTextRegular,
  flexBoxRow,
  screenPadding,
  smallCaptionTextGray,
} from '../../../../styles/partials';
import getFontSize from '../../../../functions/ui/resolve-relative-font-size';
import useGetDocument from '../../../../hooks/firebase/use-get-document';
import { useNavigation } from '@react-navigation/native';
import { formatNumberShort } from '../../../../helpers/format-int-short-string';
import { SocialInteractionBadge } from '../../../events/event/SingleEventView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
/*
 posted_events: null,
    event_views_overall: null,
    event_commitments_overall: null

*/
export const Menu = ({ userStatistics }) => {
  useEffect(() => {
    userStatistics && console.log(userStatistics);
  }, []);
  if (!userStatistics)
    return (
      <View style={styles.menu}>
        <MenuItem title="Erstellte Events" count={null} />
        <MenuItem title="Klicks insgesamt" count={null} />
        <MenuItem title="Zusagen insgesamt" count={null} />
      </View>
    );
  return (
    <View style={styles.menu}>
      <MenuItem title="Erstellte Events" count={userStatistics.posted_events} />
      <MenuItem
        title="Klicks insgesamt"
        count={userStatistics.event_views_overall}
      />
      <MenuItem
        title="Zusagen insgesamt"
        count={userStatistics.event_commitments_overall}
      />
    </View>
  );
};

export const MenuItem = ({ title, count }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>{title}</Text>
    <Text style={styles.menuText}>
      {typeof count !== 'number' ? '...' : `${formatNumberShort(count)}`}
    </Text>
  </TouchableOpacity>
);

export const EventCard = ({ event_id }) => {
  const { documentData, getDocument, error } = useGetDocument();
  const navigation = useNavigation();
  useEffect(() => {
    if (documentData) return;
    getDocument({
      collectionPath: 'Events',
      document_id: event_id,
    });
  }, []);

  useEffect(() => {
    if (error) {
      console.warn(error);
    }
  }, [error]);

  if (!documentData)
    return (
      <View style={styles.card}>
        <ActivityIndicator
          size={'small'}
          style={{ margin: 'auto' }}
          color={colors.bluish}
        />
      </View>
    );
  return (
    <Pressable
      onPress={() => navigation.navigate('Single Event', { event_id })}
    >
      <View style={styles.card}>
        <Text style={styles.name} numberOfLines={2}>
          {documentData.name}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {documentData.description}
        </Text>
        <View style={[flexBoxRow, { gap: 20, paddingTop: 7 }]}>
          <SocialInteractionBadge
            count={documentData.views || 0}
            icon={() => (
              <MaterialIcons
                name="ads-click"
                size={22}
                color={colors.black}
                style={{ margin: 'auto' }}
              />
            )}
            textStylesCount={{
              opacity: 1,
              fontWeight: 'bold',
              color: colors.black,
              lineHeight: 18,

              fontFamily: fonts.primaryBold,
            }}
            textStylesCaption={{
              color: colors.black,
              fontWeight: '300',
              lineHeight: 18,
              fontFamily: fonts.primaryBold,
              opacity: 1,
            }}
            containerStyles={{ columnGap: 2, opacity: 0.8 }}
            countCaptionVariants={['Klick', 'Klicks']}
          />
          {/* prettier-ignore */}
          {documentData.event_commitments &&
          documentData.event_commitments.length ? (
            <SocialInteractionBadge
              count={documentData.event_commitments.length}
              icon={() => (
                <MaterialIcons
                  name="post-add"
                  size={23}
                  color={colors.black}
                  style={{ margin: 'auto' }}
                />
              )}
              textStylesCount={{
                opacity: 1,
                fontWeight: 'bold',
                color: colors.black,
                lineHeight: 18,
                fontFamily: fonts.primaryBold,
              }}
              textStylesCaption={{
                color: colors.black,
                fontWeight: '300',

                lineHeight: 18,

                fontFamily: fonts.primaryBold,
                opacity: 1,
              }}
              containerStyles={{ columnGap: 2, opacity: 0.8 }}
              countCaptionVariants={['Zusage', 'Zusagen']}
            />
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    padding: 20,
    paddingVertical: 10,
  },
  time: {
    color: '#fff',
    fontSize: getFontSize(17),
  },
  profile: {
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

  details: {
    color: '#aaa',
    fontSize: getFontSize(17),
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  link: {
    color: '#4f8ef7',
  },
  menu: {
    backgroundColor: colors.primaryDark,
    borderRadius: 5,
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#444',
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: fonts.primaryBold,
    fontSize: getFontSize(16),
  },
  card: {
    backgroundColor: colors.bluish + 'e0',
    padding: screenPadding.paddingHorizontal,
    borderRadius: 5,
    width: '100%',
  },
  name: {
    color: colors.primary,
    fontSize: getFontSize(22),
    letterSpacing: -0.15,
    fontWeight: 'bold',
    fontFamily: fonts.primaryBold,
  },
  votings: {
    fontFamily: fonts.primaryBold,
    color: colors.black,
    fontWeight: 'bold',
    fontSize: getFontSize(16),
    letterSpacing: -0.25,
  },
  description: {
    color: colors.primary,
    fontSize: getFontSize(15),
    fontFamily: fonts.primarySemiBold,
    opacity: 1,
  },
});
