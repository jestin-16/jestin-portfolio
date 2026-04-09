import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, .interactive');
      if (isInteractive) {
        setIsHovered(true);
        if (target.getAttribute('data-cursor-text')) {
          setCursorText(target.getAttribute('data-cursor-text'));
        }
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
      setCursorText("");
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-brand-primary mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovered ? 3.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {cursorText && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[4px] uppercase font-black text-brand-void tracking-tighter"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-primary pointer-events-none z-[10000]"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          x: "-50%",
          y: "-50%",
        }}
      />
    </>
  );
};

export default CustomCursor;
