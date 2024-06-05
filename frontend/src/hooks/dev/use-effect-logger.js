import { useEffect } from 'react';

export const useEffectLogger = (...values) => {
  useEffect(() => {
    console.log(...values);
  }, []);
};

export const useDependencyLogger = (log_initial = false, ...values) => {
  useEffect(() => {
    if (!log_initial) {
        log_initial = 1; // prevent constant blocking after the initial run
        return; 
    }
    console.log(...values);
  }, [...values]);
};
