// TODO Edit App Styles Here
/**
 * @flow
 */
import { Dimensions } from 'react-native';

import colors from './colors';
import fonts from './fonts';
import commonStyles from './common';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;

const scale = size => (width / guidelineBaseWidth) * size;

export { colors, fonts, scale, commonStyles, width, height };
