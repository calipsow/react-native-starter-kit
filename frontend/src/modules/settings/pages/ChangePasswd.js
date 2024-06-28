import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../../helpers/resolve-relative-font-size';
import useAuthState from '../../../hooks/auth/use-auth-state';
import { fonts, height } from '../../../styles';
import {
  appThemeColor,
  maxWidth,
  screenPadding,
} from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';
import { DividerCaption } from '../../../components/DividerCaption';
import { FormField } from '../../../components/Forms';
import { FormSubmitButton } from '../../../components/SubmitButton';
import { useToastNotify } from '../../../hooks/screen/use-toast-notification';

const ChangePassword = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const { changePassword, firebaseError, succeeded, isLoading } =
    useAuthState();
  const { showModalAlert } = useContext(ModalContext);
  const { showToastNotification } = useToastNotify();

  const handleSubmit = () => changePassword(email);

  useEffect(() => {
    if (firebaseError) {
      console.log(firebaseError);
      showToastNotification({ msg: firebaseError, type: 'warning' });
    }
    if (succeeded) {
      showModalAlert(
        'Password reset mail sent!',
        'Please check your inbox, for resetting your password',
        () => navigation.goBack(),
      );
    }
  }, [succeeded, firebaseError]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...maxWidth, paddingHorizontal: 12 }}>
        <Text style={styles.header}>Change your password.</Text>

        <DividerCaption caption="Your current email" />

        <View style={{ width: '100%' }}>
          <FormField
            id="email"
            type={'email'}
            placeholder="example@mail.com"
            value={email}
            onChange={({ text, label, id }) => setEmail(text)}
          />

          {firebaseError && (
            <Text style={styles.error}>{`${firebaseError}`}</Text>
          )}

          {/* Submit Button */}
          <FormSubmitButton
            handleSubmit={handleSubmit}
            title="Update password"
            loading={isLoading}
            disabled={isLoading || !email}
          />
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
