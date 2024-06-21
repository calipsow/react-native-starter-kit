import ImageResizer from 'react-native-image-resizer';

/**
 * Compresses and resizes an image if it exceeds a specified size threshold.
 *
 * @param {string} uri - The URI of the image to be processed.
 * @returns {Blob} The compressed (and possibly resized) image as a Blob.
 * @throws {Error} Throws an error if image processing fails.
 */
const compressImage = async uri => {
  try {
    // Fetch the image from the provided URI to check its initial size.
    const response = await fetch(uri);
    const blob = await response.blob();
    const initialSize = blob.size / 1024; // Convert size from bytes to kilobytes

    // Determine if the image needs resizing based on its initial size.
    if (initialSize > 250) {
      // Image needs resizing if it's larger than 250KB.
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        800, // width in pixels
        600, // height in pixels
        'JPEG', // compress format
        80, // quality
        0, // rotation
        null, // output path (null uses default temporary directory)
        true, // keep or not the EXIF data
        { mode: 'cover' }, // resize mode
      );

      // Fetch the resized image to return it as a Blob.
      const resizedResponse = await fetch(resizedImage.uri);
      const resizedBlob = await resizedResponse.blob();
      return resizedBlob;
    } else {
      // Return the original image if it doesn't exceed the size threshold.
      return blob;
    }
  } catch (error) {
    console.error('Error compressing the image:', error);
    throw new Error('Error processing the image');
  }
};

export default compressImage;
