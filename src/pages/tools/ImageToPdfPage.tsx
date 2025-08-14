import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import { showSuccess } from '@/utils/toast';
import { UploadBox } from '@/components/tool/UploadBox';

const ImageToPdfPage = () => {
  const tool = tools.find((t) => t.path === '/tools/image-to-pdf')!;
  const [images, setImages] = useState<File[]>([]);

  const generatePdf = () => {
    if (images.length === 0) return;
    const doc = new jsPDF();
    images.forEach((imageFile, index) => {
      if (index > 0) doc.addPage();
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = doc.internal.pageSize.getHeight();
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const width = imgWidth * ratio;
          const height = imgHeight * ratio;
          doc.addImage(img.src, 'JPEG', (pdfWidth - width) / 2, (pdfHeight - height) / 2, width, height);
          if (index === images.length - 1) {
            doc.save('images.pdf');
            showSuccess('PDF generated!');
          }
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <UploadBox
          onFilesAccepted={setImages}
          acceptedFormats={{ 'image/*': [] }}
          multiple={true}
          maxFiles={50}
          prompt={{ title: 'Upload Images to Merge into PDF' }}
        />
        {images.length > 0 && (
          <div className="flex justify-center">
            <Button onClick={generatePdf} size="lg">Generate PDF from {images.length} image(s)</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToPdfPage;