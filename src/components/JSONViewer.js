import React from 'react';
import { motion } from 'framer-motion';

const JSONViewer = ({ data }) => {
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <span className="text-slate-400">
          [ {value.map((v, i) => (
            <span key={i}>
              <span className="text-blue-600 font-bold">"{v}"</span>
              {i < value.length - 1 && <span className="text-slate-300">, </span>}
            </span>
          ))} ]
        </span>
      );
    }
    if (typeof value === 'boolean') {
      return <span className="text-blue-500 font-black italic">{value.toString()}</span>;
    }
    return <span className="text-slate-600 font-medium italic">"{value}"</span>;
  };

  return (
    <div className="terminal-window p-10 font-mono text-[13px] leading-8 bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      <div className="text-slate-300 mb-2 tracking-tighter">{'{'}</div>
      {Object.entries(data).map(([key, value], index) => (
        <motion.div 
          key={key}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, ease: "circOut" }}
          className="ml-8 border-l-2 border-slate-50 pl-6 hover:border-blue-100 transition-colors"
        >
          <span className="text-slate-900 font-bold opacity-80">"{key}"</span>
          <span className="text-slate-300 mx-3">:</span>
          {renderValue(value)}
          {index < Object.entries(data).length - 1 && <span className="text-slate-200">,</span>}
        </motion.div>
      ))}
      <div className="text-slate-300 mt-2 tracking-tighter">{'}'}</div>
    </div>
  );
};

export default JSONViewer;
