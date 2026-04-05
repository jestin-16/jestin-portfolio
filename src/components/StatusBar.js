import React from 'react';
import { motion } from 'framer-motion';

const StatusBar = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1, ease: "circOut" }}
      className="fixed bottom-0 left-0 right-0 h-7 bg-brand-void/80 backdrop-blur-xl border-t border-white/[0.03] z-[60] flex items-center justify-between px-6 text-[9px] font-mono text-slate-500 select-none tracking-widest uppercase font-bold"
    >
      <div className="flex items-center space-x-6 h-full">
        <div className="flex items-center space-x-2 hover:text-white cursor-pointer transition-colors group">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-20 shadow-[0_0_10px_white] group-hover:opacity-100 transition-opacity" />
          <span>RUNTIME: JAVA_21</span>
        </div>
        <div className="flex items-center space-x-2 hover:text-white cursor-pointer transition-colors">
          <span>MCA_GRADUATE // 2024</span>
        </div>
        <div className="flex items-center space-x-2 hover:text-white cursor-pointer transition-colors font-light">
          <span>LOCALIZATION: KERALA, IN</span>
        </div>
      </div>

      <div className="flex items-center space-x-6 h-full">
        <div className="flex items-center space-x-2 text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" />
          <span>STATUS: OPEN_FOR_INTERN</span>
        </div>
        <div className="flex items-center space-x-4 opacity-50">
          <span>ENC: UTF-8</span>
          <span>TAB_SIZE: 2</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBar;
