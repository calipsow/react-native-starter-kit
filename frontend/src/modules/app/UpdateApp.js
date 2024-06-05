import React, { useContext } from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { isIOS } from '../../constants/constants';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import useCheckAppVersionCompatibility from '../../hooks/app/use-check-app-version-compatibilty';
import { colors, fonts } from '../../styles';
import { appThemeColor } from '../../styles/partials';
import { SubmitButton } from '../admin/newsletter/CreateNewsletter';
import { ModalContext } from '../provider/ModalProvider';

const UpdateApp = () => {
  const { showModalAlert } = useContext(ModalContext);
  const { updateLink, checkCompatibility } = useCheckAppVersionCompatibility();

  const handleUpdate = () => {
    if (!updateLink) {
      showModalAlert(
        'Etwas ist schiefgelaufen',
        isIOS
          ? 'Bitte besuche den App Store um die App zu aktualisieren'
          : 'Bitte besuche den Google Play Store um die App zu aktualisieren',
        checkCompatibility,
      );
      return;
    }
    Linking.openURL(updateLink).catch(err => {
      console.error('An error occurred', err);
      showModalAlert(
        'Etwas ist schiefgelaufen',
        Platform.OS === 'android'
          ? 'Bitte aktualisiere die App im Google Play Store.'
          : 'Bitte aktualisiere die App im App Store.',
      );
    });
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="update"
        size={120}
        color={colors.brightRed}
        style={{ margin: 'auto', opacity: 0.9 }}
      />

      <Text style={styles.text}>
        Deine App-Version ist veraltet und muss aktualisiert werden.
      </Text>
      <SubmitButton
        text="Aktualisieren"
        textStyle={{
          fontFamily: fonts.primaryBold,
          fontSize: getFontSize(19),
          lineHeight: 19,
          color: colors.white,
        }}
        onPress={handleUpdate}
        style={{
          margin: 'auto',
          borderColor: colors.primary,
          backgroundColor: colors.primaryDark + 'e0',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: appThemeColor.darkBlue,
  },
  text: {
    fontFamily: fonts.primaryRegular,
    fontSize: getFontSize(22),
    marginBottom: 20,
    textAlign: 'center',
    color: colors.bluish,
  },
});

export default UpdateApp;
