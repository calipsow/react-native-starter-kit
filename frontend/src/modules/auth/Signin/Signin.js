import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Assuming usage of React Navigation for navigation, replace with your navigation logic
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import getFriendlyErrorMessage from '../../../helpers/message-from-firebase-error';
import useSignIn from '../../../hooks/auth/use-login-user';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
  smallTextGray,
} from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';
import { FormField } from '../Signup/Signup';

export const DividerCaption = ({ caption = '', textStyle, containerStyle }) => (
  <View style={[styles.dividerContainer, containerStyle && containerStyle]}>
    <View style={styles.dividerLine} />
    <Text style={[styles.dividerText, textStyle && textStyle]}>{caption}</Text>
    <View style={styles.dividerLine} />
  </View>
);

export default function SignIn() {
  const { showModalAlert } = useContext(ModalContext);

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const { signIn, error, succeeded, loading } = useSignIn();

  const validateForm = () => {
    let errors = {};
    if (!formData.email.includes('@')) {
      errors.email = 'Bitte gebe eine valide email Adresse an.';
    }
    if (!formData.password.length) {
      errors.password = 'Das Passwort Feld darf nicht leer sein.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Funktion zum Aktualisieren der Formulardaten
  const handleInputChange = ({ id, text }) => {
    setFormData(prevState => ({ ...prevState, [id]: text }));
    // Entferne Fehlermeldungen für dieses Feld, falls vorhanden
    if (formErrors[id]) {
      setFormErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Funktion zum Verarbeiten der Anmeldung
  const handleSubmit = async () => {
    if (validateForm()) {
      // Führe die Registrierung durch, wenn keine Fehler vorliegen
      console.log('Submitting form with data:', formData);
      // Hier könnte die Logik zum Aufrufen einer API oder Firebase Auth hinzugefügt werden
      signIn({ email: formData.email, passwd: formData.password });
    } else {
      showModalAlert(
        'Prüfe bitte deine Eingaben',
        `${Object.keys(formErrors)
          .map(k => formErrors[k])
          .join('\n')}`,
      );
    }
  };

  const handleLoginException = (error = '') => {
    if (!error.includes('auth/invalid-login-credentials')) {
      console.error(error);
    } else {
      setFormData({
        email: '',
        password: '',
      }); // resets the form fields
    }
  };

  useEffect(() => {
    if (error) handleLoginException(error);
  }, [error]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.innerContainer]}>
        <View style={{ margin: 'auto', ...maxWidth, ...screenPadding }}>
          <Text style={styles.header}>Willkommen zurück</Text>

          {/* Error Messages */}
          {error && (
            <Text
              style={[
                smallTextGray,
                {
                  textAlign: 'center',
                  color: colors.brightYellow,
                  fontSize: getFontSize(16),
                },
              ]}
            >
              {getFriendlyErrorMessage(error)}
            </Text>
          )}

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>
              Logge dich mit deiner Email ein
            </Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email and Password Form */}
          <View style={{ width: '100%', gap: 3 }}>
            <FormField
              id={'email'}
              fieldStyles={styles.input}
              label="Email"
              type="email"
              onChange={handleInputChange}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
            />

            <FormField
              value={formData.password}
              id={'password'}
              fieldStyles={styles.input}
              label="Passwort"
              type="password"
              onChange={handleInputChange}
              placeholder="Passwort"
            />

            {/* Remember Me and Forgot Password */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Reset Password')}
                style={{ padding: 5, paddingLeft: 0 }}
              >
                <Text style={styles.forgotPasswordText}>
                  Passwort vergessen?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign-In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              disabled={loading}
              onPress={handleSubmit}
            >
              {!loading ? (
                <Text style={styles.signInButtonText}>Einloggen</Text>
              ) : (
                <ActivityIndicator
                  size={'small'}
                  color={colors.bluish}
                  style={{ margin: 'auto' }}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Sign-Up Redirect */}
          <View style={styles.signUpRedirectContainer}>
            <Text style={styles.signUpRedirectText}>Noch kein Account? </Text>

            <Pressable
              onPress={() => navigation.navigate('Sign Up')}
              style={{ padding: 5, paddingLeft: 0 }}
            >
              <Text style={styles.signUpText}>Registrieren</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: appThemeColor.darkBlue,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',

    margin: 'auto',
  },
  googleSignInButton: {
    backgroundColor: '#E11D48',
    padding: 15,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  googleSignInText: {
    color: '#fff',
    fontSize: getFontSize(16),
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
    width: '100%',
    marginBottom: 0,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
    paddingVertical: 6,
    flexWrap: 'wrap',
    gap: 5,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    backgroundColor: 'white',
    height: 25,
    width: 25,
    borderRadius: 5,
  },
  optionsText: {
    color: '#9CA3AF',
  },
  forgotPasswordText: {
    color: '#8E9AFC',
    lineHeight: 25,
  },
  signInButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    fontFamily: fonts.primaryBold,
  },
  signInButtonText: {
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: getFontSize(17),
  },
  signUpRedirectContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  signUpRedirectText: {
    color: '#9CA3AF',
  },
  signUpText: {
    color: '#8E9AFC',
    lineHeight: 20,
  },
});
