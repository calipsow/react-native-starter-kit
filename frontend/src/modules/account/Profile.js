import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FBImage from '../../components/FBImage';
import { SubmitButton } from '../../components/SubmitButton';
import { fbImage } from '../../constants/constants';

import { colors, fonts } from '../../styles';
import {
  appThemeColor,
  flexBoxRow,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import getFontSize from '../../helpers/resolve-relative-font-size';

function Profile({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Background */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.profileBackground}
      />

      <View style={styles.profileContent}>
        {/* Profile Image */}
        <TouchableOpacity
          onPress={() => {
            /*startImageUpload(`cdn/users/${accountCtx?.uid}`)*/
          }}
        >
          <View style={styles.avatarContainer}>
            <FBImage
              fallbackStyles={{}}
              fallbackSrc={fbImage}
              src={fbImage}
              style={styles.avatar}
            />
          </View>
        </TouchableOpacity>

        {/* Profile Name */}
        <Text style={styles.profileName}>{'Lillie Rogers'}</Text>

        {/* Profile Bio */}
        <View
          style={[
            flexBoxRow,
            { justifyContent: 'center', gap: 5, paddingHorizontal: 12 },
          ]}
        >
          <Text style={styles.profileBio}>
            Ipsum incididunt ex cillum exercitation dolore mollit fugiat velit
            dolore non sit anim mollit do.
          </Text>
        </View>

        {/* Profile Buttons and Options */}
        <View style={styles.profileButtonBox}>
          <SubmitButton
            onPress={() => navigation.navigate('Settings')}
            style={{ paddingHorizontal: 13, marginBottom: 15 }}
            text="Einstellungen"
          />
          <SubmitButton
            onPress={() => {
              /*startImageUpload(`public/users/${accountCtx?.uid}`)*/
            }}
            style={{ paddingHorizontal: 13, marginBottom: 15 }}
            text="Profilbild"
          />
        </View>

        {/* Sections */}
        <View style={[styles.fileCategories, { paddingHorizontal: 12 }]}>
          <Text style={smallCaptionTextGray}>Contributions</Text>
        </View>

        {/* Theme Sections */}
        <View style={{ marginTop: 20 }}>
          <></>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
  },
  profileBackground: {
    height: 220,
    width: '100%',
  },
  profileButtonBox: {
    ...flexBoxRow,
    flexWrap: 'wrap',
    columnGap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: getFontSize(22),
  },
  profileContent: {
    paddingHorizontal: 0,
    marginTop: -60,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.primaryDark,
    backgroundColor: colors.bluish,
  },
  profileName: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
  },
  profileBio: {
    fontSize: getFontSize(18),
    fontFamily: fonts.primaryRegular,
    color: 'lightgray',
    textAlign: 'center',
    marginTop: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    padding: 10,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    color: '#007bff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: getFontSize(16),
    color: 'lightgray',
  },
  fileCategories: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 6,
    marginTop: 10,
    borderColor: colors.primaryDark,
    width: '100%',
    borderRadius: 5,
  },
});

export default Profile;
