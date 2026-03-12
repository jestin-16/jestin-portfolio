import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpringbootLoader = ({ onLoadingComplete }) => {
  const [logs, setLogs] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const startupLines = [
    { text: "  .   ____          _            __ _ _", color: "text-brand-primary" },
    { text: " /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\\\ \\\\ \\\\ \\\\", color: "text-brand-primary" },
    { text: "( ( )\\___ | '_ | '_| | '_ \\/ _` | \\\\ \\\\ \\\\ \\\\", color: "text-brand-primary" },
    { text: " \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )", color: "text-brand-primary" },
    { text: "  '  |____| .__|_| |_|_| |_\\__, | / / / /", color: "text-brand-primary" },
    { text: " =========|_|==============|___/=/_/_/_/", color: "text-brand-primary" },
    { text: " :: Spring Boot ::                (v3.2.0)", color: "text-brand-primary" },
    { text: "", color: "" },
    { text: "2026-03-12 19:02:29.530 INFO 1234 --- [main] c.j.p.PortfolioApplication : Starting PortfolioApplication v1.0.0", color: "text-gray-400" },
    { text: "2026-03-12 19:02:29.535 INFO 1234 --- [main] c.j.p.PortfolioApplication : No active profile set, falling back to default profiles: default", color: "text-gray-400" },
    { text: "2026-03-12 19:02:30.120 INFO 1234 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 3000 (http)", color: "text-gray-400" },
    { text: "2026-03-12 19:02:30.125 INFO 1234 --- [main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]", color: "text-gray-400" },
    { text: "2026-03-12 19:02:30.125 INFO 1234 --- [main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/10.1.16]", color: "text-gray-400" },
    { text: "2026-03-12 19:02:30.250 INFO 1234 --- [main] o.s.b.w.servlet.context.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 720 ms", color: "text-gray-400" },
    { text: "2026-03-12 19:02:30.850 INFO 1234 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 3000 (http) with context path ''", color: "text-brand-secondary" },
    { text: "2026-03-12 19:02:30.860 INFO 1234 --- [main] c.j.p.PortfolioApplication : Started PortfolioApplication in 1.33 seconds (process running for 1.8)", color: "text-brand-primary" },
    { text: "2026-03-12 19:02:30.865 INFO 1234 --- [main] c.j.p.PortfolioApplication : Terminal Ready. Connection established.", color: "text-brand-primary" },
  ];

  useEffect(() => {
    let currentLine = 0;
    const timer = setInterval(() => {
      if (currentLine < startupLines.length) {
        setLogs(prev => [...prev, startupLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onLoadingComplete, 800);
        }, 500);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

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
                  className="w-2 h-4 bg-brand-primary mt-1"
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
