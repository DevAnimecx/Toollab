import { useState, useEffect } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';

const unitConfig = {
  Length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    mile: 1609.34,
    foot: 0.3048,
    inch: 0.0254,
  },
  Weight: {
    kilogram: 1,
    gram: 0.001,
    pound: 0.453592,
    ounce: 0.0283495,
  },
  Temperature: {
    Celsius: (c: number) => ({ f: c * 9/5 + 32, k: c + 273.15 }),
    Fahrenheit: (f: number) => ({ c: (f - 32) * 5/9, k: (f - 32) * 5/9 + 273.15 }),
    Kelvin: (k: number) => ({ c: k - 273.15, f: (k - 273.15) * 9/5 + 32 }),
  },
};

const UnitConverterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/unit-converter')!;
  const [category, setCategory] = useState<keyof typeof unitConfig>('Length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    const units = Object.keys(unitConfig[category]);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [category]);

  useEffect(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) {
      setToValue('');
      return;
    }

    let result;
    if (category === 'Temperature') {
      const tempFuncs = unitConfig.Temperature[fromUnit as keyof typeof unitConfig.Temperature];
      const tempResults = tempFuncs(val);
      result = tempResults[toUnit.slice(0,1).toLowerCase() as 'f' | 'c' | 'k'];
    } else {
      const fromToBase = val * unitConfig[category][fromUnit as keyof typeof unitConfig.Length];
      result = fromToBase / unitConfig[category][toUnit as keyof typeof unitConfig.Length];
    }
    
    setToValue(result.toFixed(4));
  }, [fromValue, fromUnit, toUnit, category]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-2xl mx-auto space-y-6">
        <Select value={category} onValueChange={(v) => setCategory(v as keyof typeof unitConfig)}>
          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {Object.keys(unitConfig).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4">
          <div className="w-full space-y-2">
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(unitConfig[category]).map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="number" value={fromValue} onChange={e => setFromValue(e.target.value)} className="text-lg" />
          </div>
          <ArrowRightLeft className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          <div className="w-full space-y-2">
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(unitConfig[category]).map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="text" value={toValue} readOnly className="text-lg bg-muted/50" />
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default UnitConverterPage;