import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei'
import { useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ErrorBoundary } from './ErrorBoundary'

// Animated 3D Sphere
function AnimatedSphere({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 64]}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

// Floating 3D Box
function FloatingBox({ position, color, rotationSpeed = 1 }: { position: [number, number, number], color: string, rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * rotationSpeed
      meshRef.current.rotation.y += 0.01 * rotationSpeed
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * rotationSpeed) * 0.2
    }
  })

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Box>
  )
}

// 3D Torus Ring
function AnimatedTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <Torus ref={meshRef} args={[1, 0.3, 16, 100]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Torus>
  )
}

// Main 3D Scene Component
interface ThreeDSceneProps {
  className?: string
  showControls?: boolean
  cameraPosition?: [number, number, number]
  intensity?: number
}

export default function ThreeDScene({
  className = '',
  showControls = false,
  cameraPosition = [0, 0, 5],
  intensity = 0.5,
}: ThreeDSceneProps) {
  return (
    <ErrorBoundary>
      <motion.div
        className={`absolute inset-0 w-full h-full ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Suspense fallback={<div className="w-full h-full" />}>
          <Canvas
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
          >
            <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />
            <ambientLight intensity={intensity} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[0, 10, 0]} intensity={0.8} color="#06b6d4" />

            <AnimatedSphere position={[-2, 0, 0]} color="#06b6d4" speed={1.2} />
            <AnimatedSphere position={[2, 0, 0]} color="#8b5cf6" speed={0.8} />
            <FloatingBox position={[0, -1.5, 0]} color="#ec4899" rotationSpeed={1.5} />
            <AnimatedTorus position={[0, 1.5, 0]} color="#06b6d4" />

            {showControls && <OrbitControls enableZoom={false} enablePan={false} />}
            <Environment preset="night" />
          </Canvas>
        </Suspense>
      </motion.div>
    </ErrorBoundary>
  )
}

