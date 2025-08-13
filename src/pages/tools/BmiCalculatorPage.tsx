import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BmiCalculatorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/bmi-calculator')!;
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(75);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [weightLbs, setWeightLbs] = useState(165);

  const bmiResult = useMemo(() => {
    let h, w;
    if (units === 'metric') {
      h = height / 100; // in meters
      w = weight; // in kg
    } else {
      h = (heightFt * 12 + heightIn) * 0.0254; // in meters
      w = weightLbs * 0.453592; // in kg
    }
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obesity';
      return { bmi: bmi.toFixed(1), category };
    }
    return null;
  }, [units, height, weight, heightFt, heightIn, weightLbs]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-md mx-auto space-y-6">
        <ToolSettings>
          <SettingsRow label="Units">
            <Select value={units} onValueChange={(v) => setUnits(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                <SelectItem value="imperial">Imperial (ft, in, lbs)</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
        </ToolSettings>
        
        {units === 'metric' ? (
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(Number(e.target.value))} />
            <Input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(Number(e.target.value))} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Height (ft)" value={heightFt} onChange={e => setHeightFt(Number(e.target.value))} />
              <Input type="number" placeholder="Height (in)" value={heightIn} onChange={e => setHeightIn(Number(e.target.value))} />
            </div>
            <Input type="number" placeholder="Weight (lbs)" value={weightLbs} onChange={e => setWeightLbs(Number(e.target.value))} />
          </div>
        )}

        {bmiResult && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Your BMI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold">{bmiResult.bmi}</p>
              <p className="text-lg text-muted-foreground">{bmiResult.category}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default BmiCalculatorPage;