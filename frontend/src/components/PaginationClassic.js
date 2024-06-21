import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import getFontSize from '../helpers/resolve-relative-font-size';

const PaginationClassic = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity style={[styles.button, styles.disabledButton]}>
          <Text style={styles.disabledButtonText}>&lt;- Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.activeButton]}>
          <Text style={styles.activeButtonText}>Next -&gt;</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>
        Showing <Text style={styles.infoTextBold}>1</Text> to{' '}
        <Text style={styles.infoTextBold}>10</Text> of{' '}
        <Text style={styles.infoTextBold}>467</Text> results
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  activeButton: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  activeButtonText: {
    color: '#4f46e5',
  },
  infoText: {
    fontSize: getFontSize(14),
    color: '#9ca3af',
    textAlign: 'center',
  },
  infoTextBold: {
    fontWeight: 'bold',
    color: '#475569',
  },
});

export default PaginationClassic;
