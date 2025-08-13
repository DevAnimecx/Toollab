import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import CopyButton from '@/components/tool/CopyButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const HtmlTableGeneratorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/html-table-generator')!;
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [hasHeader, setHasHeader] = useState(true);

  const tableHtml = useMemo(() => {
    let html = '<table>\n';
    if (hasHeader) {
      html += '  <thead>\n    <tr>\n';
      for (let i = 1; i <= cols; i++) {
        html += `      <th>Header ${i}</th>\n`;
      }
      html += '    </tr>\n  </thead>\n';
    }
    html += '  <tbody>\n';
    for (let r = 1; r <= rows; r++) {
      html += '    <tr>\n';
      for (let c = 1; c <= cols; c++) {
        html += `      <td>Row ${r}, Cell ${c}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';
    return html;
  }, [rows, cols, hasHeader]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">HTML Output</h3>
            <div className="relative bg-card p-4 rounded-md border min-h-[200px]">
              <SyntaxHighlighter language="html" style={atomDark} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
                {tableHtml}
              </SyntaxHighlighter>
              <CopyButton textToCopy={tableHtml} className="absolute top-3 right-3" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Live Preview</h3>
            <div className="p-4 border rounded-md overflow-x-auto">
              <style>{`
                .preview-table { width: 100%; border-collapse: collapse; }
                .preview-table th, .preview-table td { border: 1px solid hsl(var(--border)); padding: 8px; text-align: left; }
                .preview-table th { background-color: hsl(var(--muted)); }
                .preview-table tbody tr:nth-child(odd) { background-color: hsl(var(--muted)/0.5); }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: tableHtml.replace('<table>', '<table class="preview-table">') }} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings>
            <SettingsRow label="Rows">
              <Input type="number" value={rows} onChange={(e) => setRows(Math.max(1, Number(e.target.value)))} className="w-24" />
            </SettingsRow>
            <SettingsRow label="Columns">
              <Input type="number" value={cols} onChange={(e) => setCols(Math.max(1, Number(e.target.value)))} className="w-24" />
            </SettingsRow>
            <SettingsRow label="Include Header (<thead>)">
              <Switch checked={hasHeader} onCheckedChange={setHasHeader} />
            </SettingsRow>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default HtmlTableGeneratorPage;