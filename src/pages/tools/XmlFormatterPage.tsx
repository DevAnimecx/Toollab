import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { html as html_beautify } from 'js-beautify';
import { XMLParser } from 'fast-xml-parser';
import { showError, showSuccess } from '@/utils/toast';

const XmlFormatterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/xml-formatter')!;
  const [input, setInput] = useState('<root><item>Hello</item></root>');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    const parser = new XMLParser();
    const isValid = parser.parse(input);
    if (isValid === false) {
      showError('Invalid XML structure.');
      setOutput('Invalid XML.');
      return;
    }
    const formatted = html_beautify(input, { indent_size: 2 });
    setOutput(formatted);
    showSuccess('XML formatted successfully!');
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your XML here"
          className="min-h-[300px] font-mono"
        />
        <div className="relative">
          <Textarea
            value={output}
            readOnly
            placeholder="Formatted XML will appear here"
            className="min-h-[300px] font-mono bg-muted/50"
          />
          <CopyButton textToCopy={output} className="absolute top-3 right-3" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button onClick={handleFormat} size="lg">Format & Validate XML</Button>
      </div>
    </ToolPageLayout>
  );
};

export default XmlFormatterPage;