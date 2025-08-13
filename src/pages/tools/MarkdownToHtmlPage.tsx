import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import CopyButton from '@/components/tool/CopyButton';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownToHtmlPage = () => {
  const tool = tools.find((t) => t.path === '/tools/markdown-to-html')!;
  const [markdown, setMarkdown] = useState('# Hello, World!\n\nThis is **Markdown**.');

  const htmlOutput = useMemo(() => {
    try {
      return marked.parse(markdown) as string;
    } catch {
      return '<p>Error parsing Markdown.</p>';
    }
  }, [markdown]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Markdown Input</h3>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="min-h-[300px] font-mono bg-secondary/40 border-white/10"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">HTML Output</h3>
            <CopyButton textToCopy={htmlOutput} />
          </div>
          <div className="relative bg-card p-4 rounded-md border min-h-[300px]">
            <SyntaxHighlighter language="html" style={atomDark} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
              {htmlOutput}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default MarkdownToHtmlPage;