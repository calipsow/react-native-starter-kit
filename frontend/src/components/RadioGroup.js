import React from 'react';

import { TouchableOpacity, View, Text } from 'react-native';

import { colors, fonts } from '../styles';
import getFontSize from '../functions/ui/resolve-relative-font-size';

export default function RNSRadioGroup({
  items,
  selectedIndex,
  onChange,
  style,
  underline,
  darkMode,
  textStyles,
}) {
  return (
    <View
      style={[styles.container, underline && styles.underline, style && style]}
    >
      {items &&
        items.map((item, index) => {
          let isActive = false;
          if (selectedIndex !== undefined && selectedIndex === index)
            isActive = true;

          let activeStyle = styles.itemActive;
          if (underline) activeStyle = styles.itemActiveUnderline;

          let activeTextStyle = styles.textActive;
          if (underline) activeTextStyle = styles.textActiveUnderline;

          return (
            <TouchableOpacity
              onPress={() => onChange(index)}
              key={item.id || item}
              style={[
                styles.item,
                underline && styles.itemUnderline,
                isActive && activeStyle,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  textStyles && textStyles,
                  underline && styles.textUnderline,
                  isActive && !darkMode
                    ? { ...activeTextStyle, color: colors.bluish }
                    : isActive && activeTextStyle,
                ]}
              >
                {item.value || item}
              </Text>
              {underline && isActive && (
                <View
                  style={{
                    height: 5,
                    borderBottomColor: colors.yellow,
                    borderBottomWidth: 3,
                    position: 'absolute',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  underline: {
    borderWidth: 0,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 30,
  },
  itemUnderline: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#e3e3e3',
  },
  itemActive: {
    backgroundColor: colors.primaryDark + 'af',
  },
  itemActiveUnderline: {
    borderBottomWidth: 3,
    borderBottomColor: colors.lightGray,
    paddingBottom: 2,
  },
  text: {
    color: colors.bluish,
    fontSize: getFontSize(15),
  },
  textUnderline: {
    color: '#a6a6a6',
  },
  textActive: {
    color: colors.bluish,
    fontWeight: 'bold',
  },
  textActiveUnderline: {
    color: colors.primary,
  },
};
