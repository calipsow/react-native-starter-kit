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
import { stubImages } from '../modules/gallery/GalleryState';

// import useResizeSnapView from './resizehook'
const windowWidth = Dimensions.get('window').width;

const ImageSnapCarousel = ({ imagesArray = stubImages, imageStyles }) => {
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
              source={{ uri: image.link }}
              style={[styles.image, imageStyles && imageStyles]}
            />
          </Lightbox>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {imagesArray.map((_, index) => (
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
    marginVertical: 8,
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
