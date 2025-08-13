import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import { showSuccess } from '@/utils/toast';

const TextToPdfPage = () => {
  const tool = tools.find((t) => t.path === '/tools/text-to-pdf')!;
  const [text, setText] = useState('');

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save('document.pdf');
    showSuccess('PDF generated and downloaded!');
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste the text for your PDF here..."
          className="min-h-[300px] text-base p-4 bg-secondary/40 border-white/10"
        />
        <Button onClick={generatePdf} disabled={!text} size="lg">
          <FileDown className="mr-2 h-5 w-5" /> Generate & Download PDF
        </Button>
      </div>
    </ToolPageLayout>
  );
};

export default TextToPdfPage;