import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("text-[rgba(255,255,255,0.85)] text-2xl tracking-wider relative font-sans", className)}>
      <span className="font-bold">TOOL</span>
      <span className="font-light">LAB</span>
      <div className="absolute bottom-[-4px] left-0 h-[2px] w-full bg-white animate-slide-in-underline" />
    </div>
  );
};

export default Logo;