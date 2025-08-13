import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { parseFromTimeZone, formatInTimeZone } from 'date-fns-tz';

const timeZones = (Intl as any).supportedValuesOf('timeZone');

const TimeZoneConverterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/time-zone-converter')!;
  const [fromTz, setFromTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toTz, setToTz] = useState('UTC');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));

  const convertedTime = useMemo(() => {
    try {
      const date = parseFromTimeZone(dateTime, { timeZone: fromTz });
      return formatInTimeZone(date, toTz, "yyyy-MM-dd'T'HH:mm");
    } catch {
      return 'Invalid Date';
    }
  }, [dateTime, fromTz, toTz]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">From</label>
            <Select value={fromTz} onValueChange={setFromTz}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-60">
                {timeZones.map((tz: string) => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} className="mt-2 bg-secondary/40 border-white/10" />
          </div>
          <div>
            <label className="text-sm font-medium">To</label>
            <Select value={toTz} onValueChange={setToTz}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-60">
                {timeZones.map((tz: string) => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="datetime-local" value={convertedTime} readOnly className="mt-2 bg-muted/50" />
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TimeZoneConverterPage;