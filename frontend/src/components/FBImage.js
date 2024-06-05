/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

class FBImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: props.src,
      errored: false,
      fallbackStyles: props.fallbackStyles,
    };
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc,
        fallbackStyles: [this.props.style, this.props.fallbackStyles || {}],
        errored: true,
      });
      // console.log(this.state.fallbackStyles);
    }
  };

  render() {
    const { src, errored, fallbackStyles } = this.state;
    const { src: _1, fallbackSrc: _2, style: _3, ...props } = this.props;

    return (
      <Image
        src={src}
        onError={this.onError}
        style={[this.props.style, errored && fallbackStyles]}
        {...props}
      />
    );
  }
}

FBImage.propTypes = {
  src: PropTypes.string,
  fallbackSrc: PropTypes.string,
  fallbackStyles: PropTypes.object,
};

export default FBImage;
