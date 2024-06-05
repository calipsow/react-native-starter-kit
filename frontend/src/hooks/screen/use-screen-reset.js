import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const useResetScreen = resetFunction => {
  useFocusEffect(
    useCallback(() => {
      resetFunction();
    }, []),
  );
};

export default useResetScreen;
