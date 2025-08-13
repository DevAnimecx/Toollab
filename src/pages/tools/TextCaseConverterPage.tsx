import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { Trash2 } from 'lucide-react';

const TextCaseConverterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-case-converter')!;
  const [text, setText] = useState('');

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="min-h-[250px] text-base p-4 pr-24 bg-secondary/40 border-white/10"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <CopyButton textToCopy={text} />
            <Button variant="outline" size="icon" onClick={() => setText('')} disabled={!text}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => setText(text.toUpperCase())} disabled={!text}>UPPERCASE</Button>
          <Button onClick={() => setText(text.toLowerCase())} disabled={!text}>lowercase</Button>
          <Button onClick={() => setText(toTitleCase(text))} disabled={!text}>Title Case</Button>
          <Button onClick={() => setText(toSentenceCase(text))} disabled={!text}>Sentence case</Button>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextCaseConverterPage;