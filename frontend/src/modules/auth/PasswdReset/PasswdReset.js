import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  HintTextCaption,
  SmallCaptionHint,
  SmallCaptionLink,
  TextCaptionWarning,
} from '../../../components/TextCaptions';
import { FormSubmitButton } from '../../../components/SubmitButton';
import useResetPassword from '../../../hooks/auth/use-passwd-reset';
import { FormField } from '../../../components/Forms';
import { EMAIL_REG } from '../../../constants/constants';

export default function ResetPassword() {
  const navigation = useNavigation();
  const { resetPassword, emailSent, error, loading } = useResetPassword();
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (loading && email) setEmail('');
  }, [loading]);

  return (
    <KeyboardAwareScrollView
      className="antialiased bg-slate-900 text-slate-200 tracking-tight"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View className="container h-screen justify-center mx-auto px-3 py-0 max-w-[500px]">
        <Text className="text-white text-center font-bold text-[24px]">
          Forgot Password?
        </Text>
        {error && (
          <TextCaptionWarning
            errorText={error}
            text="Something went wrong, try it later again."
          />
        )}
        {/* Error Messages */}
        <SmallCaptionHint
          caption={
            emailSent
              ? 'We have sent you an email to resetting your password.'
              : 'Receive an email with the link to reset your password.'
          }
        />
        {/* Password Reset Form */}
        <View className="mt-2">
          <FormField
            id="email"
            label=""
            type="email"
            onChange={({ text }) => setEmail(text)}
            placeholder="example@mail.com"
            value={email}
            className="mb-0"
          />
          <FormSubmitButton
            handleSubmit={() => resetPassword(email)}
            loading={loading}
            title="Reset Password"
            disabled={!EMAIL_REG.test(email)}
          />
        </View>
        <SmallCaptionLink
          linkText="Back to login"
          onPress={() => navigation.navigate('Sign In')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
