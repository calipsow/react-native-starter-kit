import { useEffect, useState } from 'react';

const useTryToExtractCreatedBy = data => {
  const [createdBy, setCreatedBy] = useState(null);
  const [failed, setFailed] = useState(false);

  const getContent = (content = data) => {
    try {
      let d = content['created_by'][Object.keys(content['created_by'])[0]];
      d && setCreatedBy(d);
      setFailed(false);
    } catch (e) {
      // console.log('Could not extract created by object from event');
      if (content['created_by']) setCreatedBy(content['created_by']);
      else setFailed(true);
    }
  };

  useEffect(() => {
    getContent(data);
  }, []);

  return { createdBy, getContent, failed };
};

export default useTryToExtractCreatedBy;
