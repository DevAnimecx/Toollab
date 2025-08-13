import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import CopyButton from '@/components/tool/CopyButton';

const TextMergePage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-merge')!;
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [output, setOutput] = useState('');
  const [separator, setSeparator] = useState('\\n');
  const [trimSpaces, setTrimSpaces] = useState(true);

  const handleMerge = () => {
    const sep = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    let a = trimSpaces ? textA.trim() : textA;
    let b = trimSpaces ? textB.trim() : textB;
    setOutput(a + sep + b);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="First text block"
              className="min-h-[200px] bg-secondary/40 border-white/10"
            />
            <Textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Second text block"
              className="min-h-[200px] bg-secondary/40 border-white/10"
            />
          </div>
          <Button onClick={handleMerge} disabled={!textA && !textB}>Merge Text</Button>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              placeholder="Merged output"
              className="min-h-[200px] bg-muted/50"
            />
            <CopyButton textToCopy={output} className="absolute top-3 right-3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Separator">
              <Input value={separator} onChange={(e) => setSeparator(e.target.value)} className="w-[120px]" placeholder="\n for new line" />
            </SettingsRow>
            <SettingsRow label="Trim extra spaces">
              <Switch checked={trimSpaces} onCheckedChange={setTrimSpaces} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextMergePage;