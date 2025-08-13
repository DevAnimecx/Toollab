import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdvancedWordCounterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/advanced-word-counter')!;
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text) return null;
    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '');
    const readingTime = Math.ceil(words.length / 200);

    return {
      Characters: text.length,
      Words: words.length,
      Sentences: sentences.length,
      Paragraphs: paragraphs.length,
      'Reading Time': `${readingTime} min`,
    };
  }, [text]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here for a live analysis..."
          className="min-h-[400px] text-base"
        />
        <Card>
          <CardHeader>
            <CardTitle>Live Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-3xl font-bold">{value}</p>
                    <p className="text-sm capitalize text-muted-foreground">{key}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center h-full flex items-center justify-center">
                Start typing to see the stats.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
};

export default AdvancedWordCounterPage;