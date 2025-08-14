import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Code, FileText, Image, Palette, Shield, QrCode, Lock, Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { icon: Code, color: 'text-blue-400' },
  { icon: FileText, color: 'text-green-400' },
  { icon: Image, color: 'text-purple-400' },
  { icon: Palette, color: 'text-pink-400' },
  { icon: Shield, color: 'text-yellow-400' },
  { icon: QrCode, color: 'text-teal-400' },
  { icon: Lock, color: 'text-red-400' },
  { icon: Ruler, color: 'text-orange-400' },
];

const InteractiveToolGrid = () => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.1}
      scale={1.05}
      className="w-full h-full"
    >
      <div className="relative w-full h-full p-8 rounded-3xl bg-black/10 backdrop-blur-sm border border-white/10">
        <div className="grid grid-cols-4 gap-4">
          {icons.slice(0, 4).map((item, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-xl bg-white/5 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <item.icon className={cn('w-8 h-8', item.color)} />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4 -ml-8">
           {icons.slice(4).map((item, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-xl bg-white/5 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <item.icon className={cn('w-8 h-8', item.color)} />
            </motion.div>
          ))}
        </div>
      </div>
    </Tilt>
  );
};

const HeroIllustration = () => {
  return <InteractiveToolGrid />;
};


export default HeroIllustration;