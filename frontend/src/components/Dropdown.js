import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, width } from '../styles';
import { maxWidth } from '../styles/partials';
import getFontSize from '../helpers/resolve-relative-font-size';

class RNSDropDown extends React.Component {
  static defaultProps = {
    placeholder: 'Please Select...',
    selectedIndex: 0,
    color: colors.primary,
    borderColor: colors.primary,
  };

  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({ isOpened: true });
  };

  _closeModal = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      borderColor,
      selectedIndex,
      placeholder,
      textStyle,
    } = this.props;
    return (
      <ModalDropdown
        options={items}
        onDropdownWillShow={this._openModal}
        onDropdownWillHide={this._closeModal}
        dropdownStyle={{
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          backgroundColor: colors.primary,
          marginHorizontal: 10,
          borderColor: colors.primaryDark,
          borderWidth: StyleSheet.hairlineWidth,
          borderBottom: 0,
          borderRadius: 5,
        }}
        adjustFrame={params => {
          // eslint-disable-next-line no-param-reassign
          params.left = 0;
          // eslint-disable-next-line no-param-reassign
          params.right = 0;
          return params;
        }}
        renderRow={text => (
          <View
            style={[
              {
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: 'transparent',
              },
            ]}
          >
            <Text
              style={[
                { color },
                {
                  fontFamily: fonts.primaryRegular,
                  fontSize: getFontSize(15),
                },
                textStyle && textStyle,
              ]}
            >
              {text}
            </Text>
          </View>
        )}
        onSelect={onSelect}
        onTouchStart={e => this.props.onTouchStart || {}}
      >
        <View
          style={[
            styles.container,
            style && style,
            { borderColor },
            this.state.isOpened && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        >
          <Text
            style={[
              { color },
              {
                fontFamily: fonts.primaryRegular,
                fontSize: getFontSize(15),
                lineHeight: 16,
              },
              textStyle && textStyle,
            ]}
          >
            {selectedIndex > -1 && items[selectedIndex]
              ? items[selectedIndex]
              : placeholder}
          </Text>
          <Icon
            name={this.state.isOpened ? 'angle-up' : 'angle-down'}
            color={color}
            size={20}
            style={styles.icon}
          />
        </View>
      </ModalDropdown>
    );
  }
}

const styles = {
  container: {
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderColor: colors.primaryDark,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
};

export default RNSDropDown;
