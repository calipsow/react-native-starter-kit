import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import getFontSize from '../helpers/resolve-relative-font-size';

const { height } = Dimensions.get('window'); // Bildschirmhöhe

// SlideUpComponent-Komponente
const SlideUpComponent = ({
  isVisible,
  onClose,
  headerText = '',
  children,
}) => {
  const [slideAnim] = useState(new Animated.Value(height)); // Startposition

  // Animation zum Öffnen und Schließen
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? height / 2 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose()); // Schließen und Callback auslösen
  };

  return (
    <Animated.View
      style={[
        styles.slideUpContainer,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {headerText || 'Dynamischer Slide-up-Screen'}
        </Text>
        <TouchableOpacity onPress={handleClose}>
          <Text>Schließen</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
};

// Beispielbildschirm zur Integration der Slide-up-Komponente
const ParentScreen = () => {
  const [isSlideUpVisible, setIsSlideUpVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Das ist der Parent Screen.</Text>
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setIsSlideUpVisible(true)}
      >
        <Text>Slide-up anzeigen</Text>
      </TouchableOpacity>

      {isSlideUpVisible && (
        <SlideUpComponent
          isVisible={isSlideUpVisible}
          onClose={() => setIsSlideUpVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButton: {
    padding: 10,
    backgroundColor: '#008CBA',
    borderRadius: 5,
  },
  slideUpContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    height: height / 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SlideUpComponent;
