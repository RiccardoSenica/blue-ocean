import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { X } from 'lucide-react';

export function EditableList({
  items,
  onAdd,
  onRemove,
  onUpdate,
}: {
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => onUpdate(index, e.target.value)}
          />
          <Button variant="ghost" size="icon" onClick={() => onRemove(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={onAdd}>Add</Button>
    </div>
  );
}
