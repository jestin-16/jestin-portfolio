import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Simple fallback particle sphere if text rendering is too complex for a fast load
const ParticleMesh = ({ onComplete }) => {
  const pointsRef = useRef();
  
  // Create chaotic random points
  const particleCount = 2500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        // Random sphere distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 4 + Math.random() * 2;
        
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        pos[i * 3 + 2] = r * Math.cos(phi); // z
    }
    return pos;
  }, [particleCount]);

  useEffect(() => {
    if (!pointsRef.current) return;
    
    // Simulate gathering effect into a tightly packed core
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }
    });

    tl.to(pointsRef.current.scale, {
      x: 0.05,
      y: 0.05,
      z: 0.05,
      duration: 2,
      ease: "power4.inOut"
    })
    .to(pointsRef.current.material, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

  }, [onComplete]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      pointsRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#2563EB"
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

const ParticleLoader = ({ onLoadingComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-40 z-10 pointer-events-none"></div>
      
      {/* 3D Particle Assembly */}
      <div className="w-full h-full absolute inset-0 z-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <ParticleMesh onComplete={onLoadingComplete} />
        </Canvas>
      </div>

      {/* Futuristic text readout */}
      <div className="absolute bottom-24 z-30 font-mono text-[10px] tracking-[0.4em] text-slate-400 font-black uppercase opacity-60">
        Workspace // Initialization_Sequence_v4.2
      </div>
    </div>
  );
};

export default ParticleLoader;
