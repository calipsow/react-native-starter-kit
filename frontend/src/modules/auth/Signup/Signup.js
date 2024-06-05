import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation for navigation
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import getFriendlyErrorMessage from '../../../helpers/message-from-firebase-error';
import SecureStorage from '../../../helpers/secure-storage';
import useAuthState from '../../../hooks/auth/use-auth-state';
import useRegisterUser from '../../../hooks/auth/use-registrar-user';
import useExternalLink from '../../../hooks/utilities/use-external-link';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';

export default function SignUp() {
  const navigation = useNavigation();
  const { stateLessOpenLink } = useExternalLink();
  const { showModalAlert } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const {
    emailConfirmed,
    firebaseError,
    registerUser,
    accountCreatedSuccessfully,
    loading,
  } = useRegisterUser({
    email: formData.email,
    passwd: formData.password,
    username: formData.name,
    role: 'user',
  });
  const { logout } = useAuthState();

  // Funktion zum Aktualisieren der Formulardaten
  const handleInputChange = ({ text, id }) => {
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

  // Funktion zum Überprüfen der Formulareingaben und Anzeigen von Fehlermeldungen
  const validateForm = () => {
    let errors = {};
    if (!formData.name.length) {
      errors.name = 'Nachname darf nicht leer sein.';
    }
    if (!formData.email.includes('@')) {
      errors.email = 'Bitte gebe eine valide email Adresse an.';
    }
    if (formData.password.length < 10) {
      errors.password = 'Das Passwort muss mindestens 10 Zeichen lang sein.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Funktion zum Verarbeiten der Anmeldung
  const handleSubmit = async () => {
    if (validateForm()) {
      // Führe die Registrierung durch, wenn keine Fehler vorliegen
      console.log('Submitting form with data:', formData);
      // Hier könnte die Logik zum Aufrufen einer API oder Firebase Auth hinzugefügt werden
      await SecureStorage.save('username', formData.name);
      registerUser(formData.name, formData.email, formData.password);
    } else {
      showModalAlert(
        'Prüfe bitte deine Eingaben\n',
        `${Object.keys(formErrors)
          .map(k => formErrors[k])
          .join('\n\n')}`,
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.maxWidthContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Account erstellen</Text>
        </View>
        {/* Error Messages */}
        {firebaseError && (
          <React.Fragment>
            <Text style={[smallCaptionTextGray, { textAlign: 'center' }]}>
              {getFriendlyErrorMessage(firebaseError)}
            </Text>
          </React.Fragment>
        )}
        {emailConfirmed !== 'PENDING' ? (
          <React.Fragment>
            {/* Google Sign Up Button */}
            {false && (
              <TouchableOpacity
                style={styles.googleSignUpButton}
                onPress={() => navigation.navigate('Home')}
              >
                {/* SVG replacement with text for simplicity */}
                <Text style={styles.googleSignUpButtonText}>
                  Sign up with Google
                </Text>
              </TouchableOpacity>
            )}
            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>
                Registriere dich mit deiner Email
              </Text>
              <View style={styles.dividerLine} />
            </View>
            {/* Sign Up Form */}
            <View>
              <FormField
                id={'name'}
                label="Name"
                placeholder="Name"
                onChange={handleInputChange}
                value={formData.name}
              />
              <FormField
                id={'email'}
                label="Email"
                placeholder="Email"
                type="email"
                onChange={handleInputChange}
                value={formData.email}
              />
              <FormField
                id={'password'}
                label="Password"
                placeholder="Passwort (mindestens 10 Zeichen)"
                type="password"
                onChange={handleInputChange}
                value={formData.password}
              />

              <Text style={[smallCaptionTextGray, { textAlign: 'center' }]}>
                Mit der Account Erstellung stimmen sie den Datenschutzregelungen
                vom Bündnis Zusammen-Stehen-Wir zu.
              </Text>
              <Pressable
                onPress={() =>
                  stateLessOpenLink(
                    'https://zusammen-stehen-wir.de/privacy-policy/',
                  )
                }
                style={{ padding: 5 }}
              >
                <Text
                  style={[
                    smallCaptionTextGray,
                    styles.linkText,
                    {
                      marginBottom: 13,
                      textAlign: 'center',
                    },
                  ]}
                >
                  Datenschutzregelungen
                </Text>
              </Pressable>
              <TouchableOpacity
                disabled={loading}
                style={styles.signUpButton}
                onPress={handleSubmit}
              >
                {!loading ? (
                  <Text style={styles.signUpButtonText}> Registrieren</Text>
                ) : (
                  <ActivityIndicator
                    size={'small'}
                    color={colors.bluish}
                    style={{ margin: 'auto' }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Text style={mediumHeadlineText}>
              Bitte bestätige deine Email Adresse.
            </Text>
            <Text style={smallCaptionTextGray}>
              Du wirst im Anschluss automatisch weitergeleitet.
              <Pressable onPress={logout}>
                <Text style={styles.linkText}> Registration zurücksetzen?</Text>
              </Pressable>
            </Text>
          </React.Fragment>
        )}
        <View style={styles.signUpRedirectContainer}>
          <Text style={styles.signUpRedirectText}>
            Du hast bereits ein Konto?
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Sign In')}
            style={{ padding: 5 }}
          >
            <Text style={styles.signUpText}>Einloggen</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export function FormField({
  label,
  placeholder,
  type,
  onChange = function ({ text, label, id }) {},
  fieldStyles,
  keyboardType,
  id,
  value,
}) {
  return (
    <View style={styles.formFieldContainer}>
      {false && (
        <Text style={styles.label}>
          {label} <Text style={styles.required}>*</Text>
        </Text>
      )}
      <TextInput
        onChangeText={text => onChange({ text, label, id })}
        style={fieldStyles ? fieldStyles : styles.input}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC"
        secureTextEntry={type === 'password'}
        keyboardType={keyboardType}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appThemeColor.darkBlue,
  },
  maxWidthContainer: {
    width: '100%',
    ...screenPadding,
    paddingVertical: 0,
    maxWidth: 500, // Adjust based on your layout needs
  },
  headerContainer: {
    marginBottom: 19,
    alignItems: 'center',
  },
  headerText: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  googleSignUpButton: {
    backgroundColor: '#E11D48', // bg-red-600
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  googleSignUpButtonText: {
    color: '#FFFFFF',
    fontSize: getFontSize(16),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151', // border-gray-700
  },
  dividerText: {
    color: '#9CA3AF', // text-gray-400
    marginHorizontal: 8,
  },
  formFieldContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#D1D5DB', // text-gray-300
    marginBottom: 4,
  },
  required: {
    color: '#EF4444', // text-red-600
  },
  input: {
    backgroundColor: '#1F2937', // Assuming a dark input bg like bg-gray-800
    color: '#D1D5DB', // text-gray-300
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: getFontSize(16),
  },
  agreementText: {
    fontSize: getFontSize(15),
    color: '#9CA3AF', // text-gray-500
    textAlign: 'center',

    lineHeight: 17,
  },
  linkText: {
    color: '#818CF8', // purple-500
    lineHeight: 14,
  },
  signUpButton: {
    backgroundColor: '#8B5CF6', // bg-purple-600
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: getFontSize(17),
    fontFamily: fonts.primaryBold,
  },
  footerText: {
    color: '#9CA3AF', // text-gray-400
  },
  signUpRedirectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signUpRedirectText: {
    color: '#9CA3AF',
    lineHeight: 18,
    fontSize: getFontSize(14),
  },
  signUpText: {
    fontSize: getFontSize(14),
    color: '#8E9AFC',
    lineHeight: 18,
  },
});
