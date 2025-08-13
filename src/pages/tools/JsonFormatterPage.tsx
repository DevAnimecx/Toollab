import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { GlassTextarea } from '@/components/ui/GlassInput';
import { GlassButton } from '@/components/ui/GlassButton';
import CopyButton from '@/components/tool/CopyButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { showError, showSuccess } from '@/utils/toast';

const JsonFormatterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/json-formatter')!;
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleFormat = () => {
    if (!input.trim()) {
      setFormatted('');
      setIsValid(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
      setIsValid(true);
      showSuccess('JSON is valid and has been formatted!');
    } catch (error) {
      setFormatted((error as Error).message);
      setIsValid(false);
      showError('Invalid JSON!');
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Input JSON</h3>
          <GlassTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here"
            className="min-h-[300px] font-mono text-sm"
            accentColor={tool.accentColor}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Formatted Output</h3>
            {isValid !== null && (
              <span className={`text-sm font-bold ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                {isValid ? 'Valid JSON' : 'Invalid JSON'}
              </span>
            )}
          </div>
          <div className="relative bg-secondary/50 p-4 rounded-md border border-white/10 min-h-[300px]">
            {formatted ? (
              <>
                {isValid ? (
                  <SyntaxHighlighter language="json" style={atomDark} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
                    {formatted}
                  </SyntaxHighlighter>
                ) : (
                  <pre className="text-red-400 whitespace-pre-wrap font-mono text-sm">{formatted}</pre>
                )}
                <CopyButton textToCopy={isValid ? formatted : ''} className="absolute top-3 right-3" />
              </>
            ) : (
              <p className="text-muted-foreground">Output will appear here...</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <GlassButton onClick={handleFormat} size="lg" accentColor={tool.accentColor}>Format JSON</GlassButton>
      </div>
    </ToolPageLayout>
  );
};

export default JsonFormatterPage;