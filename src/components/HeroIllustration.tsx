import { motion, Variants } from 'framer-motion';
import { Code, FileText, Image, Palette, Shield } from 'lucide-react';

const iconVariants: Variants = {
  float: (i: number) => ({
    y: [0, -5 + i * 1.5, 0],
    transition: {
      duration: 4 + i * 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

const icons = [
  { icon: Code, className: 'top-10 left-20 text-blue-400', custom: 1 },
  { icon: FileText, className: 'top-40 left-5 text-green-400', custom: 2 },
  { icon: Image, className: 'top-20 right-10 text-purple-400', custom: 3 },
  { icon: Palette, className: 'bottom-20 left-10 text-pink-400', custom: 4 },
  { icon: Shield, className: 'bottom-10 right-20 text-yellow-400', custom: 5 },
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full h-full">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.className}`}
          variants={iconVariants}
          custom={item.custom}
          animate="float"
        >
          <item.icon className="w-10 h-10 md:w-14 md:h-14 opacity-20" />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent md:bg-gradient-to-r md:from-background md:via-background/50 md:to-transparent" />
    </div>
  );
};

export default HeroIllustration;