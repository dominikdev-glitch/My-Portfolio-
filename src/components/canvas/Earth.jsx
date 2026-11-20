import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

const createGlobeTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Deep obsidian ocean base
  ctx.fillStyle = "#0B1020";
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle coordinate graticule lines
  ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Stylized dot-matrix continental clusters (deterministic, non-random)
  const regions = [
    // North America
    { cx: 230, cy: 165, rx: 95, ry: 55 },
    // South America
    { cx: 310, cy: 330, rx: 52, ry: 75 },
    // Europe
    { cx: 525, cy: 145, rx: 60, ry: 38 },
    // Africa
    { cx: 540, cy: 275, rx: 68, ry: 82 },
    // Asia
    { cx: 700, cy: 175, rx: 135, ry: 70 },
    // Australia
    { cx: 810, cy: 350, rx: 48, ry: 34 },
  ];

  for (let y = 16; y < 496; y += 10) {
    for (let x = 16; x < 1008; x += 10) {
      const inRegion = regions.some((r) => {
        const dx = (x - r.cx) / r.rx;
        const dy = (y - r.cy) / r.ry;
        const wave = Math.sin(x * 0.045) * Math.cos(y * 0.055) * 0.22;
        return dx * dx + dy * dy + wave < 0.92;
      });
      if (inRegion) {
        ctx.fillStyle = "rgba(145, 94, 255, 0.42)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Highlighted hub nodes (Americas, Europe, West Africa, Asia)
  const hubs = [
    [255, 175], // US East
    [175, 180], // US West
    [515, 145], // London / EU
    [522, 235], // West Africa (UTC+1)
    [735, 195], // Asia
  ];
  hubs.forEach(([hx, hy]) => {
    ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
    ctx.beginPath();
    ctx.arc(hx, hy, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

const ProceduralGlobe = () => {
  const globeTexture = useMemo(() => createGlobeTexture(), []);
  const ringOneRef = useRef(null);
  const ringTwoRef = useRef(null);

  useEffect(() => {
    return () => {
      globeTexture.dispose();
    };
  }, [globeTexture]);

  useFrame((_, delta) => {
    if (ringOneRef.current) {
      ringOneRef.current.rotation.z += delta * 0.22;
    }
    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.z -= delta * 0.16;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 4, 5]} intensity={1.35} color="#FFFFFF" />
      <directionalLight position={[-5, -3, -4]} intensity={0.45} color="#915EFF" />

      {/* Core textured globe */}
      <mesh>
        <sphereGeometry args={[1.65, 48, 48]} />
        <meshStandardMaterial
          map={globeTexture}
          roughness={0.62}
          metalness={0.22}
        />
      </mesh>

      {/* Subtle geodesic wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.72, 2]} />
        <meshBasicMaterial
          color="#64748B"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Orbit ring 1 + nodes */}
      <group ref={ringOneRef} rotation={[Math.PI / 2.8, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[2.18, 0.012, 12, 96]} />
          <meshBasicMaterial color="#915EFF" transparent opacity={0.45} />
        </mesh>
        <mesh position={[2.18, 0, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#E2E8F0" emissive="#915EFF" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-2.18, 0, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
      </group>

      {/* Orbit ring 2 + node */}
      <group ref={ringTwoRef} rotation={[-Math.PI / 3.2, -0.55, 0]}>
        <mesh>
          <torusGeometry args={[2.42, 0.01, 12, 96]} />
          <meshBasicMaterial color="#475569" transparent opacity={0.45} />
        </mesh>
        <mesh position={[0, 2.42, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#E2E8F0" emissive="#915EFF" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );
  const [touchInteractive, setTouchInteractive] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setTouchInteractive(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (contextLost) {
    return (
      <div className="w-full h-full rounded-2xl bg-surface border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <p className="font-display text-lg font-semibold text-white">
          Global Remote Availability
        </p>
        <p className="text-sm text-secondary mt-1">
          Remote Worldwide · US EST Overlap (UTC+1)
        </p>
      </div>
    );
  }

  const allowOrbit = !isMobile || touchInteractive;

  return (
    <div className="relative w-full h-full">
      <div
        className={`w-full h-full ${
          allowOrbit ? "pointer-events-auto cursor-grab active:cursor-grabbing" : "pointer-events-none"
        }`}
        style={{ touchAction: allowOrbit ? "none" : "pan-y" }}
      >
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
          camera={{ position: [0, 1.2, 6.2], fov: 45, near: 0.1, far: 100 }}
          onCreated={({ gl }) => {
            const el = gl.domElement;
            el.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setContextLost(true);
            });
            el.addEventListener("webglcontextrestored", () =>
              setContextLost(false)
            );
          }}
        >
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.9}
            enableZoom={false}
            enablePan={false}
            enableRotate={allowOrbit}
            maxPolarAngle={Math.PI * 0.72}
            minPolarAngle={Math.PI * 0.28}
          />
          <ProceduralGlobe />
        </Canvas>
      </div>

      {isMobile && (
        <button
          type="button"
          onClick={() => setTouchInteractive((prev) => !prev)}
          className="absolute bottom-3 right-3 z-20 min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#070913]/90 border border-white/20 text-[12px] font-medium text-white hover:border-[#915eff] transition-colors cursor-pointer"
        >
          {touchInteractive ? "Done Rotating" : "Rotate 3D"}
        </button>
      )}
    </div>
  );
};

export default EarthCanvas;
