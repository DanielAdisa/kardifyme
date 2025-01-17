import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

export function useLocalStorageState<T>(key: string, initialState: T) {
    const [state, setState] = useState<T>(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialState;
      } catch {
        return initialState;
      }
    });
  
    const debouncedSave = useCallback(
      debounce((newState: T) => {
        try {
          const serializedState = JSON.stringify(newState);
          if (serializedState.length * 2 > 5 * 1024 * 1024) {
            console.warn('State too large for localStorage');
            return;
          }
          localStorage.setItem(key, serializedState);
        } catch (err) {
          console.error('Failed to save state to localStorage:', err);
        }
      }, 1000),
      [key]
    );
  
    useEffect(() => {
      debouncedSave(state);
    }, [state, debouncedSave]);
  
    return [state, setState] as const;
  }