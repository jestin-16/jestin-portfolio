import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Simple fallback particle sphere if text rendering is too complex for a fast load
const ParticleMesh = ({ onComplete }) => {
  const pointsRef = useRef();
  
  // Create chaotic random points
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        // Random sphere distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 5 + Math.random() * 2;
        
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        pos[i * 3 + 2] = r * Math.cos(phi); // z
    }
    return pos;
  }, [particleCount]);

  useEffect(() => {
    if (!pointsRef.current) return;
    
    // Simulate gathering effect into a tightly packed core (resembling a logo forming)
    const tl = gsap.timeline({
      onComplete: () => {
        // Hold for half a second then trigger complete
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }
    });

    tl.to(pointsRef.current.scale, {
      x: 0.1,
      y: 0.1,
      z: 0.1,
      duration: 1.5,
      ease: "power4.inOut"
    })
    .to(pointsRef.current.material, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "+=0.2");

  }, [onComplete]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.2;
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
        size={0.05}
        color="#8b5cf6" // brand-primary
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ParticleLoader = ({ onLoadingComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30 z-10 pointer-events-none"></div>
      
      {/* 3D Particle Assembly */}
      <div className="w-full h-2/3 absolute top-1/2 -translate-y-1/2 z-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <ParticleMesh onComplete={onLoadingComplete} />
        </Canvas>
      </div>

      {/* Futuristic text readout */}
      <div className="absolute bottom-20 z-30 font-mono text-sm tracking-[0.3em] text-brand-secondary opacity-60 animate-pulse">
        [ INITIALIZING WORKSPACE ]
      </div>
    </div>
  );
};

export default ParticleLoader;
