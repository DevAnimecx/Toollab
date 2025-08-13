import ToollabLogo from '@/components/ui/ToollabLogo';

const CinematicLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl">
      <div className="animate-fade-in">
        <ToollabLogo className="h-16 w-auto animate-light-sweep" />
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden">
        <div className="h-full w-full animate-progress-bar bg-gradient-to-r from-primary to-accent-text"></div>
      </div>
    </div>
  );
};

export default CinematicLoader;