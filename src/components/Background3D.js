import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedGradientSphere = () => {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[3, 100, 100]} scale={2.5} position={[0, 0, -5]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        transparent={true}
        opacity={0.15}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
};

const SecondarySphere = () => {
    const sphereRef = useRef();
  
    useFrame(({ clock }) => {
      if (sphereRef.current) {
        sphereRef.current.rotation.x = -clock.getElapsedTime() * 0.03;
        sphereRef.current.rotation.y = -clock.getElapsedTime() * 0.05;
      }
    });
  
    return (
      <Sphere ref={sphereRef} args={[2.5, 64, 64]} scale={3} position={[-4, -2, -8]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          transparent={true}
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    );
  };

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-brand-dark">
      {/* CSS base noise for texture */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay bg-noise"></div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Performance scaling
        className="absolute inset-0 z-0"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#e0e7ff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#8b5cf6" />
        
        {/* Subtle animated stars / dust particles */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedGradientSphere />
        <SecondarySphere />
      </Canvas>
    </div>
  );
};

export default Background3D;
