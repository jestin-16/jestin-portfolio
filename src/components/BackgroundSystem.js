import React, { useEffect, useRef } from 'react';

const BackgroundSystem = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Update Colors for Light Mode
    const dotColor = 'rgba(15, 23, 42, 0.05)'; // Very faint Slate-900
    const activeDotColor = 'rgba(37, 99, 235, 0.2)'; // Blue-600 highlight
    const dotSpacing = 30;
    const dotSize = 1;

    const draw = () => {
      // Clear with Light Mode Background
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid of Dots
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          ctx.beginPath();
          if (dist < 150) {
            const opacity = 1 - (dist / 150);
            ctx.fillStyle = activeDotColor;
            ctx.arc(x, y, dotSize + (opacity * 1.5), 0, Math.PI * 2);
          } else {
            ctx.fillStyle = dotColor;
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-brand-void">
      {/* 1. Canvas for Stellar Grid */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 2. Soft Ambient Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
      
      {/* 3. Corner Brackets Decorations - Minimalist Silver */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-white/10" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-white/10" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-white/10" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-white/10" />
      
      {/* Background Gradients for Depth - Monochromatic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
    </div>
  );
};

export default BackgroundSystem;
