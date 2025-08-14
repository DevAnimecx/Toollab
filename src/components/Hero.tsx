import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroIllustration from './HeroIllustration';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 md:py-24">
        {/* Left Column: Text Content */}
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/20 bg-primary/10 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">70+ Premium Tools — Free Forever</span>
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold font-heading leading-tight">
            70+ Tools. One Premium Platform.
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
            From PDF to Image, AI to SEO — Toollab has it all, free forever.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#tool-showcase">
                Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="link" size="lg" className="text-foreground">
              <a href="#categories">View Categories</a>
            </Button>
          </div>

          <div className="mt-12 mx-auto md:mx-0 w-full max-w-lg">
            <SearchBar />
          </div>
        </motion.div>

        {/* Right Column: Illustration */}
        <motion.div 
          className="relative h-64 md:h-96 hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;