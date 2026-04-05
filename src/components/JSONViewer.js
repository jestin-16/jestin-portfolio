import React from 'react';
import { motion } from 'framer-motion';

const JSONViewer = ({ data }) => {
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <span className="text-brand-muted">
          [ {value.map((v, i) => (
            <span key={i}>
              <span className="text-brand-accent font-black tracking-tight">"{v}"</span>
              {i < value.length - 1 && <span className="text-brand-border">, </span>}
            </span>
          ))} ]
        </span>
      );
    }
    if (typeof value === 'boolean') {
      return <span className="text-brand-accent font-black italic underline decoration-brand-accent/20">{value.toString()}</span>;
    }
    return <span className="text-brand-primary font-medium italic opacity-70">"{value}"</span>;
  };

  return (
    <div className="p-12 font-mono text-[13px] leading-8 bg-white border border-brand-border rounded-lg transition-all duration-700">
      <div className="text-brand-border mb-4 tracking-tighter opacity-60">{"// static_context_initialize"}</div>
      <div className="text-brand-accent font-black mb-2 opacity-50 underline decoration-brand-accent/10 whitespace-nowrap">@Data_Model_V1</div>
      
      <div className="text-brand-primary/20 mb-2 tracking-tighter">{'{'}</div>
      {Object.entries(data).map(([key, value], index) => (
        <motion.div 
          key={key}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, ease: "circOut" }}
          className="ml-8 border-l border-brand-border/40 pl-8 hover:border-brand-accent/30 transition-colors"
        >
          <span className="text-brand-primary font-black uppercase tracking-tighter">"{key}"</span>
          <span className="text-brand-accent font-black mx-4">:</span>
          {renderValue(value)}
          {index < Object.entries(data).length - 1 && <span className="text-brand-border ml-1">,</span>}
        </motion.div>
      ))}
      <div className="text-brand-primary/20 mt-2 tracking-tighter">{'}'}</div>
      
      <div className="mt-8 pt-6 border-t border-brand-border/30 flex justify-between items-center opacity-40">
         <span className="text-[9px] font-black uppercase tracking-[0.4em]">system: ready</span>
         <span className="text-[9px] font-black uppercase tracking-[0.4em]">verified: stable</span>
      </div>
    </div>
  );
};

export default JSONViewer;
