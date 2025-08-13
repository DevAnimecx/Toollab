import { useState, useRef } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { UploadCloud, Trash2, Download } from 'lucide-react';
import { showLoading, showError, dismissToast } from '@/utils/toast';
import * as pdfjsLib from 'pdfjs-dist';

const PdfToImagesPage = () => {
  const tool = tools.find((t) => t.path === '/tools/pdf-to-images')!;
  const [images, setImages] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages([]);
    setFileName(file.name.replace('.pdf', ''));
    const toastId = showLoading('Converting PDF...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      const imageUrls: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ 
          canvasContext: context, 
          viewport: viewport,
          canvas: canvas
        }).promise;
        imageUrls.push(canvas.toDataURL('image/png'));
      }
      setImages(imageUrls);
      dismissToast(toastId);
    } catch (error) {
      dismissToast(toastId);
      showError('Failed to convert PDF.');
      console.error(error);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}-page-${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center bg-secondary/20 hover:bg-secondary/40 transition-colors">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            {fileName ? `PDF: ${fileName}.pdf` : 'Upload a PDF to convert'}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Each page will be converted to an image.</p>
          <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        {images.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((src, index) => (
                <div key={index} className="relative group border rounded-lg overflow-hidden">
                  <img src={src} alt={`Page ${index + 1}`} className="w-full h-auto" />
                  <Button 
                    size="icon" 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => downloadImage(src, index)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button onClick={() => setImages([])} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PdfToImagesPage;