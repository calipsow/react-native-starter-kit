import { useState, useContext } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import 'firebase/storage';
import { Firebase } from '../../../App'; // Ensure correct path is used
import compressImage from '../../functions/compress-image';
import { ModalContext } from '../../modules/provider/ModalProvider';

/**
 * Custom React hook for uploading images to Firebase Storage.
 * Includes state for upload progress, upload completion, error handling, and the resulting image URL.
 * This hook requires the Firebase Storage! 
 * returns  An object containing functions and state related to the image upload process.
 */
const useImageUpload = () => {
  const { app } = useContext(Firebase); // Access Firebase instance from context
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress percentage
  const [uploadError, setUploadError] = useState(''); // State to store any errors that occur during upload
  const [isUploading, setIsUploading] = useState(false); // State to indicate if an upload is currently in progress
  const [imageUrl, setImageUrl] = useState(''); // State to store the URL of the uploaded image
  const { showModalAlert } = useContext(ModalContext); // Context for showing modal alerts

  /**
   * Initiates the image upload process by selecting an image and uploading it to Firebase Storage.
   *
   * @param {string} uploadPath - The path in Firebase Storage where the image will be uploaded.
   */
  const startImageUpload = async uploadPath => {
    await launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        // Show modal alert if there is an error with the image picker
        showModalAlert(
          'Something went wrong.',
          'The image cannot be uploaded, please choose another one.',
        );
        console.warn(response.error);
      } else {
        setIsUploading(true); // Set uploading state to true
        const { uri: imageUri } = response.assets[0]; // Extract the URI of the selected image
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const fullUploadPath = `${uploadPath}/${fileName.split('.')[0]}.jpeg`;

        try {
          const compressedBlob = await compressImage(imageUri); // Compress the image before uploading

          const storage = getStorage(app);
          const storageRef = ref(storage, fullUploadPath); // Create a reference in Firebase Storage
          const uploadTask = uploadBytesResumable(storageRef, compressedBlob, {
            contentType: `image/jpeg`,
          });

          // Monitor state changes, such as progress, error, and completion
          uploadTask.on(
            'state_changed',
            snapshot => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calculate upload progress
              setUploadProgress(progress); // Update progress state
            },
            error => {
              // Handle errors during upload and log them
              setUploadError(error.message);
              setIsUploading(false);
              console.log(error);
            },
            () => {
              // Handle successful completion of upload
              setUploadProgress(100);
              setUploadError('');

              getDownloadURL(storageRef)
                .then(url => {
                  setImageUrl(url); // Store the image URL in state
                  setIsUploading(false);
                })
                .catch(error => {
                  // Handle errors in retrieving the download URL
                  setUploadError(error.message);
                  console.log(error);
                  setIsUploading(false);
                });
            },
          );
        } catch (error) {
          // Handle exceptions, such as compression failures
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
