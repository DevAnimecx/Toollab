import { useState, useRef } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import CopyButton from '@/components/tool/CopyButton';
import { UploadBox } from '@/components/tool/UploadBox';

const ImageColorPickerPage = () => {
  const tool = tools.find((t) => t.path === '/tools/image-color-picker')!;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext('2d')?.drawImage(img, 0, 0);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${("000000" + ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16)).slice(-6)}`;
    setPickedColor(hex);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        {!imageSrc ? (
          <UploadBox
            onFilesAccepted={handleFileChange}
            acceptedFormats={{ 'image/*': [] }}
            multiple={false}
            prompt={{ title: 'Upload an Image' }}
          />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="max-w-full h-auto rounded-lg cursor-crosshair border" />
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
              <div className="w-12 h-12 rounded-md border" style={{ backgroundColor: pickedColor }} />
              <div className="font-mono text-lg">{pickedColor.toUpperCase()}</div>
              <CopyButton textToCopy={pickedColor} />
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageColorPickerPage;