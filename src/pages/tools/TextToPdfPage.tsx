import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { GlassTextarea } from '@/components/ui/GlassInput';
import { GlassButton } from '@/components/ui/GlassButton';
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
        <GlassTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste the text for your PDF here..."
          className="min-h-[300px] text-base p-4"
          accentColor={tool.accentColor}
        />
        <GlassButton onClick={generatePdf} disabled={!text} size="lg" accentColor={tool.accentColor}>
          <FileDown className="mr-2 h-5 w-5" /> Generate & Download PDF
        </GlassButton>
      </div>
    </ToolPageLayout>
  );
};

export default TextToPdfPage;