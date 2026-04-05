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
        color="#2563EB"
        attach="material"
        distort={0.45}
        speed={1.5}
        roughness={0.4}
        transparent={true}
        opacity={0.06}
        depthWrite={false}
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
          color="#94A3B8"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          transparent={true}
          opacity={0.05}
          depthWrite={false}
        />
      </Sphere>
    );
  };

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-brand-void">
      {/* CSS base noise for texture */}
      <div className="absolute inset-0 z-10 opacity-[0.03] mix-blend-multiply bg-noise"></div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="absolute inset-0 z-0"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#EFF6FF" />
        
        {/* Subtle animated particles - Dark for light mode */}
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedGradientSphere />
        <SecondarySphere />
      </Canvas>
    </div>
  );
};

export default Background3D;
