import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

const useDeepLink = () => {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        setInitialUrl(url);
      }
    };

    getInitialURL();
  }, []);

  return initialUrl;
};

export default useDeepLink;
