import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';

const staticRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  JPY: 157.25,
  GBP: 0.78,
  AUD: 1.50,
  CAD: 1.37,
  CHF: 0.90,
  CNY: 7.25,
  INR: 83.54,
};

const CurrencyConverterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/currency-converter')!;
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(100);

  const convertedAmount = useMemo(() => {
    const amountInUsd = amount / staticRates[fromCurrency];
    const result = amountInUsd * staticRates[toCurrency];
    return result.toFixed(2);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="p-6 border rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <label className="text-sm font-medium">From</label>
              <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="text-lg h-12" />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(staticRates).map(curr => <SelectItem key={curr} value={curr}>{curr}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground flex-shrink-0 my-4 md:my-0" />
            <div className="w-full space-y-2">
              <label className="text-sm font-medium">To</label>
              <Input type="text" value={convertedAmount} readOnly className="text-lg h-12 bg-muted/50" />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(staticRates).map(curr => <SelectItem key={curr} value={curr}>{curr}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Disclaimer: Rates are for informational purposes only and are not live.
        </p>
      </div>
    </ToolPageLayout>
  );
};

export default CurrencyConverterPage;