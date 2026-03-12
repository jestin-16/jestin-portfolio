import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Node = ({ position, label, color = "#00ff88" }) => {
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
            emissive={color}
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const Connection = ({ start, end, color = "#00ff88" }) => {
  const linePoints = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const packetRef = useRef();

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * 0.5) % 1;
      packetRef.current.position.lerpVectors(linePoints[0], linePoints[1], t);
    }
  });

  return (
    <group>
      <Line
        points={linePoints}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.1}
      />
      <Sphere ref={packetRef} args={[0.05, 16, 16]}>
        <meshBasicMaterial color={color} />
      </Sphere>
    </group>
  );
};

const MicroservicesDiagram = () => {
  const nodes = [
    { id: 'gateway', label: 'API Gateway', pos: [0, 2, 0], color: '#00ff88' },
    { id: 'auth', label: 'Auth Service', pos: [-2, 0, 0], color: '#00d4ff' },
    { id: 'users', label: 'User Service', pos: [2, 0, 0], color: '#ffb700' },
    { id: 'db', label: 'PostgreSQL', pos: [0, -2, 0], color: '#ff4757' },
  ];

  const connections = [
    { start: nodes[0].pos, end: nodes[1].pos },
    { start: nodes[0].pos, end: nodes[2].pos },
    { start: nodes[1].pos, end: nodes[3].pos },
    { start: nodes[2].pos, end: nodes[3].pos },
  ];

  return (
    <group rotation={[0, Math.PI / 6, 0]}>
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
