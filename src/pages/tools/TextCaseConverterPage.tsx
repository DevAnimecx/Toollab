import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { GlassTextarea } from '@/components/ui/GlassInput';
import { GlassButton } from '@/components/ui/GlassButton';
import CopyButton from '@/components/tool/CopyButton';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <GlassTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="min-h-[250px] text-base p-4 pr-24"
            accentColor={tool.accentColor}
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <CopyButton textToCopy={text} />
            <Button variant="outline" size="icon" onClick={() => setText('')} disabled={!text}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassButton onClick={() => setText(text.toUpperCase())} disabled={!text} accentColor={tool.accentColor}>UPPERCASE</GlassButton>
          <GlassButton onClick={() => setText(text.toLowerCase())} disabled={!text} accentColor={tool.accentColor}>lowercase</GlassButton>
          <GlassButton onClick={() => setText(toTitleCase(text))} disabled={!text} accentColor={tool.accentColor}>Title Case</GlassButton>
          <GlassButton onClick={() => setText(toSentenceCase(text))} disabled={!text} accentColor={tool.accentColor}>Sentence case</GlassButton>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextCaseConverterPage;