'use client';

import React, { createContext, useContext } from 'react';
import type { GlobalState } from '../../utils/types';

export type Action =
  | { type: 'SET_STATE'; payload: GlobalState }
  | {
      type: 'ADD_FACTOR';
      payload: {
        id: string;
        name: string;
        marketScore: number;
        ideaScore: number;
      };
    }
  | {
      type: 'ADD_ACTION';
      payload: { actionType: keyof GlobalState['fourActions']; value: string };
    }
  | {
      type: 'ADD_OPPORTUNITY';
      payload: { pathType: keyof GlobalState['sixPaths']; value: string };
    }
  | { type: 'UPDATE_PATH_NOTES'; payload: { pathType: string; notes: string } }
  | { type: 'TOGGLE_UTILITY'; payload: { key: string } }
  | { type: 'UPDATE_UTILITY_NOTES'; payload: { key: string; notes: string } }
  | { type: 'UPDATE_TARGET_PRICE'; payload: number }
  | {
      type: 'ADD_COMPETITOR';
      payload: {
        name: string;
        price: number;
        category: 'same-form' | 'different-form' | 'different-function';
      };
    }
  | {
      type: 'UPDATE_COMPETITOR';
      payload: {
        index: number;
        field: 'name' | 'price' | 'category';
        value: string | number;
      };
    }
  | { type: 'TOGGLE_NON_CUSTOMER'; payload: { key: string } }
  | { type: 'TOGGLE_SEQUENCE'; payload: { key: string } }
  | { type: 'UPDATE_VALIDATION_NOTES'; payload: string }
  | { type: 'RESET_STATE' };

export interface StateContextType {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
  error: string | null;
  resetState: () => void;
}

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

export function useGlobalState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within StateProvider');
  }
  return context;
}
