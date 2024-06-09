import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useResetPassword from '../../../hooks/auth/use-passwd-reset';
import { fonts } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
} from '../../../styles/partials';
import {
  HintTextCaption,
  TextCaptionWarning,
} from '../../../components/TextCaptions';
import { FormSubmitButton } from '../../../components/SubmitButton';


export default function ResetPassword() {
  const navigation = useNavigation();
  const { resetPassword, emailSent, error, loading } = useResetPassword();
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
          <HintTextCaption
            caption={
              'Erhalte eine Mail mit den Link zum zurücksetzten deines Passworts.'
            }
          />
        ) : null}
        {/* Error Messages */}
        <TextCaptionWarning
          errorText={error || null}
          text={
            emailSent
              ? 'Wir haben dir die Email zum zurücksetzten des Passworts gesendet.'
              : null
          }
        />
        {/* Passwd Reset Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <FormSubmitButton
            handleSubmit={() => resetPassword(email)}
            loading={loading}
            title="Passwort Zurücksetzen"
            disabled={!email}
          />
        </View>
        <BackLinkText />
      </View>
    </KeyboardAwareScrollView>
  );


  function BackLinkText() {
    return (
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Sign In')}
      >
        <Text style={styles.cancelButtonText}>Zurück</Text>
      </TouchableOpacity>
    );
  }
}


export const styles = StyleSheet.create({
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
