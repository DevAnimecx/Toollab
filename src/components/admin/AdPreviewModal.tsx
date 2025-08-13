import { Ad } from '@/data/ads';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShieldCheck } from 'lucide-react';

interface AdPreviewModalProps {
  ad: Ad | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdPreviewModal = ({ ad, open, onOpenChange }: AdPreviewModalProps) => {
  if (!ad) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 max-w-3xl bg-transparent">
        <DialogHeader className="sr-only">
          <DialogTitle>Ad Preview: {ad.headline}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden rounded-lg">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${ad.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          
          <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-glow">
              {ad.headline}
            </h2>
            <p className="font-body text-md md:text-lg text-white/80 mt-2 max-w-xl">
              {ad.subtext}
            </p>
          </div>

          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-white/90">BlackVault Ads</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};