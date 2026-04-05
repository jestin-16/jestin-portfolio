import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillEditor = ({ skills }) => {
  const [activeTab, setActiveTab] = useState(0);

  const ProgressBar = ({ progress }) => (
    <div className="flex items-center space-x-6 w-full max-w-2xl">
      <div className="flex-1 h-[1.5px] bg-brand-border overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-brand-accent h-full"
        />
      </div>
      <div className="text-brand-muted font-mono text-[9px] w-12 text-right font-black uppercase tracking-widest">{progress}%</div>
    </div>
  );

  return (
    <div className="h-[550px] flex flex-col bg-white border border-brand-border rounded-lg overflow-hidden transition-all duration-700">
      {/* Editor Tabs - Editorial Minimalist */}
      <div className="flex bg-brand-surface border-b border-brand-border p-4 gap-4">
        {skills.map((group, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-8 py-3 text-[10px] font-mono transition-all duration-500 rounded-md tracking-[0.3em] uppercase font-black ${
              activeTab === i ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-brand-primary hover:bg-brand-border/30'
            }`}
          >
            {group.filename}
          </button>
        ))}
      </div>

      {/* Editor Content - Spec Sheet Spread */}
      <div className="flex-1 p-16 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="grid md:grid-cols-2 gap-x-20 gap-y-16"
          >
            {skills[activeTab].items.map((skill, j) => (
              <div key={j} className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-brand-accent text-[8px] font-black uppercase tracking-[0.3em]">0{j+1}.</span>
                    <h4 className="text-2xl font-serif font-black italic uppercase tracking-tight text-brand-primary">
                      {skill.name}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-[9px] font-mono font-black uppercase tracking-widest bg-brand-border/30 px-3 py-1 rounded-sm text-brand-muted italic">
                      Level: {skill.level}
                    </span>
                    <span className="text-[9px] font-mono font-black text-brand-accent uppercase tracking-widest px-1">
                      {skill.version}
                    </span>
                  </div>
                </div>
                <ProgressBar progress={skill.progress} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillEditor;
