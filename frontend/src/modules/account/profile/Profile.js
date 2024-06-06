import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNSRadioGroup from '../../../components/RadioGroup';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useAuthState from '../../../hooks/auth/use-auth-state';
import useUserProfile from '../../../hooks/auth/use-update-profile';
import useDeleteImage from '../../../hooks/firebase/use-delete-image';
import useImageUpload from '../../../hooks/firebase/use-image-upload';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  flexBoxRow,
  screenPadding,
  smallCaptionTextGray,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import { SubmitButton } from '../../../components/SubmitButton';
import { DividerCaption } from '../../../components/DividerCaption';
import PostedEventSection from './sections/PostedEvents';
import FBImage from '../../../components/FBImage';
import { resolveRole } from '../../../hooks/auth/use-auth-listener';

const PROFILE_SECTIONS = [
  {
    title: 'Geteilte Events',
    slug_id: 'shared_events',
    component: () => <PostedEventSection />,
  },
];

const ADMIN_SECTIONS = [
  {
    title: 'Geteilte Events',
    slug_id: 'shared_events',
    component: () => <PostedEventSection />,
  },
];

function Profile({ navigation }) {
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const [showPage, setShownPage] = useState(0);
  const [isProcessingImageChange, setIsProcessingImageChange] = useState(false);
  const { updateProfilePicture, error, success, loading } = useUserProfile(
    accountCtx,
    setAccountCtx,
  );
  const { imageUrl, startImageUpload, setImageUrl, uploadError, isUploading } =
    useImageUpload();
  const [role, setRole] = useState(null);
  const [oldImg, setOldImg] = useState(null);

  const { deleteImage } = useDeleteImage();

  const replacePB = async () => {
    const oldPb = accountCtx?.firebase_auth_data?.photoURL;
    if (oldPb) setOldImg(oldPb);
    await updateProfilePicture(imageUrl); // if succeeds it will update the succeed to true
  };

  useEffect(() => {
    if (imageUrl) {
      replacePB();
    }
  }, [imageUrl]);

  useEffect(() => {
    // the new image is set on the firebase backend
    if (!accountCtx) return;
    if (success) {
      // updating pb completes
      console.log('success fully updated');
      console.log('deleting old one..');
      deleteImage(oldImg).finally(() => {
        setImageUrl(''); // resets the images url state from the upload hook
      });
    }
  }, [success]);

  useEffect(() => {
    if (isUploading) {
      console.log('staring updating pb process');
      setIsProcessingImageChange(true);
    }
    if (!isUploading && (success || error)) {
      console.log('finished updating pb completely');
      setIsProcessingImageChange(false);
    }
  }, [isUploading, success]);

  useEffect(() => {
    if (!role) {
      resolveRole(accountCtx.uid).then(role => setRole(role));
    }
  }, []);

  if (!accountCtx)
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator
          size={'large'}
          color={colors.bluish}
          style={{ margin: 'auto' }}
        />
      </View>
    );
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
          onPress={() => startImageUpload(`public/users/${accountCtx?.uid}`)}
          disabled={isUploading}
        >
          <View style={styles.avatarContainer}>
            {!isProcessingImageChange ? (
              <FBImage
                fallbackStyles={{}}
                fallbackSrc={
                  'https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fapp%2Fimages%2Fdefault-avatar.png?alt=media&token=567b6e03-58d7-44b9-a065-4c2fa7341324'
                }
                src={accountCtx?.firebase_auth_data?.photoURL}
                style={styles.avatar}
              />
            ) : (
              <ActivityIndicator
                style={styles.avatar}
                size={'small'}
                color={colors.black}
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Profile Name */}
        <Text style={styles.profileName}>
          {accountCtx.username ||
            accountCtx?.firebase_auth_data?.displayName ||
            accountCtx?.firebase_auth_data?.email}
        </Text>

        {/* Profile Bio */}
        <View
          style={[
            flexBoxRow,
            { justifyContent: 'center', gap: 5, ...screenPadding },
          ]}
        >
          <Text style={styles.profileBio}>Beigetreten am</Text>
          <Text style={[styles.profileBio, { color: colors.lightBlue }]}>
            {new Date(
              parseInt(accountCtx?.firebase_auth_data?.createdAt),
            ).toLocaleDateString()}{' '}
          </Text>
        </View>
        <DividerCaption
          caption={role === 'Admin' ? 'Eingeloggt als Admin' : 'Anpassen'}
          containerStyle={{ ...screenPadding }}
        />
        {/* Profile Buttons and Options */}
        <View
          style={[
            flexBoxRow,
            {
              flexWrap: 'wrap',
              columnGap: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            },
          ]}
        >
          <SubmitButton
            onPress={() => navigation.navigate('Settings')}
            style={{ paddingHorizontal: 13, marginBottom: 15 }}
            text="Einstellungen"
          />
          <SubmitButton
            onPress={() => startImageUpload(`public/users/${accountCtx?.uid}`)}
            style={{ paddingHorizontal: 13, marginBottom: 15 }}
            text="Profilbild"
          />
        </View>

        {/* Sections */}
        <View style={[styles.fileCategories, { ...screenPadding }]}>
          <RNSRadioGroup
            textStyles={{
              fontSize: getFontSize(15),
              fontFamily: fonts.primarySemiBold,
            }}
            underline
            items={
              role !== 'admin'
                ? PROFILE_SECTIONS.map(sec => sec.title)
                : ADMIN_SECTIONS.map(sec => sec.title)
            }
            darkMode={false}
            selectedIndex={showPage}
            onChange={idx => setShownPage(idx)}
            style={{}}
          />
        </View>

        {/* Theme Sections */}
        <View style={{ marginTop: 20 }}>
          {role !== 'admin'
            ? PROFILE_SECTIONS[showPage].component()
            : ADMIN_SECTIONS[showPage].component()}
        </View>
        {/* Announcements */}
        <View
          style={{
            padding: 20,
            ...screenPadding,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              smallCaptionTextGray,
              { textAlign: 'center', maxWidth: 320 },
            ]}
          >
            Freue dich auf noch mehr Features, die App wird stetig weiter
            entwickelt. 🧑‍💻
          </Text>
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
    justifyContent: 'space-around',
    paddingVertical: 6,
    marginTop: 10,
    borderColor: colors.primaryDark,
    width: '100%',
    borderRadius: 5,
  },
});

export default Profile;
