import { View, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles';
import { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

const Option = ({
  text,
  onSwitch = function () {},
  enabledState,
  setting_id,
  setting_type,
  onPress = function (id, type) {},
}) => {
  const [enabled, setEnabled] = useState(null); // to prevent trigger rerender on first load

  useEffect(() => {
    if (setting_type !== 'switch') return;
    if (typeof enabled === 'boolean')
      onSwitch({ setting: text, enabled: enabled });
  }, [enabled]);

  if (setting_type !== 'switch')
    return (
      <ActionOption
        setting_type={setting_type}
        setting_id={setting_id}
        onPress={(id, type) => onPress(id, type)}
        text={text}
      />
    );
  else if (setting_type === 'switch')
    return (
      <View style={styles.option}>
        <Text style={styles.optionText}>{text}</Text>
        <Switch
          style={{ marginRight: 12 }}
          value={typeof enabled === 'boolean' ? enabled : enabledState}
          onValueChange={() => {
            setEnabled(typeof enabled === 'boolean' ? !enabled : !enabledState);
          }}
        />
      </View>
    );
};

const ActionOption = ({
  text,
  onPress = function (id, type) {},
  setting_id,
  setting_type,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(setting_id, setting_type)}>
      <View style={styles.option}>
        <Text style={styles.optionText}>{text}</Text>
        <Entypo
          name="chevron-right"
          size={16}
          color={colors.white}
          style={{ marginRight: 12 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.6,
    borderColor: colors.primaryDark + 'ef',
    paddingVertical: 12,
    borderBottomColor: colors.primaryDark + 'e0',
  },
  optionText: {
    color: colors.white, // Adjust the color to match your design
    fontSize: getFontSize(16),
    paddingHorizontal: 15,
  },
});

export default Option;
