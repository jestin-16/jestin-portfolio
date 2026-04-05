import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedGradientSphere = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      const t = state.clock.getElapsedTime();
      sphereRef.current.rotation.x = t * 0.05;
      sphereRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[3, 64, 64]} scale={2.5} position={[2, 0, -5]}>
      <MeshDistortMaterial
        color="#0A0A0A"
        attach="material"
        distort={0.3}
        speed={1}
        roughness={0.6}
        transparent={true}
        opacity={0.03}
        depthWrite={false}
      />
    </Sphere>
  );
};

const SecondarySphere = () => {
    const sphereRef = useRef();
  
    useFrame((state) => {
      if (sphereRef.current) {
        const t = state.clock.getElapsedTime();
        sphereRef.current.rotation.x = -t * 0.03;
        sphereRef.current.rotation.y = -t * 0.05;
      }
    });
  
    return (
      <Sphere ref={sphereRef} args={[2.5, 48, 48]} scale={3} position={[-5, -2, -8]}>
        <MeshDistortMaterial
          color="#E3000F"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.4}
          transparent={true}
          opacity={0.02}
          depthWrite={false}
        />
      </Sphere>
    );
  };

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-white">
      {/* CSS base noise for editorial texture */}
      <div className="absolute inset-0 z-10 opacity-[0.02] mix-blend-multiply bg-noise"></div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="absolute inset-0 z-0"
      >
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#E3000F" />
        
        {/* Subtle dot system instead of stars */}
        <Stars radius={100} depth={50} count={500} factor={2} saturation={0} fade speed={0.5} />
        
        <AnimatedGradientSphere />
        <SecondarySphere />
      </Canvas>
    </div>
  );
};

export default Background3D;
