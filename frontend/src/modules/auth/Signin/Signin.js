import React, { useContext, useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DividerCaption } from '../../../components/DividerCaption';
import { FormField } from '../../../components/Forms';
import { FormSubmitButton } from '../../../components/SubmitButton';
import { TextCaptionWarning } from '../../../components/TextCaptions';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useSignIn from '../../../hooks/auth/use-login-user';
import { fonts } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
} from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';


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


  const handleInputChange = ({ id, text }) => {
    setFormData(prevState => ({ ...prevState, [id]: text }));
    if (formErrors[id]) {
      setFormErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };


  const handleSubmit = async () => {
    if (validateForm()) {
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
      });
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
          {error && <TextCaptionWarning errorText={error} />}
          <DividerCaption caption="Logge dich mit deiner Email ein" />
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
            <PasswordForgotten />
            <FormSubmitButton
              loading={loading}
              disabled={loading}
              handleSubmit={handleSubmit}
              title="Einloggen"
            />
          </View>
          <SignupCaption />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );


  function SignupCaption() {
    return (
      <View style={styles.signUpRedirectContainer}>
        <Text style={styles.signUpRedirectText}>Noch kein Account? </Text>
        <Pressable
          onPress={() => navigation.navigate('Sign Up')}
          style={{ padding: 5, paddingLeft: 0 }}
        >
          <Text style={styles.signUpText}>Registrieren</Text>
        </Pressable>
      </View>
    );
  }


  function PasswordForgotten() {
    return (
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reset Password')}
          style={{ padding: 5, paddingLeft: 0 }}
        >
          <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export const styles = StyleSheet.create({
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
