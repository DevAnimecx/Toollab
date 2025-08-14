import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const IndependenceDayPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('independence-popup-seen-2024');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsVisible(true), 500); // Delay for effect
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('independence-popup-seen-2024', 'true');
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleClose, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative p-8 rounded-2xl w-full max-w-lg text-center text-white
                       bg-gradient-to-br from-saffron/20 via-white/10 to-india-green/20
                       backdrop-blur-xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-4xl font-bold mb-4">Happy Independence Day 🇮🇳</h2>
            <p className="text-white/80 mb-8">
              Celebrating the spirit of freedom with you. Toollab wishes you a proud and joyful 15th August.
            </p>
            <Button onClick={handleClose} size="lg" className="bg-white/90 text-black hover:bg-white">
              Continue to Toollab
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};