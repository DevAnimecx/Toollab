import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative p-6 rounded-xl h-full overflow-hidden bg-[rgba(15,25,45,0.45)] backdrop-blur-xl border border-[rgba(255,255,255,0.15)]">
      <div className="animate-pulse flex flex-col h-full items-center text-center">
        <div className="w-12 h-12 bg-white/10 rounded-lg mb-4"></div>
        <div className="w-3/4 h-6 bg-white/10 rounded-md mb-2"></div>
        <div className="w-full h-4 bg-white/10 rounded-md mb-1"></div>
        <div className="w-5/6 h-4 bg-white/10 rounded-md mb-4"></div>
        <div className="w-1/3 h-6 bg-white/10 rounded-full mt-auto"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;