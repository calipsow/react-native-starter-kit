import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useDynamicHeaderTitle = title => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);
};

export default useDynamicHeaderTitle;
