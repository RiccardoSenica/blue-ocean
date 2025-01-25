import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useGlobalState } from '@contexts/state/StateContext';
import { Trash2, Plus } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

const PriceCorridor = () => {
  const { state, dispatch } = useGlobalState();
  const [newCompetitor, setNewCompetitor] = useState<{
    name: string;
    price: number;
    category: 'same-form' | 'different-form' | 'different-function';
  }>({
    name: '',
    price: 0,
    category: 'same-form',
  });

  const setTargetPrice = (price: number) => {
    dispatch({
      type: 'UPDATE_TARGET_PRICE',
      payload: price,
    });
  };

  const addCompetitor = () => {
    if (!newCompetitor.name || !newCompetitor.price) return;
    dispatch({
      type: 'ADD_COMPETITOR',
      payload: {
        name: newCompetitor.name,
        price: newCompetitor.price,
        category: newCompetitor.category,
      },
    });
    setNewCompetitor({ name: '', price: 0, category: 'same-form' });
  };

  const removeCompetitor = (index: number) => {
    dispatch({
      type: 'SET_STATE',
      payload: {
        ...state,
        priceCorridor: {
          ...state.priceCorridor,
          competitors: state.priceCorridor.competitors.filter(
            (_, i) => i !== index
          ),
        },
      },
    });
  };

  const sortedCompetitors = [...state.priceCorridor.competitors].sort(
    (a, b) => a.price - b.price
  );

  const prices = sortedCompetitors.map((c) => c.price);
  const upperBound = Math.max(...prices, 0);
  const lowerBound = Math.min(...prices, 0);
  const range = upperBound - lowerBound;

  const corridorLower = lowerBound + range * 0.3;
  const corridorUpper = lowerBound + range * 0.8;

  const chartData = sortedCompetitors.map((comp) => ({
    name: comp.name,
    price: comp.price,
    category: comp.category,
  }));

  const categorizedCompetitors = {
    'same-form': sortedCompetitors.filter((c) => c.category === 'same-form'),
    'different-form': sortedCompetitors.filter(
      (c) => c.category === 'different-form'
    ),
    'different-function': sortedCompetitors.filter(
      (c) => c.category === 'different-function'
    ),
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Price Corridor of the Mass</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%" maxHeight={400}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 110, left: 50, bottom: 20 }}
                className="[&_.recharts-cartesian-grid-horizontal]:stroke-muted [&_.recharts-cartesian-grid-vertical]:stroke-muted [&_.recharts-cartesian-axis-line]:stroke-muted [&_.recharts-cartesian-axis-tick-line]:stroke-muted [&_.recharts-cartesian-axis-tick-value]:fill-foreground"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                />
                {state.priceCorridor.targetPrice > 0 && (
                  <ReferenceLine
                    y={state.priceCorridor.targetPrice}
                    stroke="hsl(var(--destructive))"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Target Price',
                      position: 'insideRight',
                      fill: 'hsl(var(--destructive))',
                      offset: 100,
                    }}
                  />
                )}
                {chartData.length > 0 && (
                  <ReferenceArea
                    y1={corridorLower}
                    y2={corridorUpper}
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                    stroke="hsl(var(--primary))"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Price Corridor',
                      position: 'insideRight',
                      offset: 90,
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Strategic Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.length > 0 && (
                <div className="text-sm space-y-2">
                  <p>
                    Suggested price corridor: {corridorLower.toFixed(2)} -{' '}
                    {corridorUpper.toFixed(2)}
                  </p>
                  <p>This range typically captures 70-80% of target buyers</p>
                </div>
              )}
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={state.priceCorridor.targetPrice || ''}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  placeholder="Set target price..."
                  className="w-48"
                />
                <span className="text-sm text-muted-foreground">
                  Current target: {state.priceCorridor.targetPrice || 'Not set'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Alternative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Name"
                value={newCompetitor.name}
                onChange={(e) =>
                  setNewCompetitor((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Price"
                value={newCompetitor.price || ''}
                onChange={(e) =>
                  setNewCompetitor((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="w-32"
              />
              <Select
                value={
                  newCompetitor.category as
                    | 'same-form'
                    | 'different-form'
                    | 'different-function'
                }
                onValueChange={(
                  value: 'same-form' | 'different-form' | 'different-function'
                ) => setNewCompetitor((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same-form">Same Form</SelectItem>
                  <SelectItem value="different-form">Different Form</SelectItem>
                  <SelectItem value="different-function">
                    Different Function
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addCompetitor}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Alternatives Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(categorizedCompetitors).map(
              ([category, competitors]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold capitalize">
                    {category.replace('-', ' ')} Alternatives
                  </h3>
                  {competitors.length > 0 ? (
                    <div className="space-y-2">
                      {competitors.map((comp, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                        >
                          <span className="flex-1">{comp.name}</span>
                          <span className="w-32 text-right">{comp.price}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCompetitor(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No alternatives added
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceCorridor;
