import { useState, useCallback } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CopyButton from '@/components/tool/CopyButton';

const TextScramblerPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-scrambler')!;
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog.');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'word' | 'letter'>('letter');
  const [preservePunctuation, setPreservePunctuation] = useState(true);

  const scramble = useCallback(() => {
    let result = '';
    if (mode === 'letter') {
      result = input.split('').sort(() => 0.5 - Math.random()).join('');
    } else {
      const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
      const words = input.split(' ');
      const shuffledWords = words.sort(() => 0.5 - Math.random());
      if (preservePunctuation) {
        result = shuffledWords.map((word, index) => {
          const originalPunctuation = words[index].match(punctuationRegex) || [];
          return word.replace(punctuationRegex, '') + originalPunctuation.join('');
        }).join(' ');
      } else {
        result = shuffledWords.join(' ');
      }
    }
    setOutput(result);
  }, [input, mode, preservePunctuation]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to scramble"
            className="min-h-[200px] bg-secondary/40 border-white/10"
          />
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              placeholder="Scrambled output"
              className="min-h-[200px] bg-muted/50"
            />
            <CopyButton textToCopy={output} className="absolute top-3 right-3" />
          </div>
          <Button onClick={scramble} size="lg" disabled={!input}>Scramble Text</Button>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Scramble Mode">
              <Select value={mode} onValueChange={(v) => setMode(v as 'word' | 'letter')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="letter">Letters</SelectItem>
                  <SelectItem value="word">Words</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>
            <SettingsRow label="Preserve Punctuation">
              <Switch checked={preservePunctuation} onCheckedChange={setPreservePunctuation} disabled={mode === 'letter'} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextScramblerPage;