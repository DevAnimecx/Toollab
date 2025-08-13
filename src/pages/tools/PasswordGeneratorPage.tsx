import { useState, useEffect, useCallback } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import CopyButton from '@/components/tool/CopyButton';
import { RefreshCw } from 'lucide-react';

const PasswordGeneratorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/password-generator')!;
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });

  const generatePassword = useCallback(() => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };
    
    const similarChars = /[ilI1oO0]/g;

    let charset = '';
    if (options.uppercase) charset += chars.uppercase;
    if (options.lowercase) charset += chars.lowercase;
    if (options.numbers) charset += chars.numbers;
    if (options.symbols) charset += chars.symbols;

    if (options.excludeSimilar) {
      charset = charset.replace(similarChars, '');
    }

    if (!charset) {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [length, options, generatePassword]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <Input type="text" value={password} readOnly className="text-2xl h-14 font-mono pr-24 bg-secondary/40 border-white/10" />
          <div className="absolute top-1/2 -translate-y-1/2 right-3 flex gap-2">
            <Button variant="outline" size="icon" onClick={generatePassword}><RefreshCw className="h-4 w-4" /></Button>
            <CopyButton textToCopy={password} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label>Password Length</label>
            <span className="font-bold text-lg">{length}</span>
          </div>
          <Slider value={[length]} onValueChange={(v) => setLength(v[0])} min={6} max={64} step={1} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(options).map(key => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={options[key as keyof typeof options]}
                onCheckedChange={(checked) => setOptions(prev => ({ ...prev, [key]: !!checked }))}
              />
              <label htmlFor={key} className="capitalize text-sm font-medium leading-none">
                {key === 'excludeSimilar' ? 'Exclude Similar' : `Include ${key}`}
              </label>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PasswordGeneratorPage;