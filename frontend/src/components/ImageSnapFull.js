import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import Lightbox from 'react-native-lightbox-v2';

import { _imagesArray } from '../modules/availableInFullVersion/sample-data';
// import useResizeSnapView from './resizehook'
const windowWidth = Dimensions.get('window').width;

const ImageSnapCarousel = ({ imagesArray = _imagesArray, imageStyles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  const onScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(scrollPosition / windowWidth);
    setCurrentIndex(selectedIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        decelerationRate="fast"
        snapToInterval={windowWidth}
      >
        {imagesArray.map((image, index) => (
          <Lightbox key={index}>
            <Image
              source={{ uri: image }}
              style={[styles.image, imageStyles && imageStyles]}
            />
          </Lightbox>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {imagesArray.map((image, index) => (
          <Text
            key={index}
            style={[
              styles.indicator,
              index === currentIndex ? styles.activeIndicator : null,
            ]}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: windowWidth,
    height: 300,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    color: 'gray',
    margin: 3,
  },
  activeIndicator: {
    color: '#ffffff',
  },
});

export default ImageSnapCarousel;
