import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Check, Loader2, ShieldCheck, X } from 'lucide-react';
import { useHumanCheck } from '@/hooks/useHumanCheck';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const BotCheck = () => {
  const { isVerified, isVerifying, error, handleMouseMove, verify, reset, clearPath } = useHumanCheck();

  const handleClick = () => {
    if (isVerified || isVerifying) return;
    verify();
  };

  const boxVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    error: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 },
    },
  };

  const checkVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  return (
    <TooltipProvider>
      <Tooltip open={!!error}>
        <TooltipTrigger asChild>
          <motion.div
            className="w-full p-4 rounded-lg bg-black/20 backdrop-blur-lg border border-white/10"
            onMouseMove={handleMouseMove}
            onMouseLeave={clearPath}
          >
            <motion.div
              variants={boxVariants}
              initial="initial"
              whileHover={!isVerified && !isVerifying ? 'hover' : 'initial'}
              animate={error ? 'error' : 'initial'}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  onClick={handleClick}
                  className={cn(
                    'h-8 w-8 rounded-md border-2 flex items-center justify-center transition-all duration-300 cursor-pointer',
                    isVerified ? 'bg-primary border-primary' : 'border-white/30 hover:border-primary'
                  )}
                >
                  <AnimatePresence>
                    {isVerifying && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                    {isVerified && (
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <motion.path variants={checkVariants} initial="hidden" animate="visible" d="M20 6 9 17l-5-5" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </div>
                <span className="font-heading text-lg text-white/90">I am not a robot</span>
              </div>
              {isVerified && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs text-green-400"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Toollab Verified</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-destructive text-destructive-foreground">
          <p>{error}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};