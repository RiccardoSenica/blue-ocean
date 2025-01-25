import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useGlobalState } from '@contexts/state/StateContext';
import { Trash2, Plus } from 'lucide-react';

const FourActions = () => {
  const { state, dispatch } = useGlobalState();
  const [newItems, setNewItems] = useState({
    eliminate: '',
    reduce: '',
    raise: '',
    create: '',
  });

  const addItem = (actionType: keyof typeof newItems) => {
    if (!newItems[actionType]) return;

    dispatch({
      type: 'ADD_ACTION',
      payload: {
        actionType,
        value: newItems[actionType],
      },
    });
    setNewItems((prev) => ({ ...prev, [actionType]: '' }));
  };

  const removeItem = (
    actionType: keyof typeof state.fourActions,
    index: number
  ) => {
    dispatch({
      type: 'SET_STATE',
      payload: {
        ...state,
        fourActions: {
          ...state.fourActions,
          [actionType]: state.fourActions[actionType].filter(
            (_, i) => i !== index
          ),
        },
      },
    });
  };

  const renderActionSection = (
    title: string,
    actionType: keyof typeof state.fourActions,
    description: string,
    colorClasses: string
  ) => (
    <Card className={`${colorClasses} border-2`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder={`Add ${title.toLowerCase()} factor...`}
            value={newItems[actionType]}
            onChange={(e) =>
              setNewItems((prev) => ({ ...prev, [actionType]: e.target.value }))
            }
            className="flex-1"
          />
          <Button onClick={() => addItem(actionType)} variant="secondary">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {state.fourActions[actionType].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-background rounded-lg border"
            >
              <span className="flex-1">{item}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(actionType, index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {renderActionSection(
        'Eliminate',
        'eliminate',
        'Which factors should be eliminated?',
        'border-red-500/50 dark:border-red-500/30 bg-red-50/50 dark:bg-red-950/10'
      )}
      {renderActionSection(
        'Reduce',
        'reduce',
        'Which factors should be reduced well below the industry standard?',
        'border-yellow-500/50 dark:border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/10'
      )}
      {renderActionSection(
        'Raise',
        'raise',
        'Which factors should be raised well above the industry standard?',
        'border-green-500/50 dark:border-green-500/30 bg-green-50/50 dark:bg-green-950/10'
      )}
      {renderActionSection(
        'Create',
        'create',
        'Which factors should be created that the industry has never offered?',
        'border-blue-500/50 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/10'
      )}
    </div>
  );
};

export default FourActions;
