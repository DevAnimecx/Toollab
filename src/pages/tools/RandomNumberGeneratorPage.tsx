import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import CopyButton from '@/components/tool/CopyButton';

const RandomNumberGeneratorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/random-number-generator')!;
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantity, setQuantity] = useState(10);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generateNumbers = () => {
    const newNumbers = Array.from({ length: quantity }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    setNumbers(newNumbers);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Button onClick={generateNumbers}>Generate Numbers</Button>
          <div className="relative">
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              <div className="grid grid-cols-5 gap-4">
                {numbers.map((num, i) => <div key={i} className="p-2 text-center">{num}</div>)}
              </div>
            </ScrollArea>
            <CopyButton textToCopy={numbers.join(', ')} className="absolute top-3 right-3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Min Value">
              <Input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-24" />
            </SettingsRow>
            <SettingsRow label="Max Value">
              <Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-24" />
            </SettingsRow>
            <SettingsRow label="Quantity">
              <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-24" />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default RandomNumberGeneratorPage;