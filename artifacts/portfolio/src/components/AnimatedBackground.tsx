import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { motion } from "framer-motion";

/* ---------- Star field ---------- */
function StarField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      ref.current.rotation.x = state.clock.elapsedTime * 0.003;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

/* ---------- Earth ---------- */
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(TextureLoader, "/earth.jpg");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group position={[2.2, 0.5, -3]}>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          specular={new THREE.Color(0x333333)}
          shininess={15}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={glowRef} scale={1.08}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#1565c0"
          transparent
          opacity={0.04}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

/* ---------- Shooting stars ---------- */
interface ShootingStar {
  start: THREE.Vector3;
  dir: THREE.Vector3;
  speed: number;
  length: number;
  progress: number;
  delay: number;
  active: boolean;
}

function ShootingStars() {
  const linesRef = useRef<(THREE.Mesh | null)[]>([]);
  const starsData = useRef<ShootingStar[]>([]);

  const COUNT = 8;

  const makestar = (): ShootingStar => ({
    start: new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      Math.random() * 8 + 2,
      (Math.random() - 0.5) * 5 - 2
    ),
    dir: new THREE.Vector3(
      -(Math.random() * 0.5 + 0.3),
      -(Math.random() * 0.4 + 0.1),
      0
    ).normalize(),
    speed: Math.random() * 4 + 3,
    length: Math.random() * 1.5 + 0.5,
    progress: 0,
    delay: Math.random() * 6,
    active: false,
  });

  useEffect(() => {
    starsData.current = Array.from({ length: COUNT }, makestar);
  }, []);

  useFrame((state, delta) => {
    starsData.current.forEach((star, i) => {
      star.delay -= delta;
      if (star.delay > 0) return;
      star.active = true;
      star.progress += delta * star.speed;

      const mesh = linesRef.current[i];
      if (!mesh) return;

      const t = star.progress;
      const pos = star.start.clone().addScaledVector(star.dir, t);

      mesh.position.copy(pos);
      mesh.lookAt(pos.clone().addScaledVector(star.dir, 1));

      const opacity = Math.min(1, Math.min(t, (star.length * 4 - t)) / 0.5);
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, opacity);

      if (star.progress > star.length * 4 + 2) {
        Object.assign(star, makestar());
        star.progress = 0;
        star.delay = Math.random() * 4 + 1;
        star.active = false;
      }
    });
  });

  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { linesRef.current[i] = el; }}
        >
          <cylinderGeometry args={[0.006, 0.001, 1.2, 4]} />
          <meshBasicMaterial
            color="#a5d8ff"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

/* ---------- Three.js Scene ---------- */
function SpaceScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[-8, 4, 3]} intensity={1.2} color="#fff5e0" />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#4fc3f7" />

      <Suspense fallback={null}>
        <StarField />
        <Earth />
        <ShootingStars />
      </Suspense>
    </Canvas>
  );
}

/* ---------- CSS Fallback ---------- */
function CSSFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- WebGL check ---------- */
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

/* ---------- Floating Astronaut (CSS layer) ---------- */
function FloatingAstronaut() {
  return (
    <motion.div
      className="absolute z-10 select-none pointer-events-none"
      style={{ left: "12%", top: "30%" }}
      animate={{
        y: [-12, 18, -12],
        x: [0, 20, 40, 60, 80],
        rotate: [-8, -2, 4, 8, 12],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.1, 0.5, 0.9, 1],
        repeatDelay: 6,
      }}
    >
      <svg
        width="56"
        height="80"
        viewBox="0 0 56 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 10px rgba(79,195,247,0.5))" }}
      >
        {/* Helmet */}
        <ellipse cx="28" cy="22" rx="14" ry="15" fill="#e8f4fd" opacity="0.95" />
        <ellipse cx="28" cy="22" rx="13" ry="14" fill="#b3ddf5" opacity="0.6" />
        {/* Visor */}
        <ellipse cx="28" cy="22" rx="8" ry="7" fill="#1a237e" opacity="0.85" />
        <ellipse cx="25" cy="19" rx="3" ry="2.5" fill="#4fc3f7" opacity="0.5" />
        {/* Suit body */}
        <rect x="16" y="34" width="24" height="26" rx="8" fill="#e0e0e0" opacity="0.95" />
        {/* Chest pack */}
        <rect x="20" y="37" width="16" height="10" rx="3" fill="#bdbdbd" />
        <circle cx="24" cy="42" r="2" fill="#4fc3f7" opacity="0.8" />
        <circle cx="28" cy="42" r="2" fill="#ef5350" opacity="0.8" />
        <circle cx="32" cy="42" r="2" fill="#66bb6a" opacity="0.8" />
        {/* Left arm */}
        <path d="M16 38 Q6 45 8 54" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="8" cy="56" rx="4" ry="3" fill="#e0e0e0" />
        {/* Right arm */}
        <path d="M40 38 Q50 45 48 54" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="48" cy="56" rx="4" ry="3" fill="#e0e0e0" />
        {/* Legs */}
        <path d="M22 60 Q20 70 18 76" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="18" cy="77" rx="5" ry="3" fill="#bdbdbd" />
        <path d="M34 60 Q36 70 38 76" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="38" cy="77" rx="5" ry="3" fill="#bdbdbd" />
        {/* Tether */}
        <path d="M16 45 Q4 38 0 30" stroke="#4fc3f7" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" fill="none" />
      </svg>
    </motion.div>
  );
}

/* ---------- Main export ---------- */
export function AnimatedBackground() {
  const [webgl] = useState(() => isWebGLAvailable());

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#020818" }}>
      {webgl ? (
        <div className="absolute inset-0">
          <SpaceScene />
        </div>
      ) : (
        <CSSFallback />
      )}
      <FloatingAstronaut />
    </div>
  );
}
