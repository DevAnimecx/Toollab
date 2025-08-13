import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    showSuccess('Copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCopy}
      className={className}
      disabled={!textToCopy}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  );
};

export default CopyButton;