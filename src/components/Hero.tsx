import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroIllustration from './HeroIllustration';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden text-center py-20 md:py-32">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/20 bg-primary/10 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold">70+ Premium Tools — Free Forever</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold font-heading leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          All Your Daily Internet Tools,
          <br />
          in One Place.
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          From PDF to Image, AI to SEO — Toollab has it all, free forever.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#tool-showcase">
              Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div 
          className="mt-12 mx-auto w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <SearchBar />
        </motion.div>
      </div>

      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] -z-10 opacity-10 blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
      >
        <HeroIllustration />
      </motion.div>
    </section>
  );
};

export default Hero;