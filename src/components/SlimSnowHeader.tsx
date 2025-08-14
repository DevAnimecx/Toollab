import React from 'react';
import './SlimSnowHeader.css';

const SlimSnowHeader = () => {
  return (
    <div className="slim-snow-header">
      <div className="snow-layer layer1" />
      <div className="snow-layer layer2" />
      <div className="snow-layer layer3" />
      <div className="relative z-10 flex h-full items-center justify-center text-center text-sm text-foreground/80 px-4">
        <span className="font-heading font-bold tracking-wider">Toollab</span>
        <span className="mx-2 text-foreground/50 hidden sm:inline">:</span>
        <span className="hidden sm:inline">Developed by</span>
        <a href="#" className="mx-1 font-semibold text-foreground hover:text-primary transition-colors hover:text-glow">Animecx</a>
        <span className="mx-2 text-foreground/50 hidden sm:inline">—</span>
        <span className="hidden sm:inline">Free Forever</span>
      </div>
    </div>
  );
};

export default SlimSnowHeader;