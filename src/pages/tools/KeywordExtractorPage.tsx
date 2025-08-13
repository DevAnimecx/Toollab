import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const stopwords = new Set(['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']);

const KeywordExtractorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/keyword-extractor')!;
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<[string, number][]>([]);
  const [numKeywords, setNumKeywords] = useState(10);
  const [ignoreStopwords, setIgnoreStopwords] = useState(true);

  const handleExtract = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequencies: { [key: string]: number } = {};
    
    for (const word of words) {
      if (ignoreStopwords && stopwords.has(word)) continue;
      frequencies[word] = (frequencies[word] || 0) + 1;
    }
    
    const sortedKeywords = Object.entries(frequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, numKeywords);
      
    setKeywords(sortedKeywords);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[300px] bg-secondary/40 border-white/10"
          />
          <Button onClick={handleExtract} disabled={!text}>Extract Keywords</Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead className="text-right">Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map(([word, count]) => (
                <TableRow key={word}>
                  <TableCell className="font-medium">{word}</TableCell>
                  <TableCell className="text-right">{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Number of Keywords">
              <Input type="number" value={numKeywords} onChange={(e) => setNumKeywords(Number(e.target.value))} className="w-24 bg-secondary/40 border-white/10" />
            </SettingsRow>
            <SettingsRow label="Ignore Common Stopwords">
              <Switch checked={ignoreStopwords} onCheckedChange={setIgnoreStopwords} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default KeywordExtractorPage;