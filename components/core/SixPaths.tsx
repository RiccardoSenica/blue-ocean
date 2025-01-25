import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { useGlobalState } from '@contexts/state/StateContext';
import { Trash2, Plus } from 'lucide-react';
import type { PathType } from '@utils/types';

const pathDefinitions = {
  industries: {
    title: 'Alternative Industries',
    description: 'Look across substitute and alternative industries',
  },
  groups: {
    title: 'Strategic Groups',
    description: 'Look across strategic groups within your industry',
  },
  buyers: {
    title: 'Buyer Groups',
    description: 'Look across chain of buyers',
  },
  complementary: {
    title: 'Complementary Products',
    description: 'Look across complementary product and service offerings',
  },
  functional: {
    title: 'Functional/Emotional Appeal',
    description: 'Look across functional or emotional appeal to buyers',
  },
  trends: {
    title: 'Time Trends',
    description: 'Look across time and market trends',
  },
};

const SixPaths = () => {
  const { state, dispatch } = useGlobalState();
  const [newOpportunities, setNewOpportunities] = useState<
    Record<PathType, string>
  >({
    industries: '',
    groups: '',
    buyers: '',
    complementary: '',
    functional: '',
    trends: '',
  });

  const addOpportunity = (pathType: PathType) => {
    if (!newOpportunities[pathType]) return;

    dispatch({
      type: 'ADD_OPPORTUNITY',
      payload: {
        pathType,
        value: newOpportunities[pathType],
      },
    });
    setNewOpportunities((prev) => ({ ...prev, [pathType]: '' }));
  };

  const removeOpportunity = (pathType: PathType, index: number) => {
    dispatch({
      type: 'SET_STATE',
      payload: {
        ...state,
        sixPaths: {
          ...state.sixPaths,
          [pathType]: {
            ...state.sixPaths[pathType],
            opportunities: state.sixPaths[pathType].opportunities.filter(
              (_, i) => i !== index
            ),
          },
        },
      },
    });
  };

  const updateNotes = (pathType: PathType, notes: string) => {
    dispatch({
      type: 'UPDATE_PATH_NOTES',
      payload: { pathType, notes },
    });
  };

  const renderPath = (pathType: PathType) => {
    const { title, description } = pathDefinitions[pathType];

    return (
      <Card key={pathType}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{description}</p>

          <Textarea
            placeholder="Add notes about this path..."
            value={state.sixPaths[pathType].notes}
            onChange={(e) => updateNotes(pathType, e.target.value)}
            className="mb-4"
          />

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add opportunity..."
              value={newOpportunities[pathType]}
              onChange={(e) =>
                setNewOpportunities((prev) => ({
                  ...prev,
                  [pathType]: e.target.value,
                }))
              }
              className="flex-1"
            />
            <Button onClick={() => addOpportunity(pathType)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {state.sixPaths[pathType].opportunities.map(
              (opportunity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-background rounded-lg"
                >
                  <span className="flex-1">{opportunity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOpportunity(pathType, index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {(Object.keys(pathDefinitions) as PathType[]).map((pathType) =>
        renderPath(pathType)
      )}
    </div>
  );
};

export default SixPaths;
