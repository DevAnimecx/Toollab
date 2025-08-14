import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { showLoading, showError, showSuccess, dismissToast } from '@/utils/toast';
import { UploadBox } from '@/components/tool/UploadBox';

const PdfWatermarkAdderPage = () => {
  const tool = tools.find((t) => t.path === '/tools/pdf-watermark-adder')!;
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.5);
  const [fontSize, setFontSize] = useState(50);
  const [position, setPosition] = useState('center');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddWatermark = async () => {
    if (!pdfFile) {
      showError('Please upload a PDF file.');
      return;
    }
    setIsProcessing(true);
    const toastId = showLoading('Adding watermark...');

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, fontSize);
        
        let x, y, rotate;
        switch (position) {
          case 'center':
            x = (width - textWidth) / 2;
            y = height / 2;
            rotate = degrees(0);
            break;
          case 'diagonal':
            x = width / 2 - textWidth / 2;
            y = height / 2;
            rotate = degrees(45);
            break;
          default: // center
            x = (width - textWidth) / 2;
            y = height / 2;
            rotate = degrees(0);
        }

        page.drawText(watermarkText, {
          x,
          y,
          font: helveticaFont,
          size: fontSize,
          color: rgb(0, 0, 0),
          opacity,
          rotate,
        });
      }

      const watermarkedPdfBytes = await pdfDoc.save();
      const blob = new Blob([watermarkedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pdfFile.name.replace('.pdf', '')}-watermarked.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      dismissToast(toastId);
      showSuccess('Watermark added successfully!');
    } catch (error) {
      dismissToast(toastId);
      showError('Failed to add watermark.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UploadBox
            onFilesAccepted={(files) => setPdfFile(files[0] || null)}
            acceptedFormats={{ 'application/pdf': ['.pdf'] }}
            multiple={false}
          />
          <Button onClick={handleAddWatermark} disabled={!pdfFile || isProcessing} size="lg" className="w-full">
            {isProcessing ? 'Processing...' : 'Add Watermark & Download'}
          </Button>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings title="Watermark Settings">
            <SettingsRow label="Watermark Text">
              <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
            </SettingsRow>
            <SettingsRow label="Position">
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="diagonal">Diagonal</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>
            <SettingsRow label="Font Size">
              <span className="font-bold">{fontSize}</span>
            </SettingsRow>
            <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={10} max={150} step={1} />
            <SettingsRow label="Opacity">
              <span className="font-bold">{opacity.toFixed(2)}</span>
            </SettingsRow>
            <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0.1} max={1} step={0.05} />
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PdfWatermarkAdderPage;