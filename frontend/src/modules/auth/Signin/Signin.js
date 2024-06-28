import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DividerCaption } from '../../../components/DividerCaption';
import { FormField } from '../../../components/Forms';
import { FormSubmitButton } from '../../../components/SubmitButton';
import {
  CaptionWithLink,
  LinkText,
  TextCaptionWarning,
} from '../../../components/TextCaptions';
import useSignIn from '../../../hooks/auth/use-login-user';
import { ModalContext } from '../../provider/ModalProvider';
import { EMAIL_REG } from '../../../constants/constants';

export default function SignIn() {
  const { showModalAlert } = useContext(ModalContext);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ password: '', email: '' });
  const [formErrors, setFormErrors] = useState({});
  const { signIn, error, loading } = useSignIn();

  useEffect(() => {
    if (error && error.includes('auth/invalid-login-credentials')) {
      setFormData({ email: '', password: '' });
    }
  }, [error]);

  const handleInputChange = ({ id, text }) => {
    setFormData(prev => ({ ...prev, [id]: text }));
    setFormErrors(prev => ({
      ...prev,
      [id]: text ? undefined : formErrors[id],
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.includes('@'))
      errors.email = 'Please enter a valid email address.';
    if (!formData.password) errors.password = 'Password field cannot be empty.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log(formData);
      signIn(formData);
    } else {
      showModalAlert(
        'Please check your entries',
        Object.values(formErrors).join('\n'),
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      className="antialiased bg-slate-900 text-slate-200 tracking-tight"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View className="container h-screen justify-center  mx-auto px-3 py-0 max-w-[500px]">
        <Text className="text-white text-center font-bold text-[24px]">
          Welcome Back
        </Text>
        {error && <TextCaptionWarning errorText={error} />}
        <DividerCaption caption="Log in with your Email" />

        <FormField
          id="email"
          label=""
          type="email"
          onChange={handleInputChange}
          placeholder="example@mail.com"
          value={formData.email}
          className="mb-0"
        />
        <FormField
          id="password"
          label=""
          type="password"
          onChange={handleInputChange}
          placeholder="Password"
          value={formData.password}
          className="mb-0"
        />
        <LinkText screen="Reset Password" />
        <FormSubmitButton
          loading={loading}
          disabled={!(EMAIL_REG.test(formData.email) && formData.password)}
          handleSubmit={handleSubmit}
          title="Log In"
        />

        <CaptionWithLink
          screen="Sign Up"
          caption="Don't have an account?"
          linkText=" Register"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
