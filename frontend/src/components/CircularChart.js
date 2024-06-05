import { StyleSheet, Text, View } from 'react-native';
import { DonutChart } from 'react-native-circular-chart';
import { colors, fonts, width } from '../styles';
import {
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../styles/partials';
import calculatePercentageInRange from '../functions/calculations/calculate-percentage-in-range-value';
import getFontSize from '../functions/ui/resolve-relative-font-size';

const example_data = ['ACTIVITY', 'ACTIVITY'].map((_, i) => ({
  name: _,
  value: !i ? 5 : 0,
  color:
    i <= Object.values(colors).length
      ? Object.values(colors)[i]
      : colors.brightRed,
}));
/**
 *
 * @prop {Array} DATA dataset to display
 * @prop {Object} label chart headline
 * @prop {Number} maxValue max score
 * @prop {Number} minValue min score
 * @prop {Number} givenValue given value between minValue and maxValue
 * @prop {Object} calculationRange the number range in wich the relative value of the given in the range of minValue and maxValue should be returned
 */

const CircularChart = ({
  DATA = example_data,
  label = {
    title: 'Statistiken',
    labelTextStyles: {},
    subLabelText: 'Statistics are from the last 30 days.',
    subLabelTextStyle: { ...smallCaptionTextGray },
  },
  maxValue = 10,
  minValue = 0,
  givenValue = 2,
  calculationRange = {
    start: -119,
    end: 120,
  },
}) => {
  return (
    <View style={styles.sectionWrapper}>
      <View
        style={[
          {
            gap: 3,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: 25,
            marginBottom: 30,
            paddingHorizontal: 15,
          },
        ]}
      >
        <Text
          numberOfLines={2}
          style={[
            mediumHeadlineText,
            { textAlign: 'center', lineHeight: 18 },
            label?.labelTextStyles && label?.labelTextStyles,
          ]}
        >
          {label.title}
        </Text>
        {label.subLabelText && (
          <Text
            numberOfLines={7}
            style={[
              smallCaptionTextGray,
              { textAlign: 'center', lineHeight: 14,  fontSize: getFontSize(14), },
              label.subLabelTextStyle || {},
            ]}
          >
            {label.subLabelText}
          </Text>
        )}
      </View>
      <DonutChart
        data={DATA}
        strokeWidth={15}
        radius={90}
        containerWidth={width - screenPadding.paddingHorizontal * 2}
        containerHeight={105 * 2}
        type="round"
        startAngle={120} // RANGE: -119 0% 120 100%
        endAngle={-120}
        animationType="slide"
        labelValueStyle={{
          color: colors.bluish,
          fontSize: getFontSize(25),
          textAlign: 'center',
        }}
        labelTitleStyle={{
          color: colors.lightBlue,
          fontSize: getFontSize(14),
          textAlign: 'center',
          fontFamily: fonts.primaryRegular,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginTop: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default CircularChart;
