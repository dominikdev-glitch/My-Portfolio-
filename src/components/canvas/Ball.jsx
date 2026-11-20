import React, { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { Decal, Float, OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const createBadgeTexture = (badge, color) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 256, 256);

  // Subtle dark disc backing
  ctx.beginPath();
  ctx.arc(128, 128, 108, 0, Math.PI * 2);
  ctx.fillStyle = "#0E1222";
  ctx.fill();

  // Accent outer ring
  ctx.beginPath();
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = color || "#915EFF";
  ctx.stroke();

  // Crisp centered badge code
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 58px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(badge, 128, 132);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

const Ball = ({ badge, color }) => {
  const decal = useMemo(() => createBadgeTexture(badge, color), [badge, color]);

  useEffect(() => {
    return () => {
      decal.dispose();
    };
  }, [decal]);

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.4}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 3, 2]} intensity={0.9} />
      <mesh castShadow receiveShadow scale={2.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#E8EAFF"
          roughness={0.38}
          metalness={0.18}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ badge, color, name }) => {
  const [contextLost, setContextLost] = useState(false);

  if (contextLost) {
    return (
      <div
        className="w-full h-full rounded-2xl bg-surface border border-white/10 flex flex-col items-center justify-center gap-1"
        title={name}
      >
        <span className="font-mono text-sm font-bold text-white">{badge}</span>
        <span className="text-[11px] text-secondary">{name}</span>
      </div>
    );
  }

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => {
        const el = gl.domElement;
        el.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setContextLost(true);
        });
        el.addEventListener("webglcontextrestored", () => setContextLost(false));
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Ball badge={badge} color={color} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
