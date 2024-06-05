import ImageResizer from 'react-native-image-resizer';

const compressImage = async uri => {
  try {
    // Überprüfe die Dateigröße
    const response = await fetch(uri);
    const blob = await response.blob();
    const initialSize = blob.size / 1024; // Größe in KB

    if (initialSize > 250) {
      // Komprimiere und konvertiere das Bild, falls notwendig
      // prettier-ignore
      const resizedImage = await ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 80, 0, null, true, { mode: 'cover' });
      const resizedResponse = await fetch(resizedImage.uri);
      const resizedBlob = await resizedResponse.blob();
      return resizedBlob;
    } else {
      // Keine Konvertierung oder Komprimierung notwendig
      return blob;
    }
  } catch (error) {
    console.error('Fehler beim Komprimieren des Bildes:', error);
    throw new Error('Fehler beim Verarbeiten des Bildes');
  }
};

export default compressImage;
