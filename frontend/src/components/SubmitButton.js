import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import getFontSize from '../functions/ui/resolve-relative-font-size';
import { colors, fonts } from '../styles';

export const SubmitButton = ({
  onPress = function () {},
  text = '',
  style,
  textStyle,
  disabled = false,
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.input,
          paddingVertical: 8,
          paddingHorizontal: 13,
          borderRadius: 4,
        },
        style && style,
      ]}
    >
      <Text
        style={[
          {
            verticalAlign: 'middle',
            margin: 'auto',
            fontSize: getFontSize(16),
            lineHeight: 16,
            color: colors.bluish,
            opacity: 0.9,
          },
          textStyle && textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export function FormSubmitButton({
  loading = false,
  handleSubmit = function () {},
  title = '',
  disabled = null,
}) {
  return (
    <TouchableOpacity
      disabled={typeof disabled === 'boolean' ? disabled : loading}
      style={styles.formSubmitButton}
      onPress={handleSubmit}
    >
      {!loading ? (
        <Text style={styles.formSubmitButtonText}>{title}</Text>
      ) : (
        <ActivityIndicator
          size={'small'}
          color={colors.bluish}
          style={{ margin: 'auto' }}
        />
      )}
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    maxWidth: 600,
  },
  input: {
    backgroundColor: colors.primary,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: colors.bluish,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: getFontSize(16),
    lineHeight: 20,
    height: 'auto', // Damit das Textfeld dynamisch wächst
    paddingVertical: 9,
  },
  textField: {
    height: 'auto', // Damit das Textfeld dynamisch wächst
    minHeight: 40, // Mindesthöhe des Textfelds (optional)
    fontFamily: fonts.primarySemiBold,
    fontSize: getFontSize(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
  formSubmitButton: {
    backgroundColor: '#8B5CF6', // bg-purple-600
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  formSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: getFontSize(17),
    fontFamily: fonts.primaryBold,
  },
});
