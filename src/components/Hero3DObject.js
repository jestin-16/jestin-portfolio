import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshTransmissionMaterial, Float, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Hero3DObject = () => {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      
      // Interactive rotation based on mouse position
      const targetRotationX = (state.mouse.y * Math.PI) / 6;
      const targetRotationY = (state.mouse.x * Math.PI) / 6;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    }
    
    if (wireframeRef.current) {
        wireframeRef.current.rotation.x = -t * 0.1;
        wireframeRef.current.rotation.y = -t * 0.15;
    }

    if (lightRef.current) {
        // Orbiting light for dynamic highlights
        lightRef.current.position.x = Math.sin(t) * 3;
        lightRef.current.position.y = Math.cos(t) * 3;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={10} color="#E3000F" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow />
      
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={2}
        floatingRange={[-0.3, 0.3]}
      >
        {/* Main refractive core */}
        <Icosahedron ref={meshRef} args={[1, 2]} scale={1.8}>
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={2.5}
            chromaticAberration={0.6}
            anisotropy={0.3}
            distortion={0.4}
            distortionScale={0.8}
            temporalDistortion={0.2}
            color="#ffffff"
            transmission={1}
            roughness={0.1}
            ior={1.5}
            resolution={1024}
          />
        </Icosahedron>

        {/* Outer architected wireframe */}
        <Icosahedron ref={wireframeRef} args={[1, 1]} scale={2.5}>
          <meshBasicMaterial 
            color="#E3000F" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </Icosahedron>

        {/* Small drifting particles */}
        {[...Array(3)].map((_, i) => (
           <Sphere key={i} args={[0.02, 16, 16]} position={[Math.sin(i) * 2, Math.cos(i) * 2, Math.tan(i) * 0.5]}>
              <meshBasicMaterial color="#E3000F" transparent opacity={0.5} />
           </Sphere>
        ))}
      </Float>
      
      <Environment preset="city" />
    </>
  );
};

export default Hero3DObject;

