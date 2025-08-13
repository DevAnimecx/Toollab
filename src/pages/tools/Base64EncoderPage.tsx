import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import { showError } from '@/utils/toast';

const Base64EncoderPage = () => {
  const tool = tools.find((t) => t.path === '/tools/base64-encoder-decoder')!;
  const [plain, setPlain] = useState('');
  const [encoded, setEncoded] = useState('');

  const handlePlainChange = (value: string) => {
    setPlain(value);
    try {
      setEncoded(btoa(value));
    } catch (e) {
      setEncoded('');
    }
  };

  const handleEncodedChange = (value: string) => {
    setEncoded(value);
    try {
      setPlain(atob(value));
    } catch (e) {
      setPlain('');
      if (value) showError('Invalid Base64 string');
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        <div className="w-full space-y-2">
          <h3 className="font-semibold">Plain Text</h3>
          <Textarea
            value={plain}
            onChange={(e) => handlePlainChange(e.target.value)}
            placeholder="Type text to encode..."
            className="min-h-[250px] text-base bg-secondary/40 border-white/10"
          />
        </div>
        <div className="flex-shrink-0 self-center">
          <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="w-full space-y-2">
          <h3 className="font-semibold">Base64 Encoded</h3>
          <Textarea
            value={encoded}
            onChange={(e) => handleEncodedChange(e.target.value)}
            placeholder="Paste Base64 to decode..."
            className="min-h-[250px] text-base font-mono bg-secondary/40 border-white/10"
          />
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default Base64EncoderPage;