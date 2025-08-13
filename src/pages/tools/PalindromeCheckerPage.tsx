import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

const PalindromeCheckerPage = () => {
  const tool = tools.find((t) => t.path === '/tools/palindrome-checker')!;
  const [text, setText] = useState('A man, a plan, a canal: Panama');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [ignoreSpecialChars, setIgnoreSpecialChars] = useState(true);
  const [result, setResult] = useState<boolean | null>(null);

  const processedText = useMemo(() => {
    let processed = text;
    if (!isCaseSensitive) {
      processed = processed.toLowerCase();
    }
    if (ignoreSpecialChars) {
      processed = processed.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '');
    }
    return processed;
  }, [text, isCaseSensitive, ignoreSpecialChars]);

  const checkPalindrome = () => {
    const reversed = processedText.split('').reverse().join('');
    setResult(processedText === reversed);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to check"
            className="h-12 text-lg"
          />
          <Button onClick={checkPalindrome} disabled={!text}>Check Palindrome</Button>
          {result !== null && (
            <Card className={result ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}>
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                {result ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-red-500" />}
                <CardTitle>{result ? 'It\'s a Palindrome!' : 'Not a Palindrome.'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Original: <span className="font-mono">{text}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Reversed: <span className="font-mono">{processedText.split('').reverse().join('')}</span>
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Case Sensitive">
              <Switch checked={isCaseSensitive} onCheckedChange={setIsCaseSensitive} />
            </SettingsRow>
            <SettingsRow label="Ignore Spaces & Punctuation">
              <Switch checked={ignoreSpecialChars} onCheckedChange={setIgnoreSpecialChars} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PalindromeCheckerPage;