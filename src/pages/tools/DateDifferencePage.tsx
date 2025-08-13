import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';

const DateDifferencePage = () => {
  const tool = tools.find((t) => t.path === '/tools/date-difference-calculator')!;
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);

  const diff = useMemo(() => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
      return {
        years: differenceInYears(end, start),
        months: differenceInMonths(end, start),
        weeks: differenceInWeeks(end, start),
        days: differenceInDays(end, start),
      };
    } catch {
      return null;
    }
  }, [startDate, endDate]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        {diff && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-center">Result</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{diff.years}</p>
                  <p className="text-sm text-muted-foreground">Years</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{diff.months}</p>
                  <p className="text-sm text-muted-foreground">Months</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{diff.weeks}</p>
                  <p className="text-sm text-muted-foreground">Weeks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{diff.days}</p>
                  <p className="text-sm text-muted-foreground">Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default DateDifferencePage;