import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, width } from '../../../styles';
import { appThemeColor, screenPadding } from '../../../styles/partials';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

export const styles = StyleSheet.create({
  secTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textCreme,
    fontSize: getFontSize(22),
    marginVertical: 10,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%', // Die Breite des Bildes entspricht der Breite des Containers
    height: Dimensions.get('window').width * width < 900 ? 1.09 : 0.9, // Setze die Höhe des Bildes
    borderRadius: 0, // Füge bei Bedarf abgerundete Ecken hinzu
    objectFit: 'cover',
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: appThemeColor.darkBlue,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
  },
  headerBlogText: {
    color: colors.lightGray,
    fontSize: getFontSize(30),
    fontFamily: fonts.primaryBold,
  },
  headerText: {
    paddingLeft: 10,
    color: colors.textLight,
    fontSize: getFontSize(22),
    fontFamily: fonts.primarySemiBold,
  },
  content: {
    paddingVertical: 5,
    paddingTop: 18,
  },
  title: {
    color: colors.white,
    fontSize: getFontSize(25),
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    color: colors.lightGray,
    fontSize: getFontSize(16),
    marginBottom: 10,
  },
  postContent: {
    color: colors.textLight,
    fontSize: getFontSize(18),
    opacity: 0.95,
    fontFamily: fonts.primaryRegular,
    marginBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#333333',
    ...screenPadding,
  },
  input: {
    color: colors.textLightBlue,
    borderColor: '#333333',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
