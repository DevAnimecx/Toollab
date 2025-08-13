import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';

const timeZones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney',
  'Pacific/Auckland',
];

const TimeZoneConverterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/time-zone-converter')!;
  const [fromTz, setFromTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toTz, setToTz] = useState('UTC');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16)); // YYYY-MM-DDTHH:MM format

  const convertedTime = useMemo(() => {
    try {
      // Parse the input date-time string, treating it as a date in the 'fromTz' timezone.
      // This gives us the equivalent date in UTC.
      const utcDate = zonedTimeToUtc(dateTime, fromTz);
      
      // Format this UTC date into the 'toTz' timezone.
      return formatInTimeZone(utcDate, toTz, "yyyy-MM-dd HH:mm:ss zzz");
    } catch (e) {
      console.error("Error converting time:", e);
      return 'Invalid Date';
    }
  }, [dateTime, fromTz, toTz]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="bg-secondary/40 border-white/10">
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date and Time</label>
              <Input 
                type="datetime-local" 
                value={dateTime} 
                onChange={e => setDateTime(e.target.value)} 
                className="bg-secondary/50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From Time Zone</label>
                <Select value={fromTz} onValueChange={setFromTz}>
                  <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {timeZones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To Time Zone</label>
                <Select value={toTz} onValueChange={setToTz}>
                  <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {timeZones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground text-sm">Converted Time</p>
              <p className="text-2xl font-bold mt-1">{convertedTime}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
};

export default TimeZoneConverterPage;