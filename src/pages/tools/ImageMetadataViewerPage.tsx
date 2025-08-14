import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as EXIF from 'exif-js';
import { showError } from '@/utils/toast';
import { UploadBox } from '@/components/tool/UploadBox';

const ImageMetadataViewerPage = () => {
  const tool = tools.find((t) => t.path === '/tools/image-metadata-viewer')!;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  const handleFileChange = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);
        const img = new Image();
        img.src = src;
        img.onload = () => {
          EXIF.getData(img as any, function(this: any) {
            const allMetaData = EXIF.getAllTags(this);
            if (Object.keys(allMetaData).length === 0) {
              showError('No EXIF metadata found in this image.');
              setMetadata(null);
            } else {
              setMetadata(allMetaData);
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <UploadBox
          onFilesAccepted={handleFileChange}
          acceptedFormats={{ 'image/jpeg': ['.jpeg', '.jpg'] }}
          multiple={false}
          prompt={{ title: 'Upload an Image to View Metadata' }}
        />
        {metadata && imageSrc && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img src={imageSrc} alt="preview" className="rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(metadata).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{key}</TableCell>
                      <TableCell>{String(value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageMetadataViewerPage;