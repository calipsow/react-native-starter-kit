import ComponentsScreen from './ComponentsView';
import { useState } from 'react';

const ComposedCompScreen = () => {
  const [radioGroupsState, setRadioGroupsState] = useState([0, 0]);
  return (
    <ComponentsScreen
      radioGroupsState={radioGroupsState}
      setRadioGroupsState={setRadioGroupsState}
    />
  );
};

export default ComposedCompScreen;
