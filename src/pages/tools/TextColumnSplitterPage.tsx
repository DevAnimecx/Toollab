import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const TextColumnSplitterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-column-splitter')!;
  const [input, setInput] = useState('John,Doe,USA\nJane,Smith,Canada');
  const [delimiter, setDelimiter] = useState(',');
  const [columns, setColumns] = useState<string[][]>([]);

  const handleSplit = () => {
    const lines = input.split('\n');
    const result = lines.map(line => line.split(delimiter));
    setColumns(result);
  };

  const maxCols = useMemo(() => Math.max(0, ...columns.map(row => row.length)), [columns]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text here. Each line is a row."
            className="min-h-[200px]"
          />
          <Button onClick={handleSplit} disabled={!input}>Split Text</Button>
          <ScrollArea className="h-72 w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {Array.from({ length: maxCols }).map((_, i) => (
                    <TableHead key={i}>Column {i + 1}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {columns.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.from({ length: maxCols }).map((_, colIndex) => (
                      <TableCell key={colIndex}>{row[colIndex] || ''}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Delimiter">
              <Input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="w-24" />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextColumnSplitterPage;