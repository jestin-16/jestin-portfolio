import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillEditor = ({ skills }) => {
  const [activeTab, setActiveTab] = useState(0);

  const ProgressBar = ({ progress }) => (
    <div className="flex items-center space-x-3">
      <div className="text-slate-300 font-mono text-[11px] font-bold">{"["}</div>
      <div className="flex-1 h-[3px] bg-slate-100 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="bg-blue-600 h-full shadow-[0_0_15px_rgba(37,99,235,0.3)]"
        />
      </div>
      <div className="text-slate-300 font-mono text-[11px] font-bold">{"]"}</div>
      <div className="text-slate-400 font-mono text-[10px] w-8 text-right font-bold">{progress}%</div>
    </div>
  );

  return (
    <div className="terminal-window h-[480px] flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
      {/* Editor Tabs - Minimalist Light */}
      <div className="flex bg-slate-50/50 border-b border-slate-100 p-3 gap-2">
        {skills.map((group, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-2.5 text-[11px] font-mono transition-all duration-500 rounded-xl tracking-widest uppercase font-black ${
              activeTab === i ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {group.filename}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-10 font-mono text-sm overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="space-y-10"
          >
            {skills[activeTab].items.map((skill, j) => (
              <div key={j} className="space-y-4">
                <div className="flex items-center flex-wrap gap-2 text-[12px] tracking-tight">
                  <span className="text-blue-600 font-bold opacity-60">@Component</span>
                  <span className="text-slate-300">(</span>
                  <span className="text-slate-400 italic">level=</span>
                  <span className="text-slate-900 font-bold">"{skill.level}"</span>
                  <span className="text-slate-300">)</span>
                  <span className="text-slate-500 italic">Class</span>
                  <span className="text-slate-950 font-black">{skill.name}</span>
                  <span className="text-slate-300">{"{"}</span>
                  <span className="text-slate-400 tracking-tighter ml-1">v{skill.version}</span>
                  <span className="text-slate-300">{"}"}</span>
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
