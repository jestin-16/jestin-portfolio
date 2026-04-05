import React from 'react';
import { motion } from 'framer-motion';

const StatusBar = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 h-8 flex items-center justify-between text-[8px] font-mono select-none tracking-[0.4em] uppercase font-black text-white/40">
      <div className="flex items-center space-x-12 h-full">
        <div className="flex items-center space-x-3 hover:text-brand-accent cursor-pointer transition-colors group">
          <span className="w-1 h-1 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(227,0,15,0.6)] animate-pulse" />
          <span>PRODUCTION_2.1</span>
        </div>
        <div className="hidden lg:flex items-center space-x-3 hover:text-white transition-colors border-l border-white/10 pl-12">
          <span>ROLE: ARCHITECT</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 opacity-20 font-medium">
          <span>LAT: 10.85°</span>
          <span>LONG: 76.27°</span>
        </div>
      </div>

      <div className="flex items-center space-x-12 h-full">
        <div className="flex items-center space-x-3 text-brand-accent font-black">
          <span className="w-1 h-[6px] bg-brand-accent" />
          <span>STABLE_REACH</span>
        </div>
        <div className="flex items-center space-x-6 opacity-30 font-medium hidden md:flex">
          <span>V1.0.4</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>KERALA_IN</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
