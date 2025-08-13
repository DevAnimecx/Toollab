import React, { useState, useEffect } from 'react';
import { ads as initialAds, Ad } from '@/data/ads';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const BlackVaultAdBlock = () => {
  const [ads] = useState<Ad[]>(() => initialAds.filter(ad => ad.status === 'active'));
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

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
    <section className="py-16">
      <div className="relative w-full h-[180px] md:h-[210px] overflow-hidden">
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
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url(${currentAd.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            
            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white container mx-auto">
              <motion.h2 
                className="font-heading text-3xl md:text-5xl font-bold text-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              >
                {currentAd.headline}
              </motion.h2>
              <motion.p 
                className="font-body text-md md:text-lg text-white/80 mt-2 max-w-xl"
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
      </div>
    </section>
  );
};

export default BlackVaultAdBlock;