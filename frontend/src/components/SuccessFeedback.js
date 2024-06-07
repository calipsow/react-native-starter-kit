import { Text, View } from 'react-native';
import RNSButton from './Button';
import { colors, fonts } from '../styles';
import { screenPadding, smallTextGray } from '../styles/partials';
import { SubmitButton } from './SubmitButton';

export const SuccessMessage = ({
  message = '',
  navigation,
  hideButton = false,
  onPressReset = null,
}) => (
  <View
    style={{
      flex: 1,
      paddingTop: 8,
      gap: 10,
      ...screenPadding,
      justifyContent: 'center',
      alignSelf: 'center',
    }}
  >
    {message && (
      <Text
        style={[
          smallTextGray,
          {
            maxWidth: 330,
            fontFamily: fonts.primaryRegular,
            textAlign: 'center',
          },
        ]}
      >
        {message}
      </Text>
    )}
    {!hideButton && (
      <RNSButton
        onPress={() => navigation.navigate('Blogs')}
        bgColor={colors.lightBlue}
        textColor={colors.white}
        bordered
        caption="Zum Newsletter"
      />
    )}
    {typeof onPressReset === 'function' && (
      <SubmitButton
        style={{ backgroundColor: colors.primaryDark, margin: 'auto' }}
        textStyle={{ color: colors.white, fontFamily: fonts.primaryBold }}
        text="Weiteres Event einreichen"
        onPress={onPressReset}
      />
    )}
  </View>
);
