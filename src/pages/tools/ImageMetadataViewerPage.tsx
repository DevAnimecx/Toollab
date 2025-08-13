import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as EXIF from 'exif-js';
import { showError } from '@/utils/toast';

const ImageMetadataViewerPage = () => {
  const tool = tools.find((t) => t.path === '/tools/image-metadata-viewer')!;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        const img = new Image();
        img.src = event.target?.result as string;
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
        <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center bg-secondary/20 hover:bg-secondary/40 transition-colors">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">Upload an Image</h3>
          <input type="file" accept="image/jpeg" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
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