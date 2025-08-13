import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/tool/CopyButton';
import { UploadCloud, Trash2 } from 'lucide-react';
import { showError } from '@/utils/toast';

const ImageToBase64Page = () => {
  const tool = tools.find((t) => t.path === '/tools/image-to-base64')!;
  const [base64, setBase64] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setBase64(reader.result as string);
      };
      reader.onerror = () => {
        showError('Error reading file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAll = () => {
    setBase64('');
    setImagePreview(null);
  }

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        {!imagePreview ? (
          <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">Upload an image</h3>
            <p className="mt-1 text-sm text-muted-foreground">Drag and drop or click to select a file.</p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img src={imagePreview} alt="Preview" className="rounded-lg object-contain" />
              <Button onClick={clearAll} variant="destructive" className="w-full mt-4">
                <Trash2 className="mr-2 h-4 w-4" /> Remove Image
              </Button>
            </div>
            <div className="w-full md:w-2/3 relative">
              <Textarea
                value={base64}
                readOnly
                placeholder="Base64 output will appear here..."
                className="min-h-[250px] text-sm p-4 pr-14"
              />
              <CopyButton textToCopy={base64} className="absolute top-3 right-3" />
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToBase64Page;