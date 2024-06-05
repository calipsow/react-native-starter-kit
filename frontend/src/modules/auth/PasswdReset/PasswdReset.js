import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// Assuming React Navigation is used for navigation. Replace or remove as needed.
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import getFriendlyErrorMessage from '../../../helpers/message-from-firebase-error';
import useResetPassword from '../../../hooks/auth/use-passwd-reset';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
  smallCaptionTextGray,
} from '../../../styles/partials';

export default function ResetPassword() {
  const navigation = useNavigation();
  const { resetPassword, emailSent, error } = useResetPassword();
  const [email, setEmail] = useState('');
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.maxWidthContainer}>
        <Text style={styles.header}>Passwort vergessen?</Text>
        {!error && !emailSent ? (
          <Text style={[smallCaptionTextGray, styles.subHeader]}>
            Wir senden dir per E-Mail eine Anleitung zum Zurücksetzen zu.
          </Text>
        ) : (
          <></>
        )}
        {/* Error Messages */}
        {error ? (
          <Text
            style={[
              styles.subHeader,
              {
                color: colors.brightYellow,
              },
            ]}
          >
            {getFriendlyErrorMessage(error)}
          </Text>
        ) : (
          emailSent && (
            <Text style={styles.subHeader}>
              Wir haben dir die Email zum zurücksetzten des Passworts gesendet.
            </Text>
          )
        )}

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />

          <TouchableOpacity
            disabled={!email}
            style={styles.resetButton}
            onPress={() => {
              resetPassword(email);
            }}
          >
            <Text style={styles.resetButtonText}>Passwort Zurücksetzen</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Sign In')}
        >
          <Text style={styles.cancelButtonText}>Zurück</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: appThemeColor.darkBlue,
  },
  maxWidthContainer: {
    width: '100%',
    margin: 'auto',
    ...maxWidth,
    ...screenPadding,
  },
  header: {
    fontSize: getFontSize(22),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 3,
  },
  subHeader: {
    fontSize: getFontSize(16),
    color: '#9CA3AF', // text-gray-400
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1F2937', // Assuming a dark theme input
    color: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: getFontSize(16),
    marginBottom: 15,
    width: '100%',
  },
  resetButton: {
    backgroundColor: '#8B5CF6', // bg-purple-600
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 0,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: getFontSize(17),
    fontFamily: fonts.primaryBold,
  },
  cancelButton: {
    alignItems: 'center',
    marginBottom: 0,
    padding: 8,
  },
  cancelButtonText: {
    color: '#8E9AFC', // text-purple-600
    fontSize: getFontSize(16),
  },
});
