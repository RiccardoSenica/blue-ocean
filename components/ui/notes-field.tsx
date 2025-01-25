import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';

export function NotesField({
  value,
  onChange,
  label = 'Notes',
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}
