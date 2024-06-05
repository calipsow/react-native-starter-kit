import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GalleryScreen from './GalleryView';
import { loadImages, refreshImages } from './GalleryState';

const GalleryContainer = () => {
  // Accessing state using useSelector
  const isLoading = useSelector(state => state.gallery.isLoading);
  const images = useSelector(state => state.gallery.images);

  // Getting dispatch function
  const dispatch = useDispatch();

  // Replacing componentDidMount lifecycle method
  useEffect(() => {
    dispatch(loadImages());
    // This empty dependency array ensures the effect runs only once after the initial render,
    // mimicking componentDidMount behavior.
  }, [dispatch]);

  // No need to manually bind action creators as dispatch will be available to the component
  const handleLoadImages = () => dispatch(loadImages());
  const handleRefreshImages = () => dispatch(refreshImages());

  // Passing props to the GalleryScreen component
  return (
    <GalleryScreen
      isLoading={isLoading}
      images={images}
      loadImages={handleLoadImages}
      refreshImages={handleRefreshImages}
    />
  );
};

export default GalleryContainer;
