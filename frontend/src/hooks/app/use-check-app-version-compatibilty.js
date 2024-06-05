import { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info'; // Bibliothek zum Auslesen der App-Version
import { Firebase } from '../../../App';
import { isIOS } from '../../constants/constants';
import getDocument from '../../functions/firestore/get-document-async';

const useCheckAppVersionCompatibility = () => {

  const { db } = useContext(Firebase);
  const [isRunnableAppVersion, setRunnableAppVersion] = useState('PENDING');
  const [currentBuildNumber, setCurrentBuildNumber] = useState(null);
  const [currentVersion, setCurrentVersion] = useState(null);
  const [updateLink, setUpdateLink] = useState(
    isIOS ? 'https://apps.apple.com' : 'https://play.google.com',
  );

  const checkCompatibility = async () => {
    try {
      // Auslesen der installierten App-Version und Build-Nummer
      const foundVersion = await DeviceInfo.getVersion();
      const foundBuildNumber = await DeviceInfo.getBuildNumber();
      setCurrentVersion(foundVersion);
      setCurrentBuildNumber(foundBuildNumber);
      console.log('App Info',`
Platform: ${Platform.OS}
App-Version: ${foundVersion}
Build-Number: ${parseInt(foundBuildNumber, 10) }
COMPATIBLE: ${!(parseInt(foundBuildNumber, 10) < 11)}
${
  typeof Platform.constants === 'object'
    ? Object.keys(Platform.constants)
        .map(prop => `${prop}: ` + `${Platform.constants[prop]}`)
        .join('\n')
    : ''
}
      `);

      // Abfragen der kompatiblen Versionsdaten aus Firestore
      const versions = await getDocument('Versions', Platform.OS);
      if (!versions) {
        setRunnableAppVersion('INCOMPATIBLE');
        return;
      }

      const { build_number, store_url } = versions;
      setUpdateLink(store_url);

      // Prüfen der Kompatibilität
      if (parseInt(foundBuildNumber, 10) < build_number) {
        setRunnableAppVersion('INCOMPATIBLE');
      } else {
        setRunnableAppVersion('COMPATIBLE');
      }

      console.log(build_number, foundBuildNumber);
    } catch (error) {
      console.error('Fehler beim Überprüfen der App-Version:', error);
      setRunnableAppVersion('FAILED');
    }
  };

  useEffect(() => {
    if (!db) return;
    checkCompatibility();
  }, [db]);

  return {
    isRunnableAppVersion,
    currentBuildNumber,
    currentVersion,
    updateLink,
    checkCompatibility,
  };
};

export default useCheckAppVersionCompatibility;
