import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { bodyTextRegular } from '../styles/partials';
import { sharingConfig } from '../constants/constants';
import { BlockItem } from './PopupMenuOptions';
import { colors } from '../styles';

const PopupMenu = ({
  visible,
  onClose,
  options = sharingConfig,
  onItemPressed = function (action_id) {},
  popupMenuStyles = {},
}) => {
  const [clickable, setClickable] = useState(visible);
  const [animation] = useState(new Animated.Value(0));

  const handleItemPressed = action_id => {
    onClose();
    animateClose();
    onItemPressed(action_id);
  };

  const animateOpen = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const animateClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(); // Auslösung des Schließens nach Animation
  };

  const menuOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const menuTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 0], // Animation für das Öffnen/Schließen
  });

  useEffect(() => {
    if (visible) {
      animateOpen();
    } else {
      animateClose();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.popupContainer,
        {
          opacity: menuOpacity,
          transform: [{ translateY: menuTranslateY }],
        },
        popupMenuStyles && popupMenuStyles,
        !visible && {
          zIndex: -1,
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('back');
          onClose();
          animateClose();
          // Schließt das Menü beim Klicken auf den Hintergrund
        }}
      >
        <View style={styles.backgroundOverlay}>
          {options.map((setting, i) => (
            <BlockItem
              clickable={visible}
              maxItems={options.length}
              index={i}
              icon={setting.icon}
              text={setting.title}
              action_id={setting.action_id}
              key={setting.action_id}
              onPress={handleItemPressed}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Wichtig, damit das Popup über anderen Elementen liegt
  },
  backgroundOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: colors.blue,
    alignItems: 'flex-end',
  },
  popup: {
    width: 180,
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    paddingVertical: 0,
    justifyContent: 'center',
  },
  option: {
    padding: 10,
    alignItems: 'center',
  },
});

export default PopupMenu;
