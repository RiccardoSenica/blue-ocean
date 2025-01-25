import { GlobalState, PathType } from './types';
import { Action } from '@contexts/state/StateContext';
import { initialState } from './validateState';

export function stateReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'RESET_STATE':
      return initialState;
    case 'ADD_FACTOR':
      return {
        ...state,
        strategyCanvas: {
          ...state.strategyCanvas,
          factors: [...state.strategyCanvas.factors, action.payload],
        },
      };
    case 'ADD_ACTION': {
      const { actionType, value } = action.payload;
      return {
        ...state,
        fourActions: {
          ...state.fourActions,
          [actionType]: [...state.fourActions[actionType], value],
        },
      };
    }
    case 'ADD_OPPORTUNITY': {
      const { pathType, value: oppValue } = action.payload;
      return {
        ...state,
        sixPaths: {
          ...state.sixPaths,
          [pathType]: {
            ...state.sixPaths[pathType],
            opportunities: [
              ...state.sixPaths[pathType].opportunities,
              oppValue,
            ],
          },
        },
      };
    }
    case 'UPDATE_PATH_NOTES': {
      const { pathType, notes } = action.payload as {
        pathType: PathType;
        notes: string;
      };
      return {
        ...state,
        sixPaths: {
          ...state.sixPaths,
          [pathType]: {
            ...state.sixPaths[pathType],
            notes,
          },
        },
      };
    }
    case 'TOGGLE_UTILITY': {
      const { key } = action.payload;
      const currentValue = state.utilityMap[key]?.value ?? false;
      return {
        ...state,
        utilityMap: {
          ...state.utilityMap,
          [key]: {
            ...state.utilityMap[key],
            value: !currentValue,
          },
        },
      };
    }
    case 'UPDATE_UTILITY_NOTES':
      return {
        ...state,
        utilityMap: {
          ...state.utilityMap,
          [action.payload.key]: {
            ...state.utilityMap[action.payload.key],
            notes: action.payload.notes,
          },
        },
      };
    case 'UPDATE_TARGET_PRICE':
      return {
        ...state,
        priceCorridor: {
          ...state.priceCorridor,
          targetPrice: action.payload,
        },
      };
    case 'ADD_COMPETITOR':
      return {
        ...state,
        priceCorridor: {
          ...state.priceCorridor,
          competitors: [...state.priceCorridor.competitors, action.payload],
        },
      };
    case 'UPDATE_COMPETITOR': {
      const { index, field, value: compValue } = action.payload;
      return {
        ...state,
        priceCorridor: {
          ...state.priceCorridor,
          competitors: state.priceCorridor.competitors.map((comp, i) =>
            i === index ? { ...comp, [field]: compValue } : comp
          ),
        },
      };
    }
    case 'TOGGLE_NON_CUSTOMER':
      return {
        ...state,
        validation: {
          ...state.validation,
          nonCustomers: {
            ...state.validation.nonCustomers,
            [action.payload.key]:
              !state.validation.nonCustomers[action.payload.key],
          },
        },
      };
    case 'TOGGLE_SEQUENCE':
      return {
        ...state,
        validation: {
          ...state.validation,
          sequence: {
            ...state.validation.sequence,
            [action.payload.key]:
              !state.validation.sequence[action.payload.key],
          },
        },
      };
    case 'UPDATE_VALIDATION_NOTES':
      return {
        ...state,
        validation: {
          ...state.validation,
          notes: action.payload,
        },
      };
    default:
      return state;
  }
}
