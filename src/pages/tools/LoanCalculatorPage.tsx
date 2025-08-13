import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';

const LoanCalculatorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/loan-calculator')!;
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(5); // in years

  const result = useMemo(() => {
    const principal = amount;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalPayment = emi * numberOfPayments;
      const totalInterest = totalPayment - principal;
      return {
        emi: emi.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      };
    }
    return null;
  }, [amount, rate, term]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolSettings title="Loan Details">
          <SettingsRow label="Loan Amount ($)">
            <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </SettingsRow>
          <SettingsRow label="Annual Interest Rate (%)">
            <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
          </SettingsRow>
          <SettingsRow label="Loan Term (Years)">
            <Input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} />
          </SettingsRow>
        </ToolSettings>
        
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground">Monthly Payment</p>
                <p className="text-4xl font-bold">${result.emi}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Principal Paid</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Interest Paid</span>
                <span>${result.totalInterest}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t">
                <span>Total Payment</span>
                <span>${result.totalPayment}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default LoanCalculatorPage;