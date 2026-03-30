import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const mesh3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = -t * 0.3;
      mesh2Ref.current.rotation.z = t * 0.4;
      mesh2Ref.current.position.y = Math.cos(t * 0.7) * 0.4;
    }
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = t * 0.5;
      mesh3Ref.current.rotation.z = t * 0.2;
      mesh3Ref.current.position.x = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[3.5, 0.5, -2]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={mesh2Ref} position={[-3.5, -0.5, -3]}>
        <icosahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={mesh3Ref} position={[0, -2, -4]}>
        <torusGeometry args={[0.7, 0.2, 8, 24]} />
        <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.2} />
      </mesh>
    </>
  );
}

function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, alpha: true, failIfMajorPerformanceCaveat: false }}
      dpr={[1, 1.5]}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#a78bfa" />
      <Suspense fallback={null}>
        <ParticleField />
        <FloatingGeometry />
      </Suspense>
    </Canvas>
  );
}

function CSSFallbackBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating dots via CSS */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#a78bfa" : "#ffffff",
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function WebGLBackground() {
  return (
    <div className="absolute inset-0">
      <ThreeScene />
    </div>
  );
}

class WebGLBoundary extends Error {}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function AnimatedBackground() {
  const webglAvailable = isWebGLAvailable();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {webglAvailable ? <WebGLBackground /> : <CSSFallbackBackground />}
    </div>
  );
}
