import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { flexBoxRow, screenPadding } from '../../../../styles/partials';
import { colors, fonts } from '../../../../styles';
import getFontSize from '../../../../functions/ui/resolve-relative-font-size';
import {
  resolveAdminAccessLevel,
  resolveRole,
} from '../../../../hooks/auth/use-auth-listener';
import FBImage from '../../../../components/FBImage';
import { pbImage } from '../../../../constants/constants';

const AccountMeta = ({ userData }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    if (typeof isAdmin === 'boolean') return;
    resolveRole(userData.uid).then(role => setIsAdmin(role === 'admin'));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.iconContainer}>
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
        </View>
        <View style={{}}>
          <Text style={styles.username} numberOfLines={1}>
            {userData.username || userData.displayName || 'ZSW Nutzer'}
          </Text>
          <Text
            style={[
              styles.username,
              {
                color: colors.lightGray,
                fontSize: getFontSize(14),
                marginLeft: 10,
                lineHeight: 16,
                fontFamily: fonts.primaryRegular,
              },
            ]}
          >
            {!isAdmin ? 'Beigetreten 2024' : 'Administrator'}
          </Text>
        </View>
      </View>

      {isAdmin && (
        <View style={styles.socialLinks}>
          <Text style={styles.link}>ZSW · Admin</Text>
        </View>
      )}

      {false && (
        <View style={styles.socialInfo}>
          <Text style={styles.socialInfoText}>
            {userData.event_commitments.length + ' Events zugesagt'}
          </Text>
          {false && (
            <Text style={styles.socialInfoText}>18 Events Gespeichert</Text>
          )}
        </View>
      )}

      {false && (
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>Sachsen-Anhalt</Text>
          <Text style={styles.metaText}>Magdeburg</Text>
        </View>
      )}

      {false && (
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 120,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: '#000' }}>Folgen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 65,
    height: 65,
    borderRadius: 30.5, // Tailwind's rounded-full
  },
  container: {
    paddingTop: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: colors.bluish,
    fontSize: getFontSize(18),
    marginLeft: 10,
    fontFamily: fonts.primaryBold,
  },
  userHandle: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 5,
  },
  linksContainer: {
    marginTop: 5,
  },
  link: {
    color: 'lightblue',
    fontFamily: fonts.primaryBold,
    fontSize: getFontSize(15),
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  socialInfo: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  socialInfoText: {
    color: colors.bluish,
    fontFamily: fonts.primaryBold,
    fontSize: getFontSize(16),
  },
  metaInfo: {
    gap: 10,
    flexDirection: 'row',
    marginTop: 5,
  },
  metaText: {
    color: colors.bluish,
    fontFamily: fonts.primaryRegular,
    fontSize: getFontSize(16),
  },
});

export default AccountMeta;
