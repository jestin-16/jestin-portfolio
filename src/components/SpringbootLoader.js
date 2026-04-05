import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const startupLines = [
  { text: "  .   ____          _            __ _ _", color: "text-blue-600 font-black" },
  { text: " /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\\\ \\\\ \\\\ \\\\", color: "text-blue-600" },
  { text: "( ( )\\___ | '_ | '_| | '_ \\/ _` | \\\\ \\\\ \\\\ \\\\", color: "text-blue-600" },
  { text: " \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )", color: "text-blue-600" },
  { text: "  '  |____| .__|_| |_|_| |_\\__, | / / / /", color: "text-blue-600" },
  { text: " =========|_|==============|___/=/_/_/_/", color: "text-slate-400" },
  { text: " :: Spring Boot ::               (v3.2.0)", color: "text-slate-900 font-bold" },
  { text: "", color: "" },
  { text: "2026-04-05 17:30:29.530 INFO 1234 --- [main] c.j.p.PortfolioApplication : Starting PortfolioApplication v1.0.0", color: "text-slate-400 font-medium" },
  { text: "2026-04-05 17:30:29.535 INFO 1234 --- [main] c.j.p.PortfolioApplication : No active profile set, falling back to default profiles: prod", color: "text-slate-400 font-medium" },
  { text: "2026-04-05 17:30:30.120 INFO 1234 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 3000 (http)", color: "text-slate-400 font-medium" },
  { text: "2026-04-05 17:30:30.125 INFO 1234 --- [main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]", color: "text-slate-400 font-medium" },
  { text: "2026-04-05 17:30:30.125 INFO 1234 --- [main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/10.1.16]", color: "text-slate-400 font-medium" },
  { text: "2026-04-05 17:30:30.250 INFO 1234 --- [main] o.s.b.w.servlet.context.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 720 ms", color: "text-slate-400 font-medium" },
  { text: "2026-04-05 17:30:30.850 INFO 1234 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 3000 (http) with context path ''", color: "text-blue-600 font-bold" },
  { text: "2026-04-05 17:30:30.860 INFO 1234 --- [main] c.j.p.PortfolioApplication : Started PortfolioApplication in 1.33 seconds (process running for 1.8)", color: "text-slate-900 font-black" },
  { text: "2026-04-05 17:30:30.865 INFO 1234 --- [main] c.j.p.PortfolioApplication : Environment Ready. Connection established.", color: "text-slate-950 font-black" },
];

const SpringbootLoader = ({ onLoadingComplete }) => {
  const [logs, setLogs] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogs(prev => {
        if (prev.length < startupLines.length) {
          return [...prev, startupLines[prev.length]];
        }
        clearInterval(timer);
        return prev;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (logs.length === startupLines.length && !isFinished) {
      setTimeout(() => {
        setIsFinished(true);
        setTimeout(onLoadingComplete, 800);
      }, 500);
    }
  }, [logs.length, isFinished, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-brand-void flex flex-col items-center justify-center p-4 font-mono text-xs sm:text-sm"
        >
          <div className="max-w-3xl w-full">
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div key={index} className={`${log.color} whitespace-pre overflow-hidden`}>
                  {log.text}
                </div>
              ))}
              {!isFinished && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-slate-950 mt-1"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringbootLoader;
