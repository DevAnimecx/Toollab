import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { UploadCloud, Download } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const ExifRemoverPage = () => {
  const tool = tools.find((t) => t.path === '/tools/exif-remover')!;
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cleanImage, setCleanImage] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setOriginalImage(src);
        setOriginalFileName(file.name);
        processImage(src);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setCleanImage(canvas.toDataURL('image/jpeg')); // Change format if needed
        showSuccess('Metadata removed successfully!');
      } else {
        showError('Could not process the image.');
      }
    };
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        {!originalImage ? (
          <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">Upload an Image</h3>
            <p className="mt-1 text-sm text-muted-foreground">Metadata will be stripped automatically.</p>
            <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-semibold mb-2">Original Image</h3>
              <img src={originalImage} alt="Original" className="rounded-lg max-h-80 w-auto mx-auto" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cleaned Image (No EXIF)</h3>
              {cleanImage ? (
                <>
                  <img src={cleanImage} alt="Cleaned" className="rounded-lg max-h-80 w-auto mx-auto" />
                  <Button asChild className="w-full mt-4">
                    <a href={cleanImage} download={`cleaned-${originalFileName}`}>
                      <Download className="mr-2 h-4 w-4" /> Download Cleaned Image
                    </a>
                  </Button>
                </>
              ) : (
                <p>Processing...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ExifRemoverPage;