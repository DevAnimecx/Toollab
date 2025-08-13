import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Lock, Unlock } from 'lucide-react';
import { showLoading, showError, showSuccess, dismissToast } from '@/utils/toast';
import CryptoJS from 'crypto-js';

const FileEncryptionPage = () => {
  const tool = tools.find((t) => t.path === '/tools/file-encryption')!;
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const processFile = async (mode: 'encrypt' | 'decrypt') => {
    if (!file || !password) {
      showError('Please select a file and enter a password.');
      return;
    }

    const toastId = showLoading(`${mode === 'encrypt' ? 'Encrypting' : 'Decrypting'} file...`);
    
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = reader.result as string;
        let result;
        let resultFileName;

        if (mode === 'encrypt') {
          result = CryptoJS.AES.encrypt(data, password).toString();
          resultFileName = `${file.name}.encrypted`;
        } else {
          const bytes = CryptoJS.AES.decrypt(data, password);
          result = bytes.toString(CryptoJS.enc.Utf8);
          if (!result) throw new Error('Decryption failed. Check password or file.');
          resultFileName = file.name.replace('.encrypted', '');
        }

        const blob = new Blob([result]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = resultFileName;
        a.click();
        URL.revokeObjectURL(url);
        
        dismissToast(toastId);
        showSuccess('File processed successfully!');
      } catch (err) {
        dismissToast(toastId);
        showError((err as Error).message || 'An error occurred.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="max-w-lg mx-auto space-y-6">
        <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center bg-secondary/20 hover:bg-secondary/40 transition-colors">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            {file ? file.name : 'Upload a File'}
          </h3>
          <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
        <Input
          type="password"
          placeholder="Enter a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 text-lg bg-secondary/40 border-white/10"
        />
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => processFile('encrypt')} size="lg" disabled={!file || !password}>
            <Lock className="mr-2 h-5 w-5" /> Encrypt
          </Button>
          <Button onClick={() => processFile('decrypt')} size="lg" variant="secondary" disabled={!file || !password}>
            <Unlock className="mr-2 h-5 w-5" /> Decrypt
          </Button>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default FileEncryptionPage;