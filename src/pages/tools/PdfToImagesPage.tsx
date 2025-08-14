import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { showLoading, showError, dismissToast } from '@/utils/toast';
import * as pdfjsLib from 'pdfjs-dist';
import { UploadBox } from '@/components/tool/UploadBox';

const PdfToImagesPage = () => {
  const tool = tools.find((t) => t.path === '/tools/pdf-to-images')!;
  const [images, setImages] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (files: File[]) => {
    const file = files[0];
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
          canvas: canvas,
          canvasContext: context, 
          viewport: viewport
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
        <UploadBox
          onFilesAccepted={handleFileChange}
          acceptedFormats={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          prompt={{ title: 'Upload a PDF to Convert to Images' }}
        />

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
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PdfToImagesPage;