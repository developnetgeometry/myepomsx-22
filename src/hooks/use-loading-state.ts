
import { useState, useCallback } from 'react';

interface UseLoadingStateReturn {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
}

/**
 * A hook for managing loading states in async operations
 */
export const useLoadingState = (initialState = false): UseLoadingStateReturn => {
  const [isLoading, setIsLoading] = useState(initialState);
  
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      startLoading();
      return await fn();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);
  
  return { isLoading, startLoading, stopLoading, withLoading };
};
