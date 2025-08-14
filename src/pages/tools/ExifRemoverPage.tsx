import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { UploadBox } from '@/components/tool/UploadBox';

const ExifRemoverPage = () => {
  const tool = tools.find((t) => t.path === '/tools/exif-remover')!;
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cleanImage, setCleanImage] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState('');

  const handleFileChange = (files: File[]) => {
    const file = files[0];
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
        setCleanImage(canvas.toDataURL('image/jpeg'));
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
          <UploadBox
            onFilesAccepted={handleFileChange}
            acceptedFormats={{ 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] }}
            multiple={false}
            prompt={{
              title: 'Upload an Image',
              description: 'Metadata will be stripped automatically.'
            }}
          />
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