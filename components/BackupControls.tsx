import { useState } from 'react';
import { Loader2, Copy, Check, RotateCcw } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Alert, AlertDescription } from '@components/ui/alert';
import { useStorage } from '@utils/useStorage';
import { useGlobalState } from '@contexts/state/StateContext';

export function LoadingSpinner() {
  return <Loader2 className="h-4 w-4 animate-spin" />;
}

export default function BackupControls() {
  const [key, setKey] = useState('');
  const [backupKey, setBackupKey] = useState('');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch, resetState } = useGlobalState();
  const { backupState, restoreState } = useStorage();

  const handleBackup = async () => {
    setIsBackingUp(true);
    setError(null);
    try {
      const result = await backupState(state);
      if (result?.key) {
        setBackupKey(result.key);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to backup data. Please try again.');
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = async () => {
    if (!key) {
      setError('Please enter a key');
      return;
    }
    setIsRestoring(true);
    setError(null);
    try {
      const restored = await restoreState(key);
      if (restored) {
        dispatch({ type: 'SET_STATE', payload: restored });
        setKey('');
      } else {
        setError('No data found for this key');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to restore data. Please check your key and try again.');
    } finally {
      setIsRestoring(false);
    }
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(backupKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      setError('Failed to copy key to clipboard');
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Backup Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button onClick={handleBackup} disabled={isBackingUp}>
            {isBackingUp ? <LoadingSpinner /> : 'Backup  data'}
          </Button>
          <Button onClick={resetState} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset data
          </Button>
          {backupKey && (
            <div className="flex-1 flex items-center rounded-md border bg-card text-card-foreground h-9 px-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-medium">Your backup key:</span>
                <code className="bg-muted px-1.5 rounded text-sm">
                  {backupKey}
                </code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyKey}
                disabled={copied}
                className="h-7 w-7"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Input
            placeholder="Enter backup key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isRestoring}
          />
          <Button onClick={handleRestore} disabled={isRestoring}>
            {isRestoring ? <LoadingSpinner /> : 'Restore data'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
