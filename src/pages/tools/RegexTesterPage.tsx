import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const RegexTesterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/regex-tester')!;
  const [pattern, setPattern] = useState('\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b');
  const [testString, setTestString] = useState('Contact us at support@example.com or sales@example.org.');
  const [flags, setFlags] = useState({ g: true, i: true, m: false });

  const highlightedResult = useMemo(() => {
    try {
      const flagString = Object.keys(flags).filter(f => flags[f as keyof typeof flags]).join('');
      const regex = new RegExp(pattern, flagString);
      
      if (!pattern) return testString;

      return testString.replace(regex, (match) => `<mark>${match}</mark>`);
    } catch (e) {
      return `<span class="text-red-500">Invalid Regex: ${(e as Error).message}</span>`;
    }
  }, [pattern, testString, flags]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium">Regular Expression</label>
          <div className="flex items-center gap-4">
            <span className="font-mono text-muted-foreground">/</span>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your pattern"
              className="font-mono flex-1"
            />
            <span className="font-mono text-muted-foreground">/</span>
            <div className="flex items-center gap-4">
              {Object.keys(flags).map(flag => (
                <div key={flag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`flag-${flag}`}
                    checked={flags[flag as keyof typeof flags]}
                    onCheckedChange={(checked) => setFlags(prev => ({ ...prev, [flag]: checked }))}
                  />
                  <label htmlFor={`flag-${flag}`} className="font-mono text-sm font-medium">
                    {flag}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Test String</label>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter the string to test against"
            className="min-h-[200px] font-mono"
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Result</h3>
          <div
            className="p-4 border rounded-md min-h-[150px] bg-card whitespace-pre-wrap font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedResult.replace(/<mark>/g, '<mark class="bg-primary/30">') }}
          />
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default RegexTesterPage;