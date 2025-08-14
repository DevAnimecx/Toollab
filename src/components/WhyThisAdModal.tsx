import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';

export const WhyThisAdModal = () => {
  return (
    <DialogContent className="bg-gradient-to-br from-saffron/20 via-white/10 to-india-green/20 backdrop-blur-xl border-white/10 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-heading text-2xl">
          <Info className="h-6 w-6 text-primary" />
          Why This Ad?
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm text-foreground/80 pt-2">
        <p>
          This ad helps keep Toollab free for all users. We only display relevant, non-intrusive ads powered by the <strong>BlackVault Ads Network</strong>.
        </p>
        <p>
          Our system is built on privacy. We do not track you, collect personal data, or use invasive cookies. This allows us to fund the platform while respecting your digital privacy.
        </p>
      </div>
    </DialogContent>
  );
};