import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation for navigation
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DividerCaption } from '../../../components/DividerCaption';
import { FormField } from '../../../components/Forms';
import { FormSubmitButton } from '../../../components/SubmitButton';
import {
  SmallCaptionHint,
  SmallCaptionLink,
  TextCaptionWarning,
} from '../../../components/TextCaptions';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import SecureStorage from '../../../helpers/secure-storage';
import useRegisterUser from '../../../hooks/auth/use-registrar-user';
import { appThemeColor, screenPadding } from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';

export default function SignUp() {
  const navigation = useNavigation();
  const { showModalAlert } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const { firebaseError, registerUser, loading } = useRegisterUser({
    email: formData.email,
    passwd: formData.password,
    username: formData.name,
    role: 'user',
  });

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
        {firebaseError && <TextCaptionWarning errorText={firebaseError} />}
        <React.Fragment>
          <DividerCaption caption="Registriere dich mit deiner Email" />
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

            <SmallCaptionHint caption="Mit der Account Erstellung stimmst du den Datenschutzregelungen zu." />
            <SmallCaptionLink linkText="Datenschutzregelungen" />
            <FormSubmitButton
              title=" Registrieren"
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </View>
        </React.Fragment>

        <SigninHint />
      </View>
    </KeyboardAwareScrollView>
  );

  function SigninHint() {
    return (
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
    );
  }
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
