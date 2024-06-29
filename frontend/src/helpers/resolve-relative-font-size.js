import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
export default getFontSize;
