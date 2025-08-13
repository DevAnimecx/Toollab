import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud } from 'lucide-react';
import { showLoading, showError, showSuccess, dismissToast } from '@/utils/toast';
import * as pdfjsLib from 'pdfjs-dist';
import type { RenderParameters } from 'pdfjs-dist/types/src/display/api';
import jsPDF from 'jspdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfSplitterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/pdf-splitter')!;
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState('');

  const handleSplit = async () => {
    if (!file || !ranges) {
      showError('Please upload a file and specify page ranges.');
      return;
    }
    const toastId = showLoading('Splitting PDF...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const pageRanges = ranges.split(',').map(r => r.trim());

      for (const range of pageRanges) {
        const newPdf = new jsPDF();
        const pages = range.includes('-') ? range.split('-').map(Number) : [Number(range), Number(range)];
        
        for (let i = pages[0]; i <= pages[1]; i++) {
          if (i > pdf.numPages) continue;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d')!;
          await page.render({ canvasContext: context, viewport }).promise;
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          
          if (i > pages[0]) newPdf.addPage();
          newPdf.addImage(imgData, 'JPEG', 0, 0, newPdf.internal.pageSize.getWidth(), newPdf.internal.pageSize.getHeight());
        }
        newPdf.save(`${file.name.replace('.pdf', '')}-range-${range}.pdf`);
      }
      dismissToast(toastId);
      showSuccess('PDF split successfully!');
    } catch (error) {
      dismissToast(toastId);
      showError('Failed to split PDF.');
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-lg mx-auto space-y-6">
        <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center bg-secondary/20 hover:bg-secondary/40 transition-colors">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">{file ? file.name : 'Upload a PDF'}</h3>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
        <Input
          placeholder="Enter page ranges (e.g., 1-3, 5, 8-10)"
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          className="h-12 bg-secondary/40 border-white/10"
        />
        <Button onClick={handleSplit} disabled={!file || !ranges} size="lg" className="w-full">
          Split PDF
        </Button>
      </div>
    </ToolPageLayout>
  );
};

export default PdfSplitterPage;