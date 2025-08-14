import React, { useState, useEffect } from 'react';
import { ads as initialAds, Ad } from '@/data/ads';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { WhyThisAdModal } from './WhyThisAdModal';

const BlackVaultAdBlock = () => {
  const [ads] = useState<Ad[]>(() => initialAds.filter(ad => ad.status === 'active'));
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [isWhyAdOpen, setIsWhyAdOpen] = useState(false);

  useEffect(() => {
    if (ads.length < 2 || isClosed) return;

    const currentAdDuration = ads[currentAdIndex].duration * 1000;
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, currentAdDuration);

    return () => clearInterval(interval);
  }, [currentAdIndex, ads, isClosed]);

  if (ads.length === 0) {
    return null;
  }

  if (isClosed) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Dialog open={isWhyAdOpen} onOpenChange={setIsWhyAdOpen}>
            <div className="flex items-center justify-center gap-4 p-3 rounded-lg bg-secondary/40 border border-white/10 text-sm">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-semibold text-muted-foreground">BlackVault Ads</span>
              <DialogTrigger asChild>
                <button className="text-primary hover:underline text-xs">Why this ad?</button>
              </DialogTrigger>
            </div>
            <WhyThisAdModal />
          </Dialog>
        </div>
      </section>
    );
  }

  const currentAd = ads[currentAdIndex];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative w-full h-[180px] md:h-[210px] overflow-hidden rounded-2xl">
          <AnimatePresence>
            <motion.a
              key={currentAd.id}
              href={currentAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 w-full h-full block group"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <div
                className={`absolute inset-0 transition-all duration-500 ease-in-out group-hover:scale-105 ${currentAd.background}`}
              />
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 md:p-12 text-white text-center">
                <motion.h2 
                  className="font-heading text-3xl md:text-5xl font-bold text-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                >
                  {currentAd.headline}
                </motion.h2>
                <motion.p 
                  className="font-body text-md md:text-lg text-white/80 mt-2 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                >
                  {currentAd.subtext}
                </motion.p>
              </div>
            </motion.a>
          </AnimatePresence>

          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-white/90">BlackVault Ads</span>
            </div>
          </div>

          <button 
            onClick={() => setIsClosed(true)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all"
            aria-label="Close ad"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlackVaultAdBlock;