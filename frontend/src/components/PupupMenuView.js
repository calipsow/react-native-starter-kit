import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Block,
  Mute,
  Follow,
  Why,
  Question,
  NotInterested,
} from './PopupMenuOptions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles';

const Divider = () => <View style={styles.divider} />;
const PopupMenuView = () => {
  const [open, setOpen] = useState(false);
  return (
    <MenuProvider style={[styles.container]}>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {},
          }}
        >
          <FontAwesome
            name="share-alt-square"
            size={25}
            color={colors.bluish}
            style={[
              {
                margin: 'auto',
                paddingTop: 7,
              },
            ]}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
            },
          }}
        >
          <NotInterested
            text="Not interested"
            value="Not Interested"
            iconName="emoji-sad"
          />
          <Divider />
          <Block text="Block" value="Block" iconName="block" />
          <Divider />
          <Mute text="Mute" value="Mute" iconName="sound-mute" />
          <Divider />
          <Follow text="Follow" value="Follow" iconName="user-follow" />
          <Divider />
          <Why text="Why this ad?" value="why this ad" iconName="question" />
          <Divider />
          <Question
            text="Report this ad"
            value="Report this ad"
            iconName="flag"
          />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

export default PopupMenuView;

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#7F8487',
  },
});
