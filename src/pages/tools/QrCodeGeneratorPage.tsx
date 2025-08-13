import { useState, useRef } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassButton } from '@/components/ui/GlassButton';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';

const QrCodeGeneratorPage = () => {
  const tool = tools.find((t) => t.path === '/tools/qr-code-generator')!;
  const [text, setText] = useState('https://toollab.dev');
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = (format: 'png' | 'svg') => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `qrcode.${format}`;
        link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/svg+xml');
        link.click();
      }
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="p-6 bg-white rounded-lg" ref={qrRef}>
          <QRCodeCanvas value={text} size={256} />
        </div>
        <div className="w-full max-w-sm space-y-4">
          <GlassInput
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
            className="text-base"
            accentColor={tool.accentColor}
          />
          <div className="grid grid-cols-2 gap-4">
            <GlassButton onClick={() => downloadQR('png')} disabled={!text} accentColor={tool.accentColor}>
              <Download className="mr-2 h-4 w-4" /> Download PNG
            </GlassButton>
            <GlassButton onClick={() => downloadQR('svg')} disabled={!text} accentColor={tool.accentColor}>
              <Download className="mr-2 h-4 w-4" /> Download SVG
            </GlassButton>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QrCodeGeneratorPage;