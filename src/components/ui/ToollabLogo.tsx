import React from 'react';
import { cn } from '@/lib/utils';

interface ToollabLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ToollabLogo = ({ className, ...props }: ToollabLogoProps) => {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      className={cn('font-heading', className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4DA8DA" />
          <stop offset="100%" stopColor="#48E6B0" />
        </linearGradient>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id="light-sweep-mask">
          <rect width="100%" height="100%" fill="white" />
        </mask>
        <linearGradient id="light-sweep-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0.5" />
            <stop offset="55%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Glass "T" Icon */}
      <g transform="translate(5, 5)">
        <path d="M0 0 H24 V5 H14 V24 H9 V5 H0 Z" fill="url(#logo-gradient)" opacity="0.2" />
        <path d="M0 0 H24 V5 H14 V24 H9 V5 H0 Z" stroke="url(#logo-gradient)" strokeWidth="0.5" fill="none" />
      </g>

      {/* Text */}
      <text
        x="38"
        y="26"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="18"
        fontWeight="bold"
        letterSpacing="1"
        fill="white"
        style={{ filter: 'url(#logo-glow)' }}
      >
        Toollab
      </text>

      {/* Light Sweep Animation */}
      <rect 
        x="0" y="0" width="100%" height="100%" 
        fill="url(#light-sweep-gradient)"
        style={{ transform: 'translateX(var(--sweep-percent, -100%))' }}
      />
    </svg>
  );
};

export default ToollabLogo;