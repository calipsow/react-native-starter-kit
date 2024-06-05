import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { fbImage } from '../../constants/constants';
import { width } from '../../styles';

const useImageDimensions = (imageUrl, windowWidth) => {
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [relativeHeight, setRelativeHeight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Bereinigung und Initialisierung
    setImgWidth(null);
    setImgHeight(null);
    setRelativeHeight(null);
    setError(null);

    // Prüfen, ob eine gültige URL bereitgestellt wurde
    if (!imageUrl) {
      setError('Keine gültige Bild-URL bereitgestellt');
      return;
    }

    // Verwendung von Image.getSize, um die Breite und Höhe des Bildes zu bekommen
    Image.getSize(
      imageUrl,
      (width, height) => {
        setImgWidth(width);
        setImgHeight(height);
        // Berechne die relative Höhe basierend auf der Fensterbreite
        if (windowWidth && width) {
          const scalingFactor = windowWidth / width;
          const scaledHeight = scalingFactor * height;
          setRelativeHeight(scaledHeight);
        }
        setError(null);
      },
      failureReason => {
        // Fehlerbehandlung
        setError('Fehler beim Laden des Bildes: ' + failureReason);
      },
    );
  }, [imageUrl, windowWidth]);

  return { imgWidth, imgHeight, relativeHeight, error };
};

export const useImageDimensionsDynamic = () => {
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [relativeHeight, setRelativeHeight] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrlFb, setImageUrlFb] = useState(null);

  const getImageDimensions = (imageUrl, windowWidth) => {
    // Bereinigung und Initialisierung
    setImgWidth(null);
    setImgHeight(null);
    setRelativeHeight(null);
    setError(null);

    // Prüfen, ob eine gültige URL bereitgestellt wurde
    if (!imageUrl) {
      setError('Keine gültige Bild-URL bereitgestellt');
      return;
    }

    // Verwendung von Image.getSize, um die Breite und Höhe des Bildes zu bekommen
    Image.getSize(
      imageUrl,
      (width, height) => {
        setImgWidth(width);
        setImgHeight(height);
        // Berechne die relative Höhe basierend auf der Fensterbreite
        if (windowWidth && width) {
          const scalingFactor = windowWidth / width;
          const scaledHeight = scalingFactor * height;
          setRelativeHeight(scaledHeight);
        }
        setError(null);
      },
      failureReason => {
        // Fehlerbehandlung
        setImageUrlFb(fbImage);
        setError('Fehler beim Laden des Bildes: ' + failureReason);
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
