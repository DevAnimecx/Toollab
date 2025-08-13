import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { showLoading, showError, dismissToast } from '@/utils/toast';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          imageUrls.push(canvas.toDataURL('image/png'));
        }
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
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}-page-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">Upload a PDF</h3>
          <p className="mt-1 text-sm text-muted-foreground">Drag and drop or click to select a file.</p>
          <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((src, index) => (
              <div key={index} className="relative group border rounded-lg overflow-hidden">
                <img src={src} alt={`Page ${index + 1}`} className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button onClick={() => downloadImage(src, index)}>Download</Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                  Page {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PdfToImagesPage;