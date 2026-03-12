import React from 'react';
import { motion } from 'framer-motion';

const JSONViewer = ({ data }) => {
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <span>
          [
          {value.map((v, i) => (
            <span key={i}>
              <span className="text-brand-secondary">"{v}"</span>
              {i < value.length - 1 && <span className="text-slate-400">, </span>}
            </span>
          ))}
          ]
        </span>
      );
    }
    if (typeof value === 'boolean') {
      return <span className="text-brand-warning">{value.toString()}</span>;
    }
    return <span className="text-brand-primary">"{value}"</span>;
  };

  return (
    <div className="terminal-window p-8 font-mono text-sm leading-relaxed">
      <div className="text-slate-400">{'{'}</div>
      {Object.entries(data).map(([key, value], index) => (
        <motion.div 
          key={key}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="ml-6"
        >
          <span className="text-brand-danger">"{key}"</span>
          <span className="text-slate-400">: </span>
          {renderValue(value)}
          {index < Object.entries(data).length - 1 && <span className="text-slate-400">,</span>}
        </motion.div>
      ))}
      <div className="text-slate-400">{'}'}</div>
    </div>
  );
};

export default JSONViewer;
