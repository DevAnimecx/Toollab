import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { Trash2 } from 'lucide-react';

const DuplicateLineRemoverPage = () => {
  const tool = tools.find((t) => t.path === '/tools/duplicate-line-remover')!;
  const [text, setText] = useState('');
  const [linesRemoved, setLinesRemoved] = useState(0);

  const handleRemoveDuplicates = () => {
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    setText(uniqueLines.join('\n'));
    setLinesRemoved(lines.length - uniqueLines.length);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text with duplicate lines here..."
            className="min-h-[250px] text-base p-4 pr-24"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <CopyButton textToCopy={text} />
            <Button variant="outline" size="icon" onClick={() => { setText(''); setLinesRemoved(0); }} disabled={!text}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={handleRemoveDuplicates} disabled={!text} size="lg">Remove Duplicates</Button>
          {linesRemoved > 0 && (
            <p className="text-sm text-green-500">{linesRemoved} duplicate line(s) removed.</p>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default DuplicateLineRemoverPage;