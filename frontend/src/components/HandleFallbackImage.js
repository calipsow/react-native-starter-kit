import React, { Component, PureComponent } from 'react';
import { Image, ActivityIndicator, View, StyleSheet } from 'react-native';
import isEqual from 'lodash.isequal';

class ImageWithFallback extends Component {
  constructor(props) {
    super(props);

    // Anfangszustand: Bildquelle und weitere Props
    this.state = {
      source: { uri: props?.source?.uri || props.src },
      fallbackSrc:
        'https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fapp%2Fimages%2Fimage-error-fallback.png?alt=media&token=a874f503-f8c2-47e4-a45e-62c3cbd28f4f',
    };
  }

  render() {
    const {
      style,
      resizeMethod,
      resizeMode,
      ActivityIndicator: CustomActivityIndicator,
    } = this.props;

    return (
      <View style={[styles.imageContainer, style]}>
        <Image
          {...this.props} // Übergibt alle dynamischen Props
          source={this.state.source}
          resizeMethod={resizeMethod}
          resizeMode={resizeMode}
          onError={e => {
            // Fallback-Bild setzen und rekursive Fehlerbehandlung verhindern
            this.setState({ source: { uri: this.state.fallbackSrc } });
            e.target.onError = null;
          }}
        />
        {CustomActivityIndicator ? <CustomActivityIndicator /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageWithFallback;
