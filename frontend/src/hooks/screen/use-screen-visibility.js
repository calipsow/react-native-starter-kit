import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

function useIsScreenVisible() {
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Setzt den Zustand auf true, wenn der Screen fokussiert wird
      setIsVisible(true);

      return () => {
        // Setzt den Zustand auf false, wenn der Screen nicht mehr fokussiert ist
        setIsVisible(false);
      };
    }, []),
  );

  return { isVisible, isFocused };
}

export default useIsScreenVisible;
