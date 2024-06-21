import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { fbImage } from '../../constants/constants';
import { width } from '../../styles';

/**
 * A custom hook for obtaining the dimensions of an image based on its URL and the window width.
 * It calculates and adjusts the image dimensions to fit within the provided window width.
 *
 * @param {string} imageUrl - URL of the image whose dimensions are to be fetched.
 * @param {number} windowWidth - The width of the window (or container) in which the image will be displayed.
 * @returns {Object} An object containing image width, height, relative height, and any potential error.
 */
const useImageDimensions = (imageUrl, windowWidth) => {
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [relativeHeight, setRelativeHeight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrl) {
      setError('No valid image URL provided');
      return;
    }

    Image.getSize(
      imageUrl,
      (width, height) => {
        setImgWidth(width);
        setImgHeight(height);
        if (windowWidth && width) {
          const scalingFactor = windowWidth / width;
          const scaledHeight = scalingFactor * height;
          setRelativeHeight(scaledHeight);
        }
      },
      failureReason => {
        setError('Error loading image: ' + failureReason);
      },
    );
  }, [imageUrl, windowWidth]);

  return { imgWidth, imgHeight, relativeHeight, error };
};

/**
 * A dynamic variant of the useImageDimensions hook that allows for on-demand dimension calculations.
 * It supports fallback to a default image when the specified image fails to load.
 *
 * @returns {Object} An object containing image dimensions, a function to trigger dimension calculation, and any errors.
 */
export const useImageDimensionsDynamic = () => {
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [relativeHeight, setRelativeHeight] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrlFb, setImageUrlFb] = useState(null);

  const getImageDimensions = (imageUrl, windowWidth) => {
    if (!imageUrl) {
      setError('No valid image URL provided');
      return;
    }

    Image.getSize(
      imageUrl,
      (width, height) => {
        setImgWidth(width);
        setImgHeight(height);
        if (windowWidth && width) {
          const scalingFactor = windowWidth / width;
          const scaledHeight = scalingFactor * height;
          setRelativeHeight(scaledHeight);
        }
      },
      failureReason => {
        setImageUrlFb(fbImage); // Set fallback image
        setError('Error loading image: ' + failureReason);
      },
    );
  };

  useEffect(() => {
    if (imageUrlFb) {
      getImageDimensions(fbImage, width);
    }
  }, [imageUrlFb]);

  return { imgWidth, imgHeight, relativeHeight, error, getImageDimensions };
};

export default useImageDimensions;
