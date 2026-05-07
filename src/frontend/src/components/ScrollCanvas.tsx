import { useScrollStore } from "@/hooks/useScrollProgress";
import { MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, Suspense, useRef } from "react";
import type * as THREE from "three";

interface ScrollCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollCanvas({
  children,
  className,
  style,
}: ScrollCanvasProps) {
  return (
    <Canvas
      className={className}
      style={style}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

// Reusable scroll-reactive mesh wrapper
interface ScrollReactiveProps {
  children: ReactNode;
  rotationFactor?: number;
  floatAmplitude?: number;
}

export function ScrollReactive({
  children,
  rotationFactor = 1,
  floatAmplitude = 0.3,
}: ScrollReactiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useScrollStore((s) => s.progress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = progressRef.current;
    groupRef.current.rotation.y = p * Math.PI * 2 * rotationFactor;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.6) * floatAmplitude;
  });

  return <group ref={groupRef}>{children}</group>;
}

// Ambient particle field
export function ParticleField({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const progress = useScrollStore((s) => s.progress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const positions = useRef<Float32Array | null>(null);
  if (positions.current === null) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    positions.current = arr;
  }

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y =
      clock.getElapsedTime() * 0.04 + progressRef.current * 1.5;
    ref.current.rotation.x = clock.getElapsedTime() * 0.02;
  });

  if (!positions.current) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions.current, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#f97316"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// Camera dolly that reacts to scroll
export function ScrollCamera({
  zRange = [5, 3],
}: { zRange?: [number, number] }) {
  const { camera } = useThree();
  const progress = useScrollStore((s) => s.progress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useFrame(() => {
    const z = zRange[0] + (zRange[1] - zRange[0]) * progressRef.current;
    camera.position.z += (z - camera.position.z) * 0.05;
  });

  return null;
}

// ─── New Hero 3D Shapes ────────────────────────────────────────────────────────

export function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useScrollStore((s) => s.progress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const t = clock.getElapsedTime();
    const p = progressRef.current;
    meshRef.current.rotation.x = t * 0.18 + p * Math.PI;
    meshRef.current.rotation.y = t * 0.28 + p * Math.PI * 1.5;
    meshRef.current.position.y = Math.sin(t * 0.7) * 0.35;
    const scale = 1 + p * 0.4;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[1.5, 0, 0]}>
      <torusKnotGeometry args={[0.85, 0.28, 180, 24, 2, 3]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={0.45}
        metalness={0.8}
        roughness={0.15}
      />
    </mesh>
  );
}

export function GemstoneCrystal() {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useScrollStore((s) => s.progress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const t = clock.getElapsedTime();
    const p = progressRef.current;
    groupRef.current.rotation.y = t * 0.3 + p * Math.PI * 2;
    groupRef.current.position.x = -1.8 + Math.sin(t * 0.45) * 0.2;
    groupRef.current.position.y = Math.cos(t * 0.5) * 0.4;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.55, 1.1, 6, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          transparent
          opacity={0.82}
          metalness={0.5}
          roughness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.55, 1.1, 6, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
      <mesh position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 1.1, 6, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          transparent
          opacity={0.82}
          metalness={0.5}
          roughness={0.05}
        />
      </mesh>
      <mesh position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 1.1, 6, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

export function HelixRing() {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useScrollStore((s) => s.progress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const t = clock.getElapsedTime();
    const p = progressRef.current;
    ref.current.rotation.x = t * 1.2 + p * 2;
    ref.current.rotation.z = t * 0.4;
    const pulse = 1 + Math.sin(t * 1.8) * 0.12 + p * 0.3;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={[0.5, 1.8, -1]}>
      <torusGeometry args={[0.8, 0.04, 16, 80]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={0.7}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// ─── Section Decoration Canvases ──────────────────────────────────────────────

function SectionCanvas({ children }: { children: ReactNode }) {
  return (
    <Canvas
      style={{ background: "transparent", pointerEvents: "none" }}
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={3} color="#f97316" />
        <pointLight position={[-3, -2, 2]} intensity={2} color="#22d3ee" />
        {children}
      </Suspense>
    </Canvas>
  );
}

function FloatingDNAInner() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.4;
  });

  const beads: Array<{
    pos: [number, number, number];
    color: string;
    key: string;
  }> = [];
  const count = 20;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 4;
    const r = 0.6;
    beads.push({
      pos: [Math.cos(t) * r, (i / count) * 3 - 1.5, Math.sin(t) * r],
      color: i % 2 === 0 ? "#f97316" : "#22d3ee",
      key: `dna-a-${i}`,
    });
    beads.push({
      pos: [
        Math.cos(t + Math.PI) * r,
        (i / count) * 3 - 1.5,
        Math.sin(t + Math.PI) * r,
      ],
      color: i % 2 === 0 ? "#22d3ee" : "#f97316",
      key: `dna-b-${i}`,
    });
  }

  return (
    <group ref={groupRef}>
      {beads.map((b) => (
        <mesh key={b.key} position={b.pos}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function AboutCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: 240,
        height: 360,
        pointerEvents: "none",
        opacity: 0.55,
      }}
      aria-hidden="true"
    >
      <SectionCanvas>
        <FloatingDNAInner />
      </SectionCanvas>
    </div>
  );
}

function SpinningCubeInner() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.3;
    groupRef.current.rotation.y = t * 0.5;
    groupRef.current.rotation.z = t * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

export function WhyUsCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: 260,
        height: 260,
        pointerEvents: "none",
        opacity: 0.5,
      }}
      aria-hidden="true"
    >
      <SectionCanvas>
        <SpinningCubeInner />
      </SectionCanvas>
    </div>
  );
}

