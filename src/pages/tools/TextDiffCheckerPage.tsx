import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Switch } from '@/components/ui/switch';
import { diffChars } from 'diff';

const TextDiffCheckerPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-diff-checker')!;
  const [textA, setTextA] = useState('This is the original text.');
  const [textB, setTextB] = useState('This is the modified text.');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);

  const diffResult = useMemo(() => {
    return diffChars(textA, textB, { ignoreCase: !isCaseSensitive });
  }, [textA, textB, isCaseSensitive]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="Text A"
              className="min-h-[200px]"
            />
            <Textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Text B"
              className="min-h-[200px]"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Differences</h3>
            <div className="p-4 border rounded-md min-h-[150px] bg-card whitespace-pre-wrap">
              {diffResult.map((part, index) => {
                const color = part.added ? 'bg-green-500/20' : part.removed ? 'bg-red-500/20' : 'bg-transparent';
                return <span key={index} className={color}>{part.value}</span>;
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Case Sensitive">
              <Switch checked={isCaseSensitive} onCheckedChange={setIsCaseSensitive} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextDiffCheckerPage;