import { useScrollStore } from "@/hooks/useScrollProgress";
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
