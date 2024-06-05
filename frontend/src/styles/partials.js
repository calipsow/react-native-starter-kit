import { colors, fonts } from '.';
import getFontSize from '../functions/ui/resolve-relative-font-size';

export const tag = {
  borderRadius: 5,
  paddingHorizontal: 15,
  paddingVertical: 3,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.gray + '6f',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colors.lightBlue,
};
export const tagText = {
  fontSize: getFontSize(15),
  color: colors.lightBlue,
  fontFamily: 'Lato-Bold',
  lineHeight: 16.5,
  fontWeight: 'bold',
  fontVariant: ['small-caps'],
};
export const tagsWrapperBox = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginVertical: 5,
  width: '100%',
  flexWrap: 'wrap',
  //    rowGap: 5,
  gap: 5,
};
export const mediumHeadlineText = {
  color: '#ffffff',
  fontSize: getFontSize(22),
  fontWeight: 'bold',
};
export const grayCaption = {
  color: '#9b9b9b',
  fontSize: getFontSize(16),
  opacity: 1,
  fontFamily: fonts.primarySemiBold,
};
export const sectionTitleCreme = {
  fontFamily: 'Lato-Bold',
  color: '#EEF5DB',
  fontSize: getFontSize(19),
  marginVertical: 10,
  fontWeight: 'bold',
  letterSpacing: -0.2,
};
export const regularTextLight = {
  color: '#f1f1f1dd',
  fontSize: getFontSize(16),
  opacity: 0.95,
  fontFamily: 'Lato-Regular',
};
export const smallTextGray = {
  color: '#f1f1f1',
  opacity: 0.8,
  fontSize: getFontSize(14),
  fontFamily: 'Lato-Regular',
};
export const smallCaptionTextGray = {
  color: '#acacac',
  fontSize: getFontSize(12),
  fontFamily: 'Lato-SemiBold',
};
export const textBtnDark = {
  fontFamily: 'Lato-Bold',
  color: '#1A222E',
  fontSize: getFontSize(18),
  lineHeight: 18,
};
export const subHeaderTextLightGray = {
  paddingVertical: 10,
  color: '#f1f1f1',
  fontSize: getFontSize(20),
  fontFamily: 'Lato-SemiBold',
};
export const captionTxtTrpYellow = {
  fontSize: getFontSize(12),
  fontWeight: '700',
  color: '#f8f018',
  marginBottom: 4,
  textTransform: 'uppercase',
  fontFamily: 'Lato-Bold',
  opacity: 0.8,
};

export const flexBoxRow = {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 0,
};
export const screenPadding = {
  paddingHorizontal: 12,
};
export const appThemeColor = {
  darkBlue: '#131A27',
};
export const defaultCardTheme = {
  backgroundColor: '#131A27',
  borderWidth: 1,
  borderColor: '#576981',
};
export const input = {
  backgroundColor: colors.primary,
  marginBottom: 15,
  paddingHorizontal: 10,
  height: 40,
  borderRadius: 4,
  color: colors.bluish,
  borderColor: colors.primaryDark,
  borderWidth: 1,
  borderStyle: 'solid',
};
export const maxWidth = {
  width: '100%',
  maxWidth: 500, // Adjust based on your layout needs
};
export const bodyTextRegular = {
  color: colors.bluish,
  opacity: 1,
  marginTop: 0,
  fontSize: getFontSize(14),
  fontFamily: fonts.primaryRegular,
};
export const blueCaptionText = {
  fontSize: getFontSize(16),
  marginVertical: 0,
  opacity: 1,
  color: colors.lightBlue,
  fontFamily: fonts.primaryBold,
};
