import React from 'react';
import { motion } from 'framer-motion';

const JSONViewer = ({ data }) => {
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <span className="text-slate-500">
          [ {value.map((v, i) => (
            <span key={i}>
              <span className="text-white opacity-80">"{v}"</span>
              {i < value.length - 1 && <span className="text-slate-700">, </span>}
            </span>
          ))} ]
        </span>
      );
    }
    if (typeof value === 'boolean') {
      return <span className="text-slate-300 font-bold italic">{value.toString()}</span>;
    }
    return <span className="text-slate-300 font-light italic">"{value}"</span>;
  };

  return (
    <div className="terminal-window p-10 font-mono text-[13px] leading-8 glass-panel rounded-3xl">
      <div className="text-slate-600 mb-2 tracking-tighter">{'{'}</div>
      {Object.entries(data).map(([key, value], index) => (
        <motion.div 
          key={key}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, ease: "circOut" }}
          className="ml-8 border-l-[0.5px] border-white/[0.03] pl-6 hover:border-white/10 transition-colors"
        >
          <span className="text-white font-bold opacity-40">"{key}"</span>
          <span className="text-slate-700 mx-2">→</span>
          {renderValue(value)}
          {index < Object.entries(data).length - 1 && <span className="text-slate-800">,</span>}
        </motion.div>
      ))}
      <div className="text-slate-600 mt-2 tracking-tighter">{'}'}</div>
    </div>
  );
};

export default JSONViewer;
