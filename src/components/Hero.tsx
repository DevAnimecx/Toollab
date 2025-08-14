import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { ArrowRight } from 'lucide-react';

const words = [
  'convert', 'edit', 'compress', 'optimize', 'generate', 
  'protect', 'enhance', 'share', 'create', 'scan'
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-center py-20 md:py-32">
      <h1 className="text-5xl md:text-7xl font-extrabold font-heading bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground/80 leading-tight">
        The fastest way to{' '}
        <span className="relative inline-block h-[1.2em] w-[240px] md:w-[320px] align-bottom">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 text-primary capitalize"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
        70+ premium tools in one place — free, fast, and easy to use.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href="#tool-showcase">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
          <a href="#categories">Explore Categories</a>
        </Button>
      </div>
      <div className="mt-12 mx-auto w-full max-w-lg">
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;