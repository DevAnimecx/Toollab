import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { js_beautify } from 'js-beautify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const JsBeautifierPage = () => {
  const tool = tools.find((t) => t.path === '/tools/js-beautifier')!;
  const [input, setInput] = useState('const foo={bar:1};function baz(){return foo.bar;}');
  const [indentSize, setIndentSize] = useState('2');

  const formattedCode = useMemo(() => {
    try {
      return js_beautify(input, { indent_size: parseInt(indentSize) });
    } catch {
      return 'Error: Invalid JavaScript code.';
    }
  }, [input, indentSize]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JavaScript code here"
            className="min-h-[300px] font-mono"
          />
          <div className="relative bg-card p-4 rounded-md border min-h-[300px]">
            <SyntaxHighlighter language="javascript" style={atomDark} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
              {formattedCode}
            </SyntaxHighlighter>
            <CopyButton textToCopy={formattedCode} className="absolute top-3 right-3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Indentation Size">
              <Select value={indentSize} onValueChange={setIndentSize}>
                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default JsBeautifierPage;