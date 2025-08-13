import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const CaesarCipherPage = () => {
  const tool = tools.find((t) => t.path === '/tools/caesar-cipher')!;
  const [text, setText] = useState('Hello World');
  const [shift, setShift] = useState(3);
  const [isEncoding, setIsEncoding] = useState(true);

  const processedText = useMemo(() => {
    const s = isEncoding ? shift : 26 - shift;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) { // Uppercase
        return String.fromCharCode(((code - 65 + s) % 26) + 65);
      }
      if (code >= 97 && code <= 122) { // Lowercase
        return String.fromCharCode(((code - 97 + s) % 26) + 97);
      }
      return char;
    });
  }, [text, shift, isEncoding]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Input"
            className="min-h-[200px] bg-secondary/40 border-white/10"
          />
          <Textarea
            value={processedText}
            readOnly
            placeholder="Output"
            className="min-h-[200px] bg-muted/50"
          />
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Mode">
              <div className="flex items-center gap-2 text-sm">
                <span>Decode</span>
                <Switch checked={isEncoding} onCheckedChange={setIsEncoding} />
                <span>Encode</span>
              </div>
            </SettingsRow>
            <SettingsRow label="Shift Value">
              <span className="font-bold">{shift}</span>
            </SettingsRow>
            <Slider value={[shift]} onValueChange={(v) => setShift(v[0])} min={1} max={25} step={1} />
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default CaesarCipherPage;