import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import getFontSize from '../helpers/resolve-relative-font-size';

const ToggleView = ({ previewTitel, content }) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setActive(!active);
      }}
    >
      <View
        style={[
          styles.toggleSection,
          active && { ...styles.activeToggleSection },
        ]}
      >
        <View style={{ maxWidth: '90%' }}>
          <Text style={styles.toggleSectionTitle}>{previewTitel}</Text>
          {active && <Text style={styles.toggleSectionText}>{content}</Text>}
        </View>
        {active ? (
          <Icon name="angle-up" color={colors.bluish} size={20} />
        ) : (
          <Icon name="angle-down" color={colors.bluish} size={20} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
  },

  toggleSection: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  activeToggleSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: colors.primaryDark,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  toggleSectionTitle: {
    fontSize: getFontSize(18),
    lineHeight: 18,
    color: colors.textCreme,
  },
  toggleSectionText: {
    marginTop: 20,
    fontSize: getFontSize(16),
    lineHeight: 16,
    color: colors.lightGray,
  },
  toggleSectionToggle: {},
});

export default ToggleView;
