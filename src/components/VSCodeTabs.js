import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, FileJson, Terminal, Package, Mail } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'jestin.java', icon: FileCode },
  { id: 'about', label: 'about.json', icon: FileJson },
  { id: 'skills', label: 'skills.sh', icon: Terminal },
  { id: 'projects', label: 'projects.yml', icon: Package },
  { id: 'contact', label: 'contact.http', icon: Mail },
];

const VSCodeTabs = ({ activeSection, onTabClick }) => {
  return (
    <div className="flex items-center bg-white/50 backdrop-blur-md border-b border-slate-100 px-3 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`flex items-center space-x-3 px-6 py-3.5 text-[11px] font-mono transition-all relative border-r border-slate-50 min-w-fit font-bold ${
              isActive 
                ? 'bg-white text-blue-600' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400 opacity-60'}`} />
            <span className="tracking-tighter">{tab.label}</span>
            {isActive && (
              <motion.div                 
                 layoutId="activeTabUnderline"
                 className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
               />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default VSCodeTabs;
