import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("text-[rgba(255,255,255,0.95)] text-2xl tracking-wider relative font-heading", className)}>
      <span className="font-extrabold">TOOLLAB</span>
      <div className="absolute bottom-[-4px] left-0 h-[2px] w-full bg-primary/80 animate-slide-in-underline" />
    </div>
  );
};

export default Logo;