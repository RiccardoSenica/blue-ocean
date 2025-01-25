'use client';

import { Alert, AlertDescription } from '@components/ui/alert';
import { StateContext, StateContextType } from './StateContext';
import { Loader2 } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { useStorage } from '@utils/useStorage';
import { stateReducer } from '@utils/stateReducer';
import _ from 'lodash';
import { initialState } from '@utils/validateState';

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loadState, saveState } = useStorage();

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const saved = await loadState();
        if (saved) {
          dispatch({ type: 'SET_STATE', payload: saved });
        }
      } catch (error) {
        console.error('Failed to load initial state:', error);
        setError('Failed to load saved data. Starting with empty state.');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [loadState]);

  useEffect(() => {
    const debouncedSave = _.debounce(async () => {
      try {
        await saveState(state);
      } catch (error) {
        console.error('Failed to save state:', error);
        setError('Failed to save changes.');
      }
    }, 1000);

    if (!isLoading) {
      debouncedSave();
    }

    return () => {
      debouncedSave.cancel();
    };
  }, [saveState, state, isLoading]);

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const contextValue: StateContextType = {
    state,
    dispatch,
    isLoading,
    error,
    resetState,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {children}
    </StateContext.Provider>
  );
}
