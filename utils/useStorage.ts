import { GlobalState } from './types';
import { useCallback } from 'react';
import _ from 'lodash';
import { initialState, validateState } from './validateState';

export const useStorage = () => {
  const saveState = useCallback(
    _.debounce(async (state: GlobalState) => {
      try {
        const validState = validateState(state);
        localStorage.setItem('state', JSON.stringify(validState));
      } catch (error) {
        console.error('Error saving state:', error);
        throw error;
      }
    }, 1000),
    []
  );

  const loadState = useCallback(async (): Promise<GlobalState | null> => {
    try {
      const localState = localStorage.getItem('state');
      return localState ? JSON.parse(localState) : null;
    } catch (error) {
      console.error('Error loading state:', error);
      return null;
    }
  }, []);

  const backupState = async (
    state: GlobalState
  ): Promise<{ key?: string; error?: string }> => {
    try {
      const validState = validateState(state);
      const res = await fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: validState }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Backup request failed');
      }

      return { key: data.key };
    } catch (error) {
      console.error('Backup failed:', error);
      return {
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const restoreState = async (key: string): Promise<GlobalState> => {
    try {
      if (!key) {
        throw new Error('No key provided');
      }

      const res = await fetch(`/api/restore?key=${encodeURIComponent(key)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || `Restore failed with status ${res.status}`
        );
      }

      return validateState(data.data);
    } catch (error) {
      console.error('Restore failed:', error);
      return initialState;
    }
  };

  return { saveState, loadState, backupState, restoreState };
};
