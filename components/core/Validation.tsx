import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import { Textarea } from '@components/ui/textarea';
import { useGlobalState } from '@contexts/state/StateContext';

const nonCustomerTiers = [
  {
    id: 'soon',
    label: 'Soon-to-be non-customers who are on the edge of your market',
  },
  {
    id: 'refusing',
    label: 'Refusing non-customers who consciously choose against your market',
  },
  {
    id: 'unexplored',
    label: 'Unexplored non-customers who are in markets distant from yours',
  },
];

const sequenceSteps = [
  {
    id: 'utility',
    label: 'Does your offering deliver exceptional utility to buyers?',
  },
  { id: 'price', label: 'Is your price accessible to the mass of buyers?' },
  {
    id: 'cost',
    label: 'Can you attain your cost target to profit at your strategic price?',
  },
  {
    id: 'adoption',
    label: 'Are there adoption hurdles in actualizing your idea?',
  },
];

const Validation = () => {
  const { state, dispatch } = useGlobalState();

  const toggleNonCustomer = (key: string) => {
    dispatch({
      type: 'TOGGLE_NON_CUSTOMER',
      payload: { key },
    });
  };

  const toggleSequence = (key: string) => {
    dispatch({
      type: 'TOGGLE_SEQUENCE',
      payload: { key },
    });
  };

  const updateNotes = (notes: string) => {
    dispatch({
      type: 'UPDATE_VALIDATION_NOTES',
      payload: notes,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Non-Customer Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nonCustomerTiers.map((tier) => (
              <div key={tier.id} className="flex items-start space-x-2">
                <Checkbox
                  id={tier.id}
                  checked={state.validation.nonCustomers[tier.id] || false}
                  onCheckedChange={() => toggleNonCustomer(tier.id)}
                />
                <label
                  htmlFor={tier.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tier.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sequenceSteps.map((step) => (
              <div key={step.id} className="flex items-start space-x-2">
                <Checkbox
                  id={step.id}
                  checked={state.validation.sequence[step.id] || false}
                  onCheckedChange={() => toggleSequence(step.id)}
                />
                <label
                  htmlFor={step.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {step.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add validation notes..."
            value={state.validation.notes}
            onChange={(e) => updateNotes(e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Validation;
