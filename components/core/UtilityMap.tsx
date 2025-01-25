import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Textarea } from '@components/ui/textarea';
import { Toggle } from '@components/ui/toggle';
import { useGlobalState } from '@contexts/state/StateContext';

const stages = [
  'Purchase',
  'Delivery',
  'Use',
  'Supplements',
  'Maintenance',
  'Disposal',
];
const utilities = [
  'Customer Productivity',
  'Simplicity',
  'Convenience',
  'Risk',
  'Environmental Friendliness',
  'Fun',
];

const UtilityMap = () => {
  const { state, dispatch } = useGlobalState();

  const toggleCell = (key: string) => {
    dispatch({
      type: 'TOGGLE_UTILITY',
      payload: { key },
    });
  };

  const updateNotes = (key: string, notes: string) => {
    dispatch({
      type: 'UPDATE_UTILITY_NOTES',
      payload: { key, notes },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buyer Utility Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border"></th>
                {stages.map((stage) => (
                  <th key={stage} className="p-2 border text-center">
                    {stage}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {utilities.map((utility) => (
                <tr key={utility}>
                  <td className="p-2 border font-medium">{utility}</td>
                  {stages.map((stage) => {
                    const key = `${utility}-${stage}`;
                    return (
                      <td key={stage} className="p-2 border">
                        <div className="flex flex-col gap-2">
                          <Toggle
                            pressed={state.utilityMap[key]?.value || false}
                            onPressedChange={() => toggleCell(key)}
                            className="w-full"
                          >
                            {state.utilityMap[key]?.value
                              ? 'Opportunity'
                              : 'No opportunity'}
                          </Toggle>
                          <Textarea
                            placeholder="Add notes..."
                            value={state.utilityMap[key]?.notes || ''}
                            onChange={(e) => updateNotes(key, e.target.value)}
                            className="h-24 text-sm"
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilityMap;
