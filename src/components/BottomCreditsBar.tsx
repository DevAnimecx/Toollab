import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

const credits = [
  "An Animecx Creation",
  "A Toollab Product",
  "Made By NexoBytes Development",
  "Powered By OpenBytes Technology",
];

const FullCredits = () => (
  <div className="flex flex-col items-center gap-1 text-center">
    <p className="font-semibold">An Animecx Creation</p>
    <p className="text-xs text-muted-foreground">Made By NexoBytes Development</p>
    <p className="text-xs text-muted-foreground">Powered By OpenBytes Technology</p>
    <div className="text-xs text-muted-foreground mt-2">
      <span>© {new Date().getFullYear()} Toollab</span>
      <span className="mx-2">|</span>
      <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
      <span className="mx-2">|</span>
      <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms</Link>
    </div>
  </div>
);

export const BottomCreditsBar = () => {
  const isMobile = useIsMobile();
  const [currentCreditIndex, setCurrentCreditIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCreditIndex((prevIndex) => (prevIndex + 1) % credits.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(timer);
  }, []);

  if (isMobile) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="fixed bottom-4 right-4 z-50">
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="end" className="max-w-xs text-center p-3">
            <FullCredits />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-xs text-muted-foreground rounded-full px-4 py-2
                            bg-background/50 backdrop-blur-xl border border-white/10 shadow-lg
                            cursor-pointer hover:border-white/20 transition-colors">
              <div className="w-48 text-center overflow-hidden">
                <span
                  key={currentCreditIndex}
                  className="inline-block animate-fade-in"
                >
                  {credits[currentCreditIndex]}
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="start" className="p-3">
            <FullCredits />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};