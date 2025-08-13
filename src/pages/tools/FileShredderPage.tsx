import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { UploadCloud, AlertTriangle } from 'lucide-react';
import { ToolSettings, SettingsRow } from '@/components/tool/ToolSettings';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { showLoading, showError, showSuccess, dismissToast } from '@/utils/toast';

const FileShredderPage = () => {
  const tool = tools.find((t) => t.path === '/tools/file-shredder')!;
  const [file, setFile] = useState<File | null>(null);
  const [passes, setPasses] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleShred = async () => {
    if (!file) {
      showError('Please select a file to shred.');
      return;
    }
    setIsProcessing(true);
    const toastId = showLoading(`Shredding ${file.name}...`);

    try {
      const buffer = await file.arrayBuffer();
      const view = new Uint8Array(buffer);

      for (let i = 0; i < passes; i++) {
        crypto.getRandomValues(view);
      }
      
      // The buffer is now overwritten in memory. When `file` is reset, it will be garbage collected.
      setFile(null);
      dismissToast(toastId);
      showSuccess('File data has been securely overwritten in memory and discarded.');
    } catch (error) {
      dismissToast(toastId);
      showError('An error occurred during the shredding process.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              {file ? file.name : 'Upload a File to Shred'}
            </h3>
            <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
          <Button onClick={handleShred} disabled={!file || isProcessing} size="lg" variant="destructive" className="w-full">
            {isProcessing ? 'Shredding...' : `Shred File (${passes} passes)`}
          </Button>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This tool performs a simulation of secure file deletion. It overwrites the file's data in your browser's memory multiple times. Due to browser security limitations, it **cannot** guarantee the file is securely erased from your computer's hard drive. For true secure deletion, please use a dedicated desktop application.
            </AlertDescription>
          </Alert>
        </div>
        <div className="lg:col-span-1">
          <ToolSettings title="Shredding Settings">
            <SettingsRow label="Overwrite Passes">
              <span className="font-bold">{passes}</span>
            </SettingsRow>
            <Slider value={[passes]} onValueChange={(v) => setPasses(v[0])} min={1} max={7} step={1} />
            <p className="text-xs text-muted-foreground pt-2">
              More passes increase security but may be slightly slower for very large files. 3-7 passes is standard.
            </p>
          </ToolSettings>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default FileShredderPage;