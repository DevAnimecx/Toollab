import { useState, useRef } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileDown, Trash2 } from 'lucide-react';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { showLoading, showError, showSuccess, dismissToast } from '@/utils/toast';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

const PdfSplitterPage = () => {
  const tool = tools.find((t) => t.path === '/tools/pdf-splitter')!;
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageRange, setPageRange] = useState('1-1');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        setNumPages(pdf.numPages);
        setPageRange(`1-${pdf.numPages}`);
      } catch (error) {
        showError('Failed to load PDF.');
        setNumPages(0);
        setPdfFile(null);
      }
    }
  };

  const handleSplit = async () => {
    if (!pdfFile) {
      showError('Please upload a PDF file.');
      return;
    }
    setIsProcessing(true);
    const toastId = showLoading('Splitting PDF...');

    try {
      const inputPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(inputPdfBytes);
      const newPdf = await PDFDocument.create();

      const [startStr, endStr] = pageRange.split('-').map(s => s.trim());
      let startPage = parseInt(startStr);
      let endPage = parseInt(endStr);

      if (isNaN(startPage) || isNaN(endPage) || startPage < 1 || endPage > numPages || startPage > endPage) {
        throw new Error('Invalid page range. Please use format like "1-5" or "3-3".');
      }

      const pages = await newPdf.copyPages(pdfDoc, Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage - 1 + i));
      pages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pdfFile.name.replace('.pdf', '')}-split.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      dismissToast(toastId);
      showSuccess('PDF split successfully!');
    } catch (error) {
      dismissToast(toastId);
      showError((error as Error).message || 'Failed to split PDF.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center bg-secondary/20 hover:bg-secondary/40 transition-colors">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              {pdfFile ? pdfFile.name : 'Upload a PDF'}
            </h3>
            {numPages > 0 && (
              <p className="text-sm text-muted-foreground mt-1">Total pages: {numPages}</p>
            )}
            <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
          <Button onClick={handleSplit} disabled={!pdfFile || isProcessing || numPages === 0} size="lg" className="w-full">
            {isProcessing ? 'Processing...' : 'Split & Download PDF'}
          </Button>
          {pdfFile && (
            <Button onClick={() => { setPdfFile(null); setNumPages(0); setPageRange('1-1'); }} variant="destructive" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" /> Remove PDF
            </Button>
          )}
        </div>
        <div className="lg:col-span-1">
          <ToolSettings title="Split Settings">
            <SettingsRow label="Page Range">
              <Input 
                value={pageRange} 
                onChange={(e) => setPageRange(e.target.value)} 
                placeholder="e.g., 1-5 or 3-3" 
                className="bg-secondary/40 border-white/10"
                disabled={!pdfFile}
              />
            </SettingsRow>
            <p className="text-xs text-muted-foreground pt-2">
              Enter the page range to extract (e.g., "1-5" for pages 1 to 5, or "3-3" for page 3).
            </p>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PdfSplitterPage;