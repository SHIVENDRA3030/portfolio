import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function FloatingShape({ position, geometry, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.008 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  const pointsRef = useRef()

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

function Scene() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const scrollY = window.scrollY
    const targetY = scrollY * 0.01
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[0, 10, -10]} intensity={0.8} color="#ffe66d" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />

      <FloatingShape
        position={[-3, 2, -5]}
        geometry={<icosahedronGeometry args={[1, 0]} />}
        color="#ff6b6b"
        speed={1.2}
      />
      
      <FloatingShape
        position={[3, -1, -6]}
        geometry={<torusGeometry args={[1, 0.4, 16, 32]} />}
        color="#4ecdc4"
        speed={0.8}
      />
      
      <FloatingShape
        position={[-2, -3, -4]}
        geometry={<octahedronGeometry args={[1, 0]} />}
        color="#ffe66d"
        speed={1.5}
      />
      
      <FloatingShape
        position={[4, 3, -7]}
        geometry={<sphereGeometry args={[1, 32, 32]} />}
        color="#a8e6cf"
        speed={0.6}
      />
      
      <FloatingShape
        position={[0, 0, -8]}
        geometry={<boxGeometry args={[1.5, 1.5, 1.5]} />}
        color="#ffd3b6"
        speed={1}
      />
    </>
  )
}

export default function Scene3D() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
