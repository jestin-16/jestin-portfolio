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
    <div className="terminal-window w-full h-full flex flex-col font-mono text-xs shadow-2xl glass-panel bg-white/80">
      {/* OS Chrome - Minimalist Light */}
      <div className="bg-slate-50/50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-200" />
          <div className="w-3 h-3 rounded-full bg-slate-200" />
          <div className="w-3 h-3 rounded-full bg-slate-200" />
        </div>
        <div className="text-[10px] text-slate-400 uppercase tracking-[0.25em] font-bold">session: local_terminal_v5</div>
        <div className="w-12" />
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-8 overflow-y-auto no-scrollbar font-mono">
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-4">
            {line.type === 'input' ? (
              <div className="flex space-x-3">
                <span className="text-blue-600 font-bold opacity-60">→</span>
                <span className="text-slate-900 font-bold tracking-tight">{line.text}</span>
              </div>
            ) : (
              <div className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-100 mt-2 text-[13px] font-medium italic opacity-80">
                {line.text}
              </div>
            )}
          </div>
        ))}
        
        {(isTyping || !isTyping) && (
          <div className="flex space-x-3">
            <span className="text-blue-600 font-bold opacity-60">→</span>
            <span className="text-slate-900 font-bold">{currentText}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-2 h-5 bg-slate-900/20 inline-block self-center ml-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
