import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useAuthState from '../../../hooks/auth/use-auth-state';
import { fonts, height } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
} from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';

const ChangePassword = ({ navigation, route }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { changePassword, firebaseError } = useAuthState();
  const { showModalAlert } = useContext(ModalContext);

  const handleChangeOldPassword = text => setOldPassword(text);
  const handleChangeNewPassword = text => setNewPassword(text);
  const handleChangeConfirmPassword = text => setConfirmPassword(text);

  const handleSubmit = async () => {
    setError('');
    if (!newPassword || !confirmPassword || !oldPassword) {
      setError('Fülle das Formular bitte vollständig aus.');
      return;
    }
    // Überprüfen, ob das neue Passwort und die Bestätigung übereinstimmen
    if (newPassword !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein');
      return;
    }
    await changePassword(oldPassword, newPassword);

    if (!firebaseError) {
      showModalAlert('Dein Passwort wurde aktualisiert.', '✅', () =>
        navigation.goBack(),
      );
    }
    // Hier den Code für die Passwortänderung mit Firebase-Auth hinzufügen
    // Beispiel: auth.currentUser.updatePassword(newPassword)
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...maxWidth, ...screenPadding }}>
        <Text style={styles.header}>Ändere dein Passwort.</Text>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>
            Gebe dein aktuelles Passwort ein.
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Passwort Formular */}
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            placeholder="Aktuelles Passwort"
            secureTextEntry={true}
            placeholderTextColor="lightgray"
            value={oldPassword}
            onChangeText={handleChangeOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Neues Passwort"
            secureTextEntry={true}
            placeholderTextColor="lightgray"
            value={newPassword}
            onChangeText={handleChangeNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Passwort bestätigen"
            secureTextEntry={true}
            placeholderTextColor="lightgray"
            value={confirmPassword}
            onChangeText={handleChangeConfirmPassword}
          />

          {/* Fehlermeldung anzeigen */}
          {firebaseError || error ? (
            <Text style={styles.error}>
              {error
                ? error
                : 'Etwas ist schiefgelaufen, bitte versuche es später erneut.'}
            </Text>
          ) : null}

          {/* Submit Button */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButtonText}>Passwort ändern</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingTop: height * 0.17,
    backgroundColor: appThemeColor.darkBlue,
  },
  innerContainer: {},
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

export default ChangePassword;
