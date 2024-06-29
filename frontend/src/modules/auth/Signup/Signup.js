import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DividerCaption } from '../../../components/DividerCaption';
import { FormField } from '../../../components/Forms';
import { FormSubmitButton } from '../../../components/SubmitButton';
import {
  CaptionWithLink,
  LinkText,
  SmallCaptionHint,
  SmallCaptionLink,
  TextCaptionWarning,
} from '../../../components/TextCaptions';
import SecureStorage from '../../../helpers/secure-storage';
import useRegisterUser from '../../../hooks/auth/use-registrar-user';
import { ModalContext } from '../../provider/ModalProvider';
import { EMAIL_REG } from '../../../constants/constants';
import { useToastNotify } from '../../../hooks/screen/use-toast-notification';

export default function SignUp() {
  const navigation = useNavigation();
  const { showToastNotification } = useToastNotify();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleInputChange = ({ text, id }) => {
    setFormData(prevState => ({ ...prevState, [id]: text }));
    if (formErrors[id]) {
      setFormErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    if (formData.name.length < 2) {
      errors.name = 'Last name must at least 2 letters long.';
    }
    if (!EMAIL_REG.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 10) {
      errors.password = 'The password must be at least 10 characters long.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await SecureStorage.save('username', formData.name);
      registerUser(formData.name, formData.email, formData.password);
    } else {
      showToastNotification({
        msg:
          'Please check your entries ' +
          `\n${Object.keys(formErrors)
            .map(k => formErrors[k])
            .join('\n')}`,
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      className="antialiased bg-slate-900 text-slate-200 tracking-tight"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View className="container h-screen justify-center  mx-auto px-3 py-0 max-w-[500px]">
        <View className="items-center">
          <Text className="text-white text-center font-bold text-[24px]">
            Create Account
          </Text>
        </View>
        {/* Error Messages */}
        {firebaseError && <TextCaptionWarning errorText={firebaseError} />}

        <DividerCaption caption="Register with your Email" />
        {/* Sign Up Form */}

        <FormField
          id="name"
          label=""
          placeholder="Username"
          onChange={handleInputChange}
          value={formData.name}
        />
        <FormField
          id="email"
          label=""
          placeholder="example@mail.com"
          type="email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <FormField
          id="password"
          label=""
          placeholder="Password (at least 10 characters)"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
        />
        <FormSubmitButton
          title="Register"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <CaptionWithLink
          screen="Sign In"
          caption="Already have an account?"
          linkText=" Login"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
