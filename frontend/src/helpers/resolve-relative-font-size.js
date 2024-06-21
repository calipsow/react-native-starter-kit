import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();
// console.log(fontScale);
const getFontSize = size => size / fontScale;
export default getFontSize;
