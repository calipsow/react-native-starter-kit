import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const PaginationNumeric = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        {/* Vorheriger Button */}
        <TouchableOpacity style={[styles.button, styles.prevNextButton]}>
          <Text style={styles.prevNextIcon}>&lt;</Text>
        </TouchableOpacity>

        {/* Seitenzahlen */}
        <View style={styles.pageNumbers}>
          {/* Aktive Seite */}
          <View
            style={[
              styles.pageNumber,
              { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
              styles.activePage,
            ]}
          >
            <Text style={styles.pageNumberText}>1</Text>
          </View>
          {/* Andere Seiten */}
          <TouchableOpacity style={styles.pageNumber}>
            <Text style={styles.pageNumberText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageNumber}>
            <Text style={styles.pageNumberText}>3</Text>
          </TouchableOpacity>
          <View style={styles.pageNumber}>
            <Text style={styles.pageNumberText}>…</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.pageNumber,
              { borderBottomRightRadius: 5, borderTopRightRadius: 5 },
            ]}
          >
            <Text style={styles.pageNumberText}>9</Text>
          </TouchableOpacity>
        </View>

        {/* Nächster Button */}
        <TouchableOpacity style={[styles.button, styles.prevNextButton]}>
          <Text style={styles.prevNextIcon}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 25,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  prevNextButton: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    color: colors.textCreme,
    borderColor: colors.primaryDark,
  },
  prevNextIcon: {
    color: colors.textCreme,
    fontFamily: fonts.primaryBold,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  pageNumber: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    backgroundColor: colors.primary,
    marginHorizontal: -1,
  },
  activePage: {
    backgroundColor: colors.primaryDark,
  },
  pageNumberText: {
    color: colors.textCreme,
    fontFamily: fonts.primaryBold,
  },
});

export default PaginationNumeric;
