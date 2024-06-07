import { useCallback, useState } from 'react';

export const useRefreshControl = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(
    ({ callbackAsync = null, callback = function () {} }) => {
      setRefreshing(true);
      if (typeof callbackAsync === 'function') {
        callbackAsync().finally(() => setRefreshing(false));
      } else {
        callback();
        setRefreshing(false);
      }
    },
    [],
  );

  return { onRefresh, refreshing };
};