function GlowingStarInner() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.25;
    meshRef.current.rotation.y = t * 0.15;
    const pulse = 1 + Math.sin(t * 2.2) * 0.12;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.7, 0.22, 120, 16, 3, 5]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={0.55}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

export function PortfolioCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top: "15%",
        width: 220,
        height: 220,
        pointerEvents: "none",
        opacity: 0.5,
      }}
      aria-hidden="true"
    >
      <SectionCanvas>
        <GlowingStarInner />
      </SectionCanvas>
    </div>
  );
}

function FloatingRingInner() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.z = t * 0.12;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.2, 0.1, 20, 80]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.15}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

export function TestimonialsCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 20,
        width: 300,
        height: 200,
        pointerEvents: "none",
        opacity: 0.35,
      }}
      aria-hidden="true"
    >
      <SectionCanvas>
        <FloatingRingInner />
      </SectionCanvas>
    </div>
  );
}

function OrbitalSystemInner() {
  const groupRef = useRef<THREE.Group>(null);
  const orbit1Ref = useRef<THREE.Mesh>(null);
  const orbit2Ref = useRef<THREE.Mesh>(null);
  const orbit3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
    if (orbit1Ref.current) {
      orbit1Ref.current.position.x = Math.cos(t * 1.0) * 1.1;
      orbit1Ref.current.position.z = Math.sin(t * 1.0) * 1.1;
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.position.x =
        Math.cos(t * 0.65 + (Math.PI * 2) / 3) * 1.4;
      orbit2Ref.current.position.z =
        Math.sin(t * 0.65 + (Math.PI * 2) / 3) * 1.4;
      orbit2Ref.current.position.y = Math.sin(t * 0.65) * 0.5;
    }
    if (orbit3Ref.current) {
      orbit3Ref.current.position.x =
        Math.cos(t * 1.35 + (Math.PI * 4) / 3) * 0.9;
      orbit3Ref.current.position.y = Math.cos(t * 1.35) * 0.7;
      orbit3Ref.current.position.z =
        Math.sin(t * 1.35 + (Math.PI * 4) / 3) * 0.9;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.7}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={orbit1Ref}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={orbit2Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={orbit3Ref}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export function TeamCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top: "10%",
        width: 260,
        height: 260,
        pointerEvents: "none",
        opacity: 0.5,
      }}
      aria-hidden="true"
    >
      <SectionCanvas>
        <OrbitalSystemInner />
      </SectionCanvas>
    </div>
  );
}

function PulsingSphereInner() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.3, 64, 64]} />
      <MeshDistortMaterial
        color="#f97316"
        emissive="#22d3ee"
        emissiveIntensity={0.25}
        distort={0.45}
        speed={1.8}
        transparent
        opacity={0.35}
        metalness={0.4}
        roughness={0.2}
      />
    </mesh>
  );
}

export function ContactCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 340,
        height: 340,
        pointerEvents: "none",
        opacity: 0.3,
      }}
      aria-hidden="true"
    >
      <SectionCanvas>
        <PulsingSphereInner />
      </SectionCanvas>
    </div>
  );
}
