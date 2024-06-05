import React, { useState } from 'react';
import HomeScreen from './HomeView';

const HomeContainer = () => {
  const [isExtended, setIsExtended] = useState(false);

  // Pass isExtended and setIsExtended to the HomeScreen component
  // Assume HomeScreen expects these as props
  return <HomeScreen isExtended={isExtended} setIsExtended={setIsExtended} />;
};

export default HomeContainer;
