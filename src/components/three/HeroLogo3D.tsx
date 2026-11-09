"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { T_BAR, T_STEM, V_SHAPE, type Pt } from "@/components/brand/monogram-paths";

const SCALE = 3;
const DEPTH = 0.26;

function shapeFrom(points: Pt[]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const X = ((x - 50) / 100) * SCALE;
    const Y = (-(y - 50) / 100) * SCALE;
    if (i === 0) shape.moveTo(X, Y);
    else shape.lineTo(X, Y);
  });
  shape.closePath();
  return shape;
}

function useLetterGeometry(points: Pt[]) {
  return useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shapeFrom(points), {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.032,
      bevelSegments: 4,
      curveSegments: 1,
    });
    geo.translate(0, 0, -DEPTH / 2);
    return geo;
  }, [points]);
}

type Pointer = { x: number; y: number };

function Monogram({ animate, pointer }: { animate: boolean; pointer: React.RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);
  const stem = useLetterGeometry(T_STEM);
  const v = useLetterGeometry(V_SHAPE);
  const bar = useLetterGeometry(T_BAR);

  // Group 0 = caps (chrome), group 1 = extruded sides/bevel (purple edge light).
  const materials = useMemo(() => {
    const chrome = new THREE.MeshPhysicalMaterial({
      color: "#eceef3",
      metalness: 1,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.25,
    });
    const edge = new THREE.MeshPhysicalMaterial({
      color: "#c9b6ff",
      metalness: 1,
      roughness: 0.22,
      emissive: new THREE.Color("#7c3aed"),
      emissiveIntensity: 0.55,
      envMapIntensity: 1,
    });
    return [chrome, edge];
  }, []);

  useEffect(
    () => () => {
      [stem, v, bar].forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
    [stem, v, bar, materials],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current ?? { x: 0, y: 0 };
    const targetY = animate ? Math.sin(t * 0.35) * 0.28 + p.x * 0.45 : -0.32;
    const targetX = animate ? p.y * 0.25 + Math.sin(t * 0.5) * 0.04 : 0.08;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.5, delta);
    g.position.y = animate ? Math.sin(t * 0.8) * 0.06 : 0;
  });

  return (
    <group ref={group} rotation={[0.08, -0.32, 0]}>
      <mesh geometry={stem} material={materials} position={[0, 0, -0.2]} />
      <mesh geometry={v} material={materials} />
      <mesh geometry={bar} material={materials} position={[0, 0, 0.2]} />
    </group>
  );
}

export default function HeroLogo3D({
  active,
  animate,
  lite,
  onReady,
}: {
  /** false pauses the render loop (offscreen / hidden tab). */
  active: boolean;
  /** false renders a still pose (reduced motion). */
  animate: boolean;
  /** Mobile / low-power: fewer particles, lower DPR. */
  lite: boolean;
  onReady: () => void;
}) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  // Weak GPUs that can't hold the frame rate drop to a still pose at 1x DPR.
  const [degraded, setDegraded] = useState(false);
  const moving = animate && !degraded;

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  return (
    <Canvas
      frameloop={active && moving ? "always" : "demand"}
      dpr={degraded ? 1 : lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 6.4], fov: 34 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
        onReady();
      }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#0a0614", 7, 14]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3.5, 1, -2]} intensity={30} color="#a855f7" distance={12} />
      <pointLight position={[3.5, -1.5, -1.5]} intensity={22} color="#7c3aed" distance={12} />

      {/* Local light-former environment: chrome reflections with no network HDR fetch. */}
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[10, 1.4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.4} position={[0, -3, 4]} scale={[10, 0.6, 1]} color="#d1d5db" />
        <Lightformer form="ring" intensity={4} position={[-4, 0.5, 1]} scale={2.4} color="#a855f7" />
        <Lightformer form="ring" intensity={3} position={[4, -0.5, 1]} scale={2} color="#7c3aed" />
        <Lightformer form="rect" intensity={1} position={[0, 0, -5]} scale={[12, 6, 1]} color="#2a1150" />
        {/* Soft key panels in front of the mark so the flat chrome faces catch light. */}
        <Lightformer form="rect" intensity={1.6} position={[1.5, 1, 7]} scale={[6, 3, 1]} color="#f1ecff" />
        <Lightformer form="rect" intensity={0.8} position={[-2.5, -1.5, 6]} scale={[5, 2, 1]} color="#b48cff" />
      </Environment>

      <PerformanceMonitor flipflops={2} onDecline={() => setDegraded(true)} onFallback={() => setDegraded(true)} />
      <Monogram animate={moving} pointer={pointer} />
      {moving ? (
        <Sparkles count={lite ? 24 : 60} scale={[6, 4.5, 3]} size={lite ? 1.6 : 2.2} speed={0.25} opacity={0.7} color="#c4a1ff" />
      ) : null}
    </Canvas>
  );
}
