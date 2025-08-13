import { Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

const CreditsContent = () => (
  <div className="flex flex-col items-center gap-1">
    <span className="font-medium">An Animecx Creation — Made By NexoBytes Development — Powered By OpenBytes Technology</span>
    <div className="text-xs text-muted-foreground">
      <span>© {new Date().getFullYear()} Toollab</span>
      <span className="mx-2">|</span>
      <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
      <span className="mx-2">|</span>
      <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
    </div>
  </div>
);

export const BottomCreditsBar = () => {
  const isMobile = useIsMobile();

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
          <TooltipContent side="left" className="max-w-xs text-center p-3">
            <CreditsContent />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="text-center text-sm text-foreground rounded-full px-6 py-2
                      bg-background/50 backdrop-blur-xl border border-white/10 shadow-lg
                      animate-fade-in-scale">
        <CreditsContent />
      </div>
    </div>
  );
};