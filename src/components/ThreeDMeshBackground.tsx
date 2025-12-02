import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ErrorBoundary } from './ErrorBoundary'

// 3D Mesh Geometry
function MeshGeometry({ mouse }: { mouse: { x: number, y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 1)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + mouse.y * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + mouse.x * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        wireframe
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

// Particle System
function Particles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = Math.cos((i / count) * Math.PI * 2) * factor
      const y = Math.sin((i / count) * Math.PI * 2) * factor
      const z = (Math.random() - 0.5) * 50
      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        let { factor, speed, x, y, z } = particle
        const t = particle.time + state.clock.elapsedTime * speed
        const nx = x + Math.cos(t) * factor
        const ny = y + Math.sin(t) * factor
        const nz = z + Math.cos(t) * factor * 0.5

        const matrix = new THREE.Matrix4()
        matrix.setPosition(nx, ny, nz)
        meshRef.current!.setMatrixAt(i, matrix)
      })
      meshRef.current!.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

interface ThreeDMeshBackgroundProps {
  className?: string
  mouse?: { x: number, y: number }
}

export default function ThreeDMeshBackground({
  className = '',
  mouse = { x: 0, y: 0 },
}: ThreeDMeshBackgroundProps) {
  return (
    <ErrorBoundary>
      <motion.div
        className={`absolute inset-0 w-full h-full ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Suspense fallback={<div className="w-full h-full" />}>
          <Canvas
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

            <MeshGeometry mouse={mouse} />
            <Particles count={150} />
          </Canvas>
        </Suspense>
      </motion.div>
    </ErrorBoundary>
  )
}

