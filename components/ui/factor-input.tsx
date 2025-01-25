import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Slider } from '@components/ui/slider';

export function FactorInput({
  name,
  marketScore,
  ideaScore,
  onNameChange,
  onMarketChange,
  onIdeaChange,
}: {
  name: string;
  marketScore: number;
  ideaScore: number;
  onNameChange: (value: string) => void;
  onMarketChange: (value: number) => void;
  onIdeaChange: (value: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Factor Name</Label>
        <Input value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        <Label>Market Score</Label>
        <Slider
          value={[marketScore]}
          min={0}
          max={10}
          step={1}
          onValueChange={([value]) => onMarketChange(value)}
        />
      </div>
      <div>
        <Label>Idea Score</Label>
        <Slider
          value={[ideaScore]}
          min={0}
          max={10}
          step={1}
          onValueChange={([value]) => onIdeaChange(value)}
        />
      </div>
    </div>
  );
}
