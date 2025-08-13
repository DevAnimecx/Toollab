import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { minify } from 'html-minifier-terser';
import { showSuccess } from '@/utils/toast';

const HtmlMinifierPage = () => {
  const tool = tools.find((t) => t.path === '/tools/html-minifier')!;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [savings, setSavings] = useState(0);

  const handleMinify = async () => {
    if (!input) return;
    const result = await minify(input, {
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });
    setOutput(result);
    const savingsPercent = 100 - (result.length / input.length) * 100;
    setSavings(savingsPercent);
    showSuccess('HTML minified!');
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Input HTML</h3>
            <CopyButton textToCopy={input} />
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML code here"
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Minified Output</h3>
            <CopyButton textToCopy={output} />
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Minified HTML will appear here"
            className="min-h-[300px] font-mono text-sm bg-muted/50"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6">
        <Button onClick={handleMinify} size="lg" disabled={!input}>Minify HTML</Button>
        {savings > 0 && (
          <p className="text-green-500 font-semibold">
            Saved {savings.toFixed(2)}%
          </p>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default HtmlMinifierPage;