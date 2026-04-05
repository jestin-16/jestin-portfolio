import React from 'react';
import { motion } from 'framer-motion';

const StatusBar = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1, ease: "circOut" }}
      className="fixed bottom-0 left-0 right-0 h-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-[60] flex items-center justify-between px-8 text-[9px] font-mono text-slate-400 select-none tracking-[0.2em] uppercase font-bold"
    >
      <div className="flex items-center space-x-8 h-full">
        <div className="flex items-center space-x-2.5 hover:text-slate-900 cursor-pointer transition-colors group">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-30 shadow-[0_0_10px_rgba(37,99,235,0.4)] group-hover:opacity-100 transition-opacity" />
          <span>ENV: PRODUCTION_21</span>
        </div>
        <div className="flex items-center space-x-2.5 hover:text-slate-900 cursor-pointer transition-colors border-l border-slate-100 pl-8">
          <span>ROLE: BACKEND_RESEARCHER</span>
        </div>
        <div className="flex items-center space-x-2.5 opacity-50 font-medium">
          <span>LAT: 10.8505° N</span>
          <span>LONG: 76.2711° E</span>
        </div>
      </div>

      <div className="flex items-center space-x-8 h-full">
        <div className="flex items-center space-x-2.5 text-blue-600 font-black">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)] animate-pulse" />
          <span>PORT_STATUS: Luminous_Active</span>
        </div>
        <div className="flex items-center space-x-4 opacity-30 font-medium hidden md:flex">
          <span>PROTO: HTTPS</span>
          <span>VER: 4.2.0-STABLE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBar;
