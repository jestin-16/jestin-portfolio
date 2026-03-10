import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const Hero3DObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    // Subtle rotation independent of the Float component
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      // Interactive rotation based on mouse position
      const targetRotationX = (state.mouse.y * Math.PI) / 8;
      const targetRotationY = (state.mouse.x * Math.PI) / 8;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1.5} // Up/down float intensity
      floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within
    >
      <Icosahedron ref={meshRef} args={[1, 0]} scale={1.8}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={2}
          chromaticAberration={0.4}
          anisotropy={0.2}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#e0e7ff"
          resolution={1024}
        />
      </Icosahedron>
    </Float>
  );
};

export default Hero3DObject;
