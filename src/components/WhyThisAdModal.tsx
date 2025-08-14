import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ShieldCheck } from 'lucide-react';

export const WhyThisAdModal = () => {
  return (
    <DialogContent className="bg-black/20 backdrop-blur-xl border-white/10 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-heading text-2xl">
          <ShieldCheck className="h-6 w-6 text-primary" />
          About BlackVault Ads
        </DialogTitle>
        <DialogDescription className="text-muted-foreground pt-2">
          We believe in a better way to advertise.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 text-sm text-foreground/80">
        <p>
          BlackVault Ads is our custom, privacy-first advertising platform. Unlike traditional ad networks, we do{' '}
          <strong>not track you, collect your personal data, or use cookies</strong> to follow you across the web.
        </p>
        <p>
          The ads you see are curated specifically for the Toollab audience—developers, designers, and tech enthusiasts. They are not personalized to you individually.
        </p>
        <p>
          This system allows us to keep Toollab's 70+ tools completely free to use, without compromising your privacy. It's our commitment to building a more ethical and transparent web.
        </p>
      </div>
    </DialogContent>
  );
};