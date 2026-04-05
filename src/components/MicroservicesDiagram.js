import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Node = ({ position, label, color = "#0A0A0A" }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            speed={1}
            distort={0.2}
            radius={0.5}
            transparent
            opacity={0.05}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#E3000F" />
        </mesh>
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.25}
          color="#1C1C1C"
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
          font="https://fonts.gstatic.com/s/playfairdisplay/v37/6nuV7S-Zno9J96O1_G-6_76S7V-G_mSZZ-G__r0.woff"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const Connection = ({ start, end, color = "#0A0A0A" }) => {
  const linePoints = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const packetRef = useRef();

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.getElapsedTime() * 0.3) % 1;
      packetRef.current.position.lerpVectors(linePoints[0], linePoints[1], t);
    }
  });

  return (
    <group>
      <Line
        points={linePoints}
        color={color}
        lineWidth={0.5}
        transparent
        opacity={0.1}
      />
      <Sphere ref={packetRef} args={[0.04, 16, 16]}>
        <meshBasicMaterial color="#E3000F" transparent opacity={0.6} />
      </Sphere>
    </group>
  );
};

const MicroservicesDiagram = () => {
  const nodes = [
    { id: 'gateway', label: 'API Gateway', pos: [0, 2.2, 0], color: '#0A0A0A' },
    { id: 'auth', label: 'Auth Service', pos: [-2.2, 0, 0], color: '#1C1C1C' },
    { id: 'users', label: 'User Service', pos: [2.2, 0, 0], color: '#1C1C1C' },
    { id: 'db', label: 'PostgreSQL', pos: [0, -2.2, 0], color: '#0A0A0A' },
  ];

  const connections = [
    { start: nodes[0].pos, end: nodes[1].pos },
    { start: nodes[0].pos, end: nodes[2].pos },
    { start: nodes[1].pos, end: nodes[3].pos },
    { start: nodes[2].pos, end: nodes[3].pos },
  ];

  return (
    <group rotation={[0, Math.PI / 8, 0]} scale={1.2}>
      {nodes.map((node) => (
        <Node key={node.id} position={node.pos} label={node.label} color={node.color} />
      ))}
      {connections.map((conn, i) => (
        <Connection key={i} start={conn.start} end={conn.end} />
      ))}
    </group>
  );
};

export default MicroservicesDiagram;
