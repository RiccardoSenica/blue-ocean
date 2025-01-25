import { GlobalState } from './types';

export const initialState: GlobalState = {
  strategyCanvas: {
    factors: [],
    notes: {},
  },
  fourActions: {
    eliminate: [],
    reduce: [],
    raise: [],
    create: [],
  },
  sixPaths: {
    industries: { notes: '', opportunities: [] },
    groups: { notes: '', opportunities: [] },
    buyers: { notes: '', opportunities: [] },
    complementary: { notes: '', opportunities: [] },
    functional: { notes: '', opportunities: [] },
    trends: { notes: '', opportunities: [] },
  },
  utilityMap: {},
  priceCorridor: {
    targetPrice: 0,
    competitors: [] as Array<{
      name: string;
      price: number;
      category: 'same-form' | 'different-form' | 'different-function';
    }>,
  },
  validation: {
    nonCustomers: {},
    sequence: {},
    notes: '',
  },
};

export function validateState(state: any): GlobalState {
  if (!state || typeof state !== 'object') {
    return initialState;
  }

  return {
    strategyCanvas: {
      factors: Array.isArray(state?.strategyCanvas?.factors)
        ? state.strategyCanvas.factors
        : [],
      notes: state?.strategyCanvas?.notes || {},
    },
    fourActions: {
      eliminate: Array.isArray(state?.fourActions?.eliminate)
        ? state.fourActions.eliminate
        : [],
      reduce: Array.isArray(state?.fourActions?.reduce)
        ? state.fourActions.reduce
        : [],
      raise: Array.isArray(state?.fourActions?.raise)
        ? state.fourActions.raise
        : [],
      create: Array.isArray(state?.fourActions?.create)
        ? state.fourActions.create
        : [],
    },
    sixPaths: {
      industries: validatePathSection(state?.sixPaths?.industries),
      groups: validatePathSection(state?.sixPaths?.groups),
      buyers: validatePathSection(state?.sixPaths?.buyers),
      complementary: validatePathSection(state?.sixPaths?.complementary),
      functional: validatePathSection(state?.sixPaths?.functional),
      trends: validatePathSection(state?.sixPaths?.trends),
    },
    utilityMap: state?.utilityMap || {},
    priceCorridor: {
      targetPrice: Number(state?.priceCorridor?.targetPrice) || 0,
      competitors: Array.isArray(state?.priceCorridor?.competitors)
        ? state.priceCorridor.competitors.map(
            (comp: { name?: string; price?: number; category?: string }) => ({
              name: comp.name || '',
              price: Number(comp.price) || 0,
              category: [
                'same-form',
                'different-form',
                'different-function',
              ].includes(comp.category || '')
                ? (comp.category as
                    | 'same-form'
                    | 'different-form'
                    | 'different-function')
                : 'same-form',
            })
          )
        : [],
    },
    validation: {
      nonCustomers: state?.validation?.nonCustomers || {},
      sequence: state?.validation?.sequence || {},
      notes: state?.validation?.notes || '',
    },
  };
}

function validatePathSection(section: any) {
  return {
    notes: typeof section?.notes === 'string' ? section.notes : '',
    opportunities: Array.isArray(section?.opportunities)
      ? section.opportunities
      : [],
  };
}
