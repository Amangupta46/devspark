"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  AdaptiveDpr,
  AdaptiveEvents,
  MeshTransmissionMaterial,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { mulberry32 } from "@/lib/particles";

type Tier = "desktop" | "tablet" | "mobile";

// ─── Easing helper ───────────────────────────────────────────────────────────
function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

// ─── Premium Glass Object ────────────────────────────────────────────────────
const PremiumObject = React.memo(function PremiumObject({ tier }: { tier: Tier }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.15;
      outerRef.current.rotation.y += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.1;
      innerRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
      <group>
        {/* Inner solid geometric core */}
        <mesh ref={innerRef} castShadow>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshPhysicalMaterial
            color="#f5a623"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Outer complex glass shell */}
        <mesh ref={outerRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.2, 0.3, 128, 32]} />
          <MeshTransmissionMaterial
            backside={false}
            samples={tier === "mobile" ? 1 : 2}
            resolution={tier === "mobile" ? 64 : 128}
            thickness={0.8}
            roughness={tier === "mobile" ? 0.2 : 0.15}
            transmission={1}
            ior={1.5}
            chromaticAberration={tier === "mobile" ? 0.02 : 0.05}
            anisotropy={0.2}
            distortion={tier === "mobile" ? 0.0 : 0.1}
            distortionScale={0.3}
            temporalDistortion={tier === "mobile" ? 0.0 : 0.05}
            color="#ffffff"
            attenuationDistance={2}
            attenuationColor="#ffffff"
          />
        </mesh>
      </group>
    </Float>
  );
});

// ─── Strict Particles (Max 10) ───────────────────────────────────────────────
const StrictParticles = React.memo(function StrictParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const [data, setData] = useState<[Float32Array, Float32Array] | null>(null);

  useEffect(() => {
    let handle: number;
    // Use requestIdleCallback to defer heavy initialization
    const initParticles = () => {
      const pos = new Float32Array(count * 3);
      const sz = new Float32Array(count);
      const prng = mulberry32(88888);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (prng() - 0.5) * 6;
        pos[i * 3 + 1] = (prng() - 0.5) * 6;
        pos[i * 3 + 2] = (prng() - 0.5) * 4 - 1;
        sz[i] = prng() * 0.05 + 0.02;
      }
      setData([pos, sz]);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(initParticles);
    } else {
      handle = setTimeout(initParticles, 1) as unknown as number;
    }

    return () => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
    const posAttr = ref.current.geometry.getAttribute("position");
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
    }
    posAttr.needsUpdate = true;
  });

  if (!data) return null;
  const [positions, sizes] = data;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

// ─── Camera Rig & Mouse Tracking ─────────────────────────────────────────────
const mouseState = { x: 0, y: 0 };

const CameraRig = React.memo(function CameraRig() {
  const { invalidate } = useThree();
  const currentX = useRef(0);
  const currentY = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const targetX = mouseState.x * 0.3;
    const targetY = mouseState.y * 0.3;

    currentX.current = damp(currentX.current, targetX, 2, delta);
    currentY.current = damp(currentY.current, targetY, 2, delta);

    const breathX = Math.sin(t * 0.4) * 0.05;
    const breathY = Math.cos(t * 0.5) * 0.05;

    state.camera.position.x = currentX.current + breathX;
    state.camera.position.y = currentY.current + breathY;
    state.camera.position.z = 5.5 + Math.sin(t * 0.2) * 0.1;
    
    state.camera.lookAt(0, 0, 0);
    invalidate();
  });

  return null;
});

// ─── Scene Composition ───────────────────────────────────────────────────────
const InnerScene = React.memo(function InnerScene({ tier }: { tier: Tier }) {
  const particleCount = tier === "desktop" ? 10 : tier === "tablet" ? 5 : 3;

  return (
    <>
      <fogExp2 attach="fog" args={["#0f172a", 0.06]} />
      
      {/* Lighting optimized for transmission reflection */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#818cf8" />
      <pointLight position={[2, -2, 2]} intensity={3} color="#f59e0b" />
      
      <hemisphereLight intensity={1} color="#ffffff" groundColor="#0f172a" />
      
      <CameraRig />
      
      <group>
        <PremiumObject tier={tier} />
        <StrictParticles count={particleCount} />
      </group>
    </>
  );
});

// ─── Controller & Cleanup ────────────────────────────────────────────────────
function SceneController() {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    if (!gl || !gl.domElement || !gl.domElement.parentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gl.setAnimationLoop?.(null);
          invalidate();
        } else {
          gl.setAnimationLoop?.(() => {});
        }
      },
      { threshold: 0 }
    );
    observer.observe(gl.domElement.parentElement);

    return () => {
      observer.disconnect();
      if (gl && gl.setAnimationLoop) {
        gl.setAnimationLoop(null);
      }
      
      // Explicit disposal to prevent WebGL leaks
      // Explicit disposal to prevent WebGL leaks
      scene.traverse((object: THREE.Object3D) => {
        const mesh = object as THREE.Mesh;
        if (mesh.isMesh) {
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene, invalidate]);

  return null;
}

// ─── Entry Point ─────────────────────────────────────────────────────────────
export function Hero3DScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [tier, setTier] = useState<Tier>("desktop");
  const [dpr, setDpr] = useState(1.5);
  
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setTier("mobile");
      else if (w < 1024) setTier("tablet");
      else setTier("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseState.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseState.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const handlePointerLeave = () => {
    mouseState.x = 0;
    mouseState.y = 0;
  };

  return (
    <div className="h-full w-full" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={dpr}
        frameloop="demand"
        shadows
        style={{ background: "transparent" }}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)}>
          <Suspense fallback={null}>
            <InnerScene tier={tier} />
            <SceneController />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
