import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../styles';
import { bodyTextRegular } from '../styles/partials';

export const BlockItem = ({
  action_id = '',
  text,
  iconName,
  icon,
  value,
  index,
  maxItems,
  clickable = true,
  onPress = function (action_id) {},
}) => (
  <Pressable
    disabled={!clickable}
    onPress={() => onPress(action_id)}
    style={[
      styles.popup,
      index === maxItems - 1
        ? {
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderBottomWidth: 0,
          }
        : !index && { borderTopLeftRadius: 5, borderTopRightRadius: 5 },
      !clickable && { opacity: 0 },
    ]}
  >
    <Text style={[{ color: colors.primary, fontFamily: fonts.primaryRegular }]}>
      {text}
    </Text>
    {typeof icon === 'function' ? (
      icon()
    ) : (
      <Entypo name={iconName} size={24} color={colors.primary} />
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  popup: {
    width: 180,
    minHeight: 40,
    backgroundColor: colors.bluish,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: colors.bluish,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
});
