import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import getFontSize from '../../../helpers/resolve-relative-font-size';
import useAuthState from '../../../hooks/auth/use-auth-state';
import { colors, fonts, height } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import { ModalContext } from '../../provider/ModalProvider';
import useUserProfile from '../../../hooks/auth/use-update-profile';
import { FormField } from '../../../components/Forms';
import { FormSubmitButton } from '../../../components/SubmitButton';
import { DividerCaption } from '../../../components/DividerCaption';

const ChangeUsername = ({ navigation, route }) => {
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  const [newUsername, setNewUsername] = useState('');
  const { updateUsername, error, loading, success } = useUserProfile(
    accountCtx,
    setAccountCtx,
  );
  const { showModalAlert } = useContext(ModalContext);

  const handleSubmit = async () => {
    if (!loading) updateUsername(newUsername);
  };

  useEffect(() => {
    if (success) {
      showModalAlert(
        'Your username has been successfully changed.',
        'It may take a moment for the change to be visible everywhere.',
        () => navigation.goBack(),
      );
    }
    if (error) {
      showModalAlert(
        'User name could not be changed.',
        'Try it again later',
        () => navigation.goBack(),
      );
    }
  }, [success, error]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...maxWidth, paddingHorizontal: 12 }}>
        <Text style={styles.header}>Change your username.</Text>

        {/* Divider */}
        <DividerCaption caption="Enter your desired username." />

        <View style={{ width: '100%' }}>
          <FormField
            placeholder={'Username'}
            type={'text'}
            id={'username'}
            onChange={({ text }) => setNewUsername(text)}
            value={newUsername}
          />

          {error && <Text style={styles.error}>{`${error}`}</Text>}

          <FormSubmitButton
            disabled={!newUsername.length || loading}
            handleSubmit={handleSubmit}
            loading={loading}
            title="Update"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: height * 0.25,
    backgroundColor: appThemeColor.darkBlue,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4B5563',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#9CA3AF',
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: getFontSize(16),
    marginBottom: 8,
    width: '100%',
  },
  signInButton: {
    backgroundColor: '#8B5CF6',
    padding: 15,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: getFontSize(16),
    fontFamily: fonts.primaryBold,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default ChangeUsername;
