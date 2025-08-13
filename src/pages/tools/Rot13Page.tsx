import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';

const Rot13Page = () => {
  const tool = tools.find((t) => t.path === '/tools/rot13-encoder')!;
  const [text, setText] = useState('Why did the chicken cross the road?');

  const rot13Text = useMemo(() => {
    return text.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      const base = code < 97 ? 65 : 97;
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });
  }, [text]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Input text"
          className="min-h-[250px]"
        />
        <Textarea
          value={rot13Text}
          readOnly
          placeholder="ROT13 Output"
          className="min-h-[250px] bg-muted/50"
        />
      </div>
      <p className="text-center text-muted-foreground mt-4">ROT13 is its own inverse; apply it twice to get the original text back.</p>
    </ToolPageLayout>
  );
};

export default Rot13Page;