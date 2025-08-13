import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextStatisticsPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-statistics')!;
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text) return null;
    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const paragraphs = text.split(/\n+/).filter(Boolean);
    const readingTime = Math.ceil(words.length / 200); // Avg reading speed

    return {
      characters: text.length,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime: `${readingTime} min read`,
    };
  }, [text]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here for analysis..."
          className="min-h-[300px]"
        />
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-sm capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">Enter text to see statistics.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
};

export default TextStatisticsPage;