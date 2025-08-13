import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import CopyButton from '@/components/tool/CopyButton';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const languages = ['javascript', 'python', 'html', 'css', 'json', 'markdown', 'typescript', 'tsx'];

const CodeSyntaxHighlighterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/code-syntax-highlighter')!;
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('dark');

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here"
            className="min-h-[300px] font-mono bg-secondary/40 border-white/10"
          />
          <div className="relative bg-card p-4 rounded-md border min-h-[300px]">
            <SyntaxHighlighter language={language} style={theme === 'dark' ? atomDark : coy} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
              {code}
            </SyntaxHighlighter>
            <CopyButton textToCopy={code} className="absolute top-3 right-3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Language">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                </SelectContent>
              </Select>
            </SettingsRow>
            <SettingsRow label="Theme">
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default CodeSyntaxHighlighterPage;