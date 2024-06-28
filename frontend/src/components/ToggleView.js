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
          <Icon name="minus" color={colors.bluish} size={15} />
        ) : (
          <Icon name="plus" color={colors.bluish} size={15} />
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
    backgroundColor: '#4e5a6b',
    borderColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  activeToggleSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#4e5a6b',
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
    color: colors.white,
    fontWeight: '500',
  },
  toggleSectionText: {
    marginTop: 4,
    fontSize: getFontSize(16),
    lineHeight: 16,
    color: '#c6c9cc',
  },
  toggleSectionToggle: {},
});

export default ToggleView;
