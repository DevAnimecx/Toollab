import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Switch } from '@/components/ui/switch';
import Papa from 'papaparse';
import { showSuccess } from '@/utils/toast';

const CsvToJsonPage = () => {
  const tool = tools.find((t) => t.path === '/tools/csv-to-json')!;
  const [csv, setCsv] = useState('header1,header2\nvalue1,value2');
  const [json, setJson] = useState('');
  const [useHeaders, setUseHeaders] = useState(true);

  const handleConvert = () => {
    Papa.parse(csv, {
      header: useHeaders,
      complete: (results) => {
        setJson(JSON.stringify(results.data, null, 2));
        showSuccess('CSV converted to JSON!');
      },
    });
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder="Paste your CSV data here"
            className="min-h-[300px] font-mono bg-secondary/40 border-white/10"
          />
          <div className="relative">
            <Textarea
              value={json}
              readOnly
              placeholder="JSON output"
              className="min-h-[300px] font-mono bg-muted/50"
            />
            <CopyButton textToCopy={json} className="absolute top-3 right-3" />
          </div>
          <Button onClick={handleConvert} disabled={!csv}>Convert to JSON</Button>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="First row as headers">
              <Switch checked={useHeaders} onCheckedChange={setUseHeaders} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default CsvToJsonPage;