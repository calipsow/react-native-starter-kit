import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { colors } from '../styles';

const _options = [
  { id: 0, period: 'Most Popular' },
  { id: 1, period: 'Newest' },
  { id: 2, period: 'Lowest Price' },
  { id: 3, period: 'Highest Price' },
];

const RNSDropdownFullPage = ({ options = _options, onSelect, mnuOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (dropdownOpen) {
      onSelect(selected);
      setDropdownOpen(false);
    }
  }, [selected]);

  useEffect(() => {
    if (mnuOpen !== dropdownOpen && typeof mnuOpen === 'boolean') {
      setDropdownOpen(mnuOpen);
    }
  }, [mnuOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={styles.buttonText}>{options[selected].period}</Text>
      </TouchableOpacity>
      <Modal
        visible={dropdownOpen}
        transparent={true}
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={[styles.dropdown, { maxHeight: options.length * 55 }]}>
            <FlatList
              data={options}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelected(item.id);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.id === selected && styles.selectedOption,
                    ]}
                  >
                    {item.period}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: 'white',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
  buttonText: {
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    paddingTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: Dimensions.get('window').width * 0.6,
  },
  option: {
    width: '100%',

    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: colors.bluish,
  },
  selectedOption: {
    color: colors.lightBlue,
  },
});

export default RNSDropdownFullPage;
