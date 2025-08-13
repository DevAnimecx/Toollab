import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import CopyButton from '@/components/tool/CopyButton';

const TextRedactorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-redactor')!;
  const [text, setText] = useState('My email is test@example.com and my phone is 123-456-7890.');
  const [wordsToRedact, setWordsToRedact] = useState('test@example.com,123-456-7890');
  
  const redactedText = useMemo(() => {
    if (!wordsToRedact) return text;
    const words = wordsToRedact.split(',').map(w => w.trim()).filter(Boolean);
    const regex = new RegExp(words.join('|'), 'gi');
    return text.replace(regex, '██████');
  }, [text, wordsToRedact]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text to redact here..."
            className="min-h-[200px]"
          />
          <div className="relative">
            <Textarea
              value={redactedText}
              readOnly
              placeholder="Redacted text"
              className="min-h-[200px] bg-muted/50"
            />
            <CopyButton textToCopy={redactedText} className="absolute top-3 right-3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings title="Redaction Settings">
            <div className="space-y-2">
              <label className="text-sm font-medium">Words to Redact</label>
              <Textarea
                value={wordsToRedact}
                onChange={(e) => setWordsToRedact(e.target.value)}
                placeholder="Enter words, separated by commas"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple words or phrases with a comma.
              </p>
            </div>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextRedactorPage;