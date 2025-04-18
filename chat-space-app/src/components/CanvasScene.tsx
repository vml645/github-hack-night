"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Planet component: orbits around center at given distance and speed
function Planet({ distance, size, color, speed }: { distance: number; size: number; color: string; speed: number }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * speed
  })
  return (
    <group ref={ref}>
      <mesh position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
      </mesh>
    </group>
  )
}

// Orbit path: thin ring on the xz-plane
function Orbit({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="white" side={THREE.DoubleSide} transparent opacity={0.3} />
    </mesh>
  )
}

// SolarSystem: sun at center and orbiting planets
function SolarSystem() {
  return (
    <group>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial emissive="yellow" emissiveIntensity={1} color="orange" />
      </mesh>
      {/* Orbits */}
      <Orbit radius={4} />
      <Orbit radius={6} />
      <Orbit radius={8} />
      <Orbit radius={10} />
      {/* Planets: Mercury, Venus, Earth, Mars */}
      <Planet distance={4} size={0.3} color="#888" speed={0.8} />
      <Planet distance={6} size={0.5} color="#db9b1a" speed={0.6} />
      <Planet distance={8} size={0.6} color="#2a6fdb" speed={0.4} />
      <Planet distance={10} size={0.4} color="#db3b1a" speed={0.3} />
    </group>
  )
}

export default function CanvasScene() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 5, 20], fov: 50 }}>
      {/* Night sky background */}
      <color attach="background" args={["#000018"]} />
      <ambientLight intensity={0.05} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#aabbff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <SolarSystem />
      <OrbitControls makeDefault enableZoom enablePan enableRotate enableDamping dampingFactor={0.1} />
    </Canvas>
  )
}
