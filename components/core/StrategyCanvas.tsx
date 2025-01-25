import React, { useState, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { useGlobalState } from '@contexts/state/StateContext';
import { Trash2, Plus, MoveUp, MoveDown } from 'lucide-react';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Factor {
  id: string;
  name: string;
  marketScore: number;
  ideaScore: number;
}

interface NewFactor {
  name: string;
  marketScore: number;
  ideaScore: number;
}

interface ChartDataPoint {
  name: string;
  Market: number;
  'Your Idea': number;
  tooltip: string;
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const StrategyCanvas: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [newFactor, setNewFactor] = useState<NewFactor>({
    name: '',
    marketScore: 5,
    ideaScore: 5,
  });
  const [error, setError] = useState<string>('');

  const validateFactor = (factor: NewFactor): boolean => {
    if (!factor.name.trim()) {
      setError('Factor name is required');
      return false;
    }
    if (factor.marketScore < 0 || factor.marketScore > 10) {
      setError('Market score must be between 0 and 10');
      return false;
    }
    if (factor.ideaScore < 0 || factor.ideaScore > 10) {
      setError('Idea score must be between 0 and 10');
      return false;
    }
    setError('');
    return true;
  };

  const addFactor = useCallback((): void => {
    if (!validateFactor(newFactor)) return;

    dispatch({
      type: 'ADD_FACTOR',
      payload: {
        id: `factor-${Date.now()}`,
        ...newFactor,
      },
    });
    setNewFactor({ name: '', marketScore: 5, ideaScore: 5 });
  }, [newFactor, dispatch]);

  const moveFactor = useCallback(
    (id: string, direction: 'up' | 'down'): void => {
      const factors = [...state.strategyCanvas.factors];
      const index = factors.findIndex((f) => f.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === factors.length - 1)
      )
        return;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [factors[index], factors[newIndex]] = [factors[newIndex], factors[index]];

      dispatch({
        type: 'SET_STATE',
        payload: {
          ...state,
          strategyCanvas: {
            ...state.strategyCanvas,
            factors,
          },
        },
      });
    },
    [state, dispatch]
  );

  const updateFactorField = useCallback(
    (id: string, field: keyof Factor, value: string | number): void => {
      dispatch({
        type: 'SET_STATE',
        payload: {
          ...state,
          strategyCanvas: {
            ...state.strategyCanvas,
            factors: state.strategyCanvas.factors.map((f) =>
              f.id === id
                ? {
                    ...f,
                    [field]: field === 'name' ? value : Number(value),
                  }
                : f
            ),
          },
        },
      });
    },
    [state, dispatch]
  );

  const updateNotes = useCallback(
    (id: string, notes: string): void => {
      dispatch({
        type: 'SET_STATE',
        payload: {
          ...state,
          strategyCanvas: {
            ...state.strategyCanvas,
            notes: {
              ...state.strategyCanvas.notes,
              [id]: notes,
            },
          },
        },
      });
    },
    [state, dispatch]
  );

  const deleteFactor = useCallback(
    (id: string): void => {
      dispatch({
        type: 'SET_STATE',
        payload: {
          ...state,
          strategyCanvas: {
            ...state.strategyCanvas,
            factors: state.strategyCanvas.factors.filter((f) => f.id !== id),
          },
        },
      });
    },
    [state, dispatch]
  );

  const chartData: ChartDataPoint[] = state.strategyCanvas.factors.map((f) => ({
    name: f.name,
    Market: f.marketScore,
    'Your Idea': f.ideaScore,
    tooltip: `${f.name}\nMarket: ${f.marketScore}\nYour Idea: ${f.ideaScore}`,
  }));

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-background border rounded p-2 shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Strategy Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                className="[&_.recharts-cartesian-grid-horizontal]:stroke-muted [&_.recharts-cartesian-grid-vertical]:stroke-muted [&_.recharts-cartesian-axis-line]:stroke-muted [&_.recharts-cartesian-axis-tick-line]:stroke-muted [&_.recharts-cartesian-axis-tick-value]:fill-foreground"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  padding={{ left: 50, right: 50 }}
                  height={60}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis
                  domain={[0, 10]}
                  stroke="currentColor"
                  ticks={[0, 2, 4, 6, 8, 10]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Market"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Your Idea"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="Factor name"
                value={newFactor.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewFactor({ ...newFactor, name: e.target.value })
                }
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Market score (0-10)"
                value={newFactor.marketScore}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewFactor({
                    ...newFactor,
                    marketScore: Number(e.target.value),
                  })
                }
                min={0}
                max={10}
                className="w-32"
              />
              <Input
                type="number"
                placeholder="Your score (0-10)"
                value={newFactor.ideaScore}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewFactor({
                    ...newFactor,
                    ideaScore: Number(e.target.value),
                  })
                }
                min={0}
                max={10}
                className="w-32"
              />
              <Button onClick={addFactor}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          <div className="space-y-2 mt-4">
            {state.strategyCanvas.factors.map((factor, index) => (
              <div key={factor.id} className="p-4 border rounded-lg bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFactor(factor.id, 'up')}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFactor(factor.id, 'down')}
                      disabled={
                        index === state.strategyCanvas.factors.length - 1
                      }
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={factor.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateFactorField(factor.id, 'name', e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={factor.marketScore}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateFactorField(
                        factor.id,
                        'marketScore',
                        e.target.value
                      )
                    }
                    min={0}
                    max={10}
                    className="w-32"
                  />
                  <Input
                    type="number"
                    value={factor.ideaScore}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateFactorField(factor.id, 'ideaScore', e.target.value)
                    }
                    min={0}
                    max={10}
                    className="w-32"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => deleteFactor(factor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Notes about this factor..."
                  value={state.strategyCanvas.notes[factor.id] || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateNotes(factor.id, e.target.value)
                  }
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyCanvas;
