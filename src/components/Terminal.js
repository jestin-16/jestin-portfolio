import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ commands = [], prompt = "jestin@portfolio:~$" }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex < commands.length) {
      const command = commands[currentLineIndex];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < command.input.length) {
          setCurrentText(prev => prev + command.input.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setDisplayedLines(prev => [...prev, { type: 'input', text: command.input }, { type: 'output', text: command.output }]);
            setCurrentText("");
            setCurrentLineIndex(prev => prev + 1);
          }, 600);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    } else {
      setIsTyping(false);
    }
  }, [currentLineIndex, commands]);

  return (
    <div className="terminal-window w-full h-full flex flex-col font-mono text-xs shadow-2xl glass-panel">
      {/* OS Chrome - Minimalist Silver */}
      <div className="bg-white/[0.03] border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
        <div className="flex space-x-1.5 focus-within:opacity-100 opacity-60 transition-opacity">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/5" />
        </div>
        <div className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-medium">stellar_core // bash v5.2</div>
        <div className="w-12" />
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar font-mono">
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-3">
            {line.type === 'input' ? (
              <div className="flex space-x-2">
                <span className="text-white font-bold opacity-30">{prompt}</span>
                <span className="text-slate-200 tracking-tight">{line.text}</span>
              </div>
            ) : (
              <div className="text-slate-400 leading-relaxed pl-4 border-l border-white/[0.05] mt-1 text-[13px] font-light">
                {line.text}
              </div>
            )}
          </div>
        ))}
        
        {(isTyping || !isTyping) && (
          <div className="flex space-x-2">
            <span className="text-white font-bold opacity-30">{prompt}</span>
            <span className="text-slate-200">{currentText}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-1.5 h-4 bg-white/40 shadow-[0_0_8px_white] inline-block self-center ml-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
