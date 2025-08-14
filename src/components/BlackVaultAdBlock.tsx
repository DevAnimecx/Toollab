import React, { useState, useEffect } from 'react';
import { ads as initialAds, Ad } from '@/data/ads';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { WhyThisAdModal } from './WhyThisAdModal';

const BlackVaultAdBlock = () => {
  const [ads] = useState<Ad[]>(() => initialAds.filter(ad => ad.status === 'active'));
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isWhyAdOpen, setIsWhyAdOpen] = useState(false);

  useEffect(() => {
    if (ads.length < 2) return;

    const currentAdDuration = ads[currentAdIndex].duration * 1000;
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, currentAdDuration);

    return () => clearInterval(interval);
  }, [currentAdIndex, ads]);

  if (ads.length === 0) {
    return null;
  }

  const currentAd = ads[currentAdIndex];

  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative w-full h-[210px] md:h-[240px] overflow-hidden rounded-2xl group
                        bg-gradient-to-br from-saffron/20 via-white/10 to-india-green/20
                        backdrop-blur-md hover:backdrop-blur-lg border border-white/10
                        shadow-lg transition-all duration-300">
          
          <AnimatePresence>
            <motion.a
              key={currentAd.id}
              href={currentAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 w-full h-full block"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 md:p-12 text-white text-center
                              transition-transform duration-300 ease-out group-hover:scale-102">
                <motion.h2 
                  className="font-heading text-3xl md:text-5xl font-bold"
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

          <div className="absolute bottom-4 left-4 z-20 text-left">
            <h3 className="text-lg font-bold text-white">Powered by BlackVault Ads</h3>
            <p className="text-xs text-white/70">Helping Toollab stay free forever.</p>
          </div>

          <Dialog open={isWhyAdOpen} onOpenChange={setIsWhyAdOpen}>
            <DialogTrigger asChild>
              <button 
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/40 transition-all"
                aria-label="Why am I seeing this ad?"
              >
                <Info className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <WhyThisAdModal />
          </Dialog>
        </div>
      </div>
    </motion.section>
  );
};

export default BlackVaultAdBlock;