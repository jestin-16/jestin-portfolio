import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Node = ({ position, label, color = "#2563EB" }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.3}
            radius={0.5}
            transparent
            opacity={0.15}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.25}
          color="#0F172A"
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const Connection = ({ start, end, color = "#2563EB" }) => {
  const linePoints = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const packetRef = useRef();

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * 0.4) % 1;
      packetRef.current.position.lerpVectors(linePoints[0], linePoints[1], t);
    }
  });

  return (
    <group>
      <Line
        points={linePoints}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.15}
      />
      <Sphere ref={packetRef} args={[0.06, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </Sphere>
    </group>
  );
};

const MicroservicesDiagram = () => {
  const nodes = [
    { id: 'gateway', label: 'API Gateway', pos: [0, 2.2, 0], color: '#2563EB' },
    { id: 'auth', label: 'Auth Service', pos: [-2.2, 0, 0], color: '#1E293B' },
    { id: 'users', label: 'User Service', pos: [2.2, 0, 0], color: '#334155' },
    { id: 'db', label: 'PostgreSQL', pos: [0, -2.2, 0], color: '#0F172A' },
  ];

  const connections = [
    { start: nodes[0].pos, end: nodes[1].pos },
    { start: nodes[0].pos, end: nodes[2].pos },
    { start: nodes[1].pos, end: nodes[3].pos },
    { start: nodes[2].pos, end: nodes[3].pos },
  ];

  return (
    <group rotation={[0, Math.PI / 10, 0]} scale={1.1}>
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
