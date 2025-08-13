import React from 'react';

const GlassBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0B1E35] to-[#102B46]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px] animate-subtle-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] animate-subtle-pulse animation-delay-2000" />
    </div>
  );
};

export default GlassBackground;