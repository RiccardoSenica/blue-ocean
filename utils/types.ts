export interface GlobalState {
  strategyCanvas: {
    factors: {
      id: string;
      name: string;
      marketScore: number;
      ideaScore: number;
    }[];
    notes: Record<string, string>;
  };
  fourActions: {
    eliminate: string[];
    reduce: string[];
    raise: string[];
    create: string[];
  };
  sixPaths: Record<
    PathType,
    {
      notes: string;
      opportunities: string[];
    }
  >;
  utilityMap: Record<
    string,
    {
      value: boolean;
      notes: string;
    }
  >;
  priceCorridor: {
    targetPrice: number;
    competitors: {
      name: string;
      price: number;
      category: 'same-form' | 'different-form' | 'different-function';
    }[];
  };
  validation: {
    nonCustomers: Record<string, boolean>;
    sequence: Record<string, boolean>;
    notes: string;
  };
}

export type PathType =
  | 'industries'
  | 'groups'
  | 'buyers'
  | 'complementary'
  | 'functional'
  | 'trends';
