import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

/* ── Star field ── */
function StarField() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 3500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 70;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 70;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.006;
    ref.current.rotation.x = clock.elapsedTime * 0.002;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.045} sizeAttenuation depthWrite={false} opacity={0.75} />
    </Points>
  );
}

/* ── Earth ── */
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const atmoRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture("/earth.jpg");

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.04;
    atmoRef.current.rotation.y = t * 0.04;
  });

  return (
    <group position={[2.4, 0.3, -3.5]}>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          specular={new THREE.Color(0x222222)}
          shininess={10}
        />
      </mesh>

      {/* Atmosphere glow - inner */}
      <mesh ref={atmoRef} scale={1.06}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={0.07} side={THREE.FrontSide} />
      </mesh>

      {/* Atmosphere glow - outer */}
      <mesh scale={1.16}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#1a237e" transparent opacity={0.04} side={THREE.FrontSide} />
      </mesh>
    </group>
  );
}

/* ── Shooting stars ── */
type StarData = {
  x: number; y: number; z: number;
  dx: number; dy: number;
  speed: number; life: number; maxLife: number;
  active: boolean; wait: number;
};

function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null!);
  const COUNT = 7;

  const meshRefs = useRef<THREE.Mesh[]>([]);

  const stars = useRef<StarData[]>(
    Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 18,
      y: Math.random() * 7 + 2,
      z: -1,
      dx: -(Math.random() * 0.4 + 0.25),
      dy: -(Math.random() * 0.3 + 0.1),
      speed: Math.random() * 5 + 4,
      life: 0,
      maxLife: Math.random() * 1.5 + 0.8,
      active: false,
      wait: Math.random() * 7,
    }))
  );

  const reset = (s: StarData) => {
    s.x = (Math.random() - 0.5) * 18;
    s.y = Math.random() * 7 + 2;
    s.dx = -(Math.random() * 0.4 + 0.25);
    s.dy = -(Math.random() * 0.3 + 0.1);
    s.speed = Math.random() * 5 + 4;
    s.life = 0;
    s.maxLife = Math.random() * 1.5 + 0.8;
    s.active = false;
    s.wait = Math.random() * 5 + 1;
  };

  useFrame((_, delta) => {
    stars.current.forEach((s, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      if (!s.active) {
        s.wait -= delta;
        mesh.visible = false;
        if (s.wait <= 0) s.active = true;
        return;
      }

      s.life += delta;
      s.x += s.dx * s.speed * delta;
      s.y += s.dy * s.speed * delta;

      const progress = s.life / s.maxLife;
      const opacity = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;

      mesh.visible = true;
      mesh.position.set(s.x, s.y, s.z);

      const angle = Math.atan2(s.dy, s.dx);
      mesh.rotation.z = angle + Math.PI / 2;

      (mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.85;

      if (s.life >= s.maxLife) reset(s);
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) meshRefs.current[i] = el; }} visible={false}>
          <cylinderGeometry args={[0.007, 0.001, 1.3, 4]} />
          <meshBasicMaterial color="#b0e0ff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── WebGL check ── */
function checkWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── CSS dot fallback (no WebGL) ── */
function CSSStars() {
  const dots = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      w: Math.random() * 2.5 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 2 + Math.random() * 5,
      delay: Math.random() * 4,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{ width: d.w, height: d.w, left: `${d.left}%`, top: `${d.top}%` }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay }}
        />
      ))}
    </div>
  );
}

/* ── Astronaut (CSS, always visible) ── */
function FloatingAstronaut() {
  return (
    <motion.div
      className="absolute z-10 select-none pointer-events-none"
      style={{ left: "10%", top: "28%" }}
      animate={{
        y:       [-10, 14, -10],
        x:       [0,   30,  70, 110, 150],
        rotate:  [-6,  -2,   4,   8,  12],
        opacity: [0,    1,   1,   1,   0],
      }}
      transition={{
        duration:    24,
        repeat:      Infinity,
        ease:        "easeInOut",
        times:       [0, 0.1, 0.5, 0.9, 1],
        repeatDelay: 8,
      }}
    >
      <svg
        width="52" height="76" viewBox="0 0 56 80" fill="none"
        style={{ filter: "drop-shadow(0 0 8px rgba(79,195,247,0.55))" }}
      >
        {/* helmet */}
        <ellipse cx="28" cy="22" rx="14" ry="15" fill="#ddeef8" opacity="0.96" />
        <ellipse cx="28" cy="22" rx="13" ry="14" fill="#90caf9" opacity="0.4" />
        {/* visor */}
        <ellipse cx="28" cy="22" rx="8"  ry="7"  fill="#1a237e" opacity="0.88" />
        <ellipse cx="25" cy="19" rx="3"  ry="2.5" fill="#4fc3f7" opacity="0.45" />
        {/* body */}
        <rect x="16" y="34" width="24" height="26" rx="8" fill="#e0e0e0" opacity="0.96" />
        {/* chest panel */}
        <rect x="20" y="37" width="16" height="10" rx="3" fill="#bdbdbd" />
        <circle cx="24" cy="42" r="2" fill="#4fc3f7" opacity="0.85" />
        <circle cx="28" cy="42" r="2" fill="#ef5350" opacity="0.85" />
        <circle cx="32" cy="42" r="2" fill="#66bb6a" opacity="0.85" />
        {/* left arm */}
        <path d="M16 38 Q6 45 8 54" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="8"  cy="56" rx="4" ry="3" fill="#e0e0e0" />
        {/* right arm */}
        <path d="M40 38 Q50 45 48 54" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="48" cy="56" rx="4" ry="3" fill="#e0e0e0" />
        {/* legs */}
        <path d="M22 60 Q20 70 18 76" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="18" cy="77" rx="5" ry="3" fill="#bdbdbd" />
        <path d="M34 60 Q36 70 38 76" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="38" cy="77" rx="5" ry="3" fill="#bdbdbd" />
        {/* tether */}
        <path d="M16 45 Q4 38 0 30" stroke="#4fc3f7" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" fill="none" />
      </svg>
    </motion.div>
  );
}

/* ── Main export ── */
export function AnimatedBackground() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(checkWebGL());
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#020818" }}>
      {webgl ? (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={0.12} />
            <directionalLight position={[-8, 4, 3]} intensity={1.3} color="#fff8e0" />
            <pointLight position={[0, 0, 4]} intensity={0.2} color="#4fc3f7" />

            <Suspense fallback={null}>
              <StarField />
              <Earth />
              <ShootingStars />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <CSSStars />
      )}

      <FloatingAstronaut />
    </div>
  );
}
