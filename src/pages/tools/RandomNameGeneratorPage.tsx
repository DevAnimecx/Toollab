import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie'];
const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Davis'];

const RandomNameGeneratorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/random-name-generator')!;
  const [names, setNames] = useState<string[]>([]);
  const [count, setCount] = useState(10);

  const generateNames = () => {
    const newNames = Array.from({ length: count }, () => {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      return `${first} ${last}`;
    });
    setNames(newNames);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Button onClick={generateNames}>Generate Names</Button>
          <ScrollArea className="h-72 w-full rounded-md border p-4">
            {names.length > 0 ? (
              names.map((name, i) => <div key={i} className="py-1">{name}</div>)
            ) : (
              <p className="text-muted-foreground">Click "Generate Names" to start.</p>
            )}
          </ScrollArea>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Number of names">
              <Input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default RandomNameGeneratorPage;