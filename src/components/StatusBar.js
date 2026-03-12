import React from 'react';
import { motion } from 'framer-motion';

const StatusBar = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-0 left-0 right-0 h-6 bg-brand-surface border-t border-white/10 z-[60] flex items-center justify-between px-3 text-[10px] font-mono text-slate-400 select-none"
    >
      <div className="flex items-center space-x-4 h-full">
        <div className="flex items-center space-x-1 hover:text-brand-primary cursor-pointer transition-colors">
          <span className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_5px_rgba(0,255,136,0.5)]" />
          <span>Java 21</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-brand-primary cursor-pointer transition-colors">
          <span>MCA Student</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-brand-primary cursor-pointer transition-colors">
          <span>Kerala, India</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 h-full">
        <div className="flex items-center space-x-1 text-brand-primary">
          <span>Open to Work ✓</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBar;
