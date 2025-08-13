import React from 'react';
import Logo from '@/components/Logo';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-xl animate-fade-out-slow">
      <div className="animate-fade-in-scale">
        <Logo />
      </div>
    </div>
  );
};

export default Loader;