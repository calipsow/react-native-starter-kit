import { useState } from 'react';
import { Linking } from 'react-native';

const useExternalLink = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const testLink = (url = '') =>
    url.toLowerCase().trim().includes('https://') ||
    url.toLowerCase().trim().includes('http://');
  
  const stateLessOpenLink = async url =>
    await Linking.openURL(url).catch(e => console.warn(e));

  const openLink = async url => {
    setLoading(true);
    setError('');
    setSucceeded(false);

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        setSucceeded(true);
      } else {
        throw new Error(`Don't know how to open this URL: ${url}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { openLink, succeeded, error, loading, testLink, stateLessOpenLink };
};

export default useExternalLink;
