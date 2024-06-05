import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useAuthState from '../../../hooks/auth/use-auth-state';
import { colors } from '../../../styles';
import { appThemeColor, defaultCardTheme } from '../../../styles/partials';
import { ModalContext } from '../../provider/ModalProvider';
import Option from './Option';

const SubSection = ({
  subSectionTitle,
  settingOptions,
  onValueChange = function () {},
  onPressAction = function (id, type) {},
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{subSectionTitle}</Text>
      {settingOptions.map((option, i) => (
        <Option
          enabledState={option.setting_type === 'switch' ? option.value : null}
          onSwitch={onValueChange}
          onPress={(id, type) => onPressAction(id, type)}
          text={option.title}
          setting_type={option.setting_type}
          setting_id={option.id}
          key={`${i}-`}
        />
      ))}
    </View>
  );
};

const Panel = ({ sectionTitle, sectionDescription, subSections }) => {
  const { logout, deleteAccount, firebaseError } = useAuthState();
  const navigation = useNavigation();
  const { showModalConfirmation } = useContext(ModalContext);

  const handleAction = (action, type) => {
    if (type === 'action') {
      switch (action) {
        case 'logout':
          showModalConfirmation(
            'Ausloggen',
            'Möchtest du dich wirklich abmelden?',
            logout,
          );
          break;
        case 'delete_account':
          showModalConfirmation(
            'Achtung!',
            'Möchtest du wirklich deinen Account löschen?',
            async () => await deleteAccount(),
          );
          break;
        case 'change_password':
          navigation.navigate('Passwort ändern');
          break;

        case 'change_username':
          navigation.navigate('Nutzernamen ändern');
          break;

        default:
          console.warn('Action not defined for type', type, action);
          break;
      }
    } else if (type === 'document') {
      switch (action) {
        case 'license':
          navigation.navigate('Rechtliches Dokument', {
            document_id: action,
          });
          break;
        case 'privacy':
          navigation.navigate('Rechtliches Dokument', {
            document_id: action,
          });
          break;

        default:
          console.warn('Action not defined for type', type, action);
          break;
      }
    }
  };
  return (
    <View style={styles.panel}>
      <View style={{ paddingLeft: 8 }}>
        <Text style={styles.panelHeader}>{sectionTitle}</Text>
        <Text style={styles.panelHeader_s}>{sectionDescription}</Text>
      </View>
      {/* General sections */}
      {subSections.map((subSec, i) => (
        <SubSection
          onPressAction={(action, type) => handleAction(action, type)}
          settingOptions={subSec.options}
          subSectionTitle={subSec.subsectionTitle}
          key={`${i}`}
          onValueChange={opt => console.log(opt)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    // Use the appropriate color from your theme
    borderRadius: 5,
    paddingTop: 20,
    borderBottomWidth: 1,
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 1.41, // Shadow radius for iOS
    elevation: 2, // Elevation for Android
    ...defaultCardTheme,
    borderColor: colors.primary,
    backgroundColor: appThemeColor.darkBlue,
  },
  panelHeader_s: {
    fontSize: getFontSize(15),
    fontWeight: '200',
    opacity: 0.7,
    color: colors.bluish, // Adjust the color to match your design
    paddingBottom: 25,
  },
  panelHeader: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: colors.bluish, // Adjust the color to match your design
    paddingBottom: 10,
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: colors.textLight, // Adjust the color to match your design
    paddingBottom: 5,
    paddingLeft: 8,
  },
});

export default Panel;
