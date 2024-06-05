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
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
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
        'Dein Nutzername wurde erfolgreich geändert.',
        'Es kann einen Moment dauern bis die Änderung überall zu sehen ist.',
        () => navigation.goBack(),
      );
    }
    if (error) {
      showModalAlert(
        'Nutzername konnte nicht geändert werden.',
        'Probiere es später nochmal',
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
      <View style={{ ...maxWidth, ...screenPadding }}>
        <Text style={styles.header}>Ändere deinen Nutzernamen.</Text>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>
            Gebe dein gewünschten Nutzernamen ein.
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Passwort Formular */}
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            placeholder="Neuer Nutzername.."
            secureTextEntry={false}
            value={newUsername}
            placeholderTextColor="lightgray"
            onChangeText={text => setNewUsername(text)}
          />

          {/* Fehlermeldung anzeigen */}
          {error ? (
            <Text style={styles.error}>
              {typeof error !== 'string' ? error?.toString() : error}
            </Text>
          ) : null}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.signInButton}
            disabled={!newUsername.length || loading}
            onPress={handleSubmit}
          >
            {!loading ? (
              <Text style={styles.signInButtonText}>Nutzernamen ändern</Text>
            ) : (
              <ActivityIndicator
                size={'small'}
                color={colors.bluish}
                style={{ margin: 'auto' }}
              />
            )}
          </TouchableOpacity>
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
