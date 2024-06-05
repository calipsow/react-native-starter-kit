import { useState, useContext } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import 'firebase/storage';
import { Firebase } from '../../../App'; // Pfad anpassen
import compressImage from '../../functions/compress-image';
import { ModalContext } from '../../modules/provider/ModalProvider';

const useImageUpload = () => {
  // Zustände für Upload-Fortschritt und Fehler
  const { app } = useContext(Firebase);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // Zustand für die URL des hochgeladenen Bildes
  const { showModalAlert } = useContext(ModalContext);

  const startImageUpload = async uploadPath => {
    await launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        showModalAlert(
          'Etwas ist schiefgelaufen.',
          'Das Bild kann nicht hochgeladen, bitte wähle ein anderes.',
        );
        console.warn(response.error);
      } else {
        setIsUploading(true);
        const { uri: imageUri } = response.assets[0];
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const fullUploadPath = `${uploadPath}/${
          fileName.split('.')[0] + '.jpeg'
        }`;

        try {
          const compressedBlob = await compressImage(imageUri);

          const storage = getStorage(app);
          const storageRef = ref(storage, fullUploadPath);
          const uploadTask = uploadBytesResumable(storageRef, compressedBlob, {
            contentType: `image/jpeg`,
          });

          uploadTask.on(
            'state_changed',
            snapshot => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            error => {
              setUploadError(error.message);
              setIsUploading(false);
              console.log(error);
            },
            () => {
              setUploadProgress(100);
              setUploadError('');

              getDownloadURL(storageRef)
                .then(url => {
                  setImageUrl(url); // Speichere die URL im Zustand
                  setIsUploading(false);
                })
                .catch(error => {
                  setUploadError(error.message);
                  console.log(error);
                  setIsUploading(false);
                });
            },
          );
        } catch (error) {
          setUploadError(error.message);
          setIsUploading(false);
          console.error(error);
        }
      }
    });
  };

  return {
    startImageUpload,
    uploadProgress,
    uploadError,
    isUploading,
    imageUrl,
    setImageUrl,
  };
};

export default useImageUpload;
