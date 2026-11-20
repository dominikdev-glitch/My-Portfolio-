import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls, Preload, useGLTF, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CanvasOverlayLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  useEffect(() => {
    computer.scene.traverse((child) => {
      if (child.isMesh && !child.userData.centered) {
        child.geometry?.center();
        child.userData.centered = true;
      }
    });
  }, [computer]);

  return (
    <mesh>
      <hemisphereLight intensity={1.8} color="#E6E4FF" groundColor="#070913" />
      <directionalLight
        position={[-10, 18, 10]}
        intensity={1.6}
        color="#FFF5E6"
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 4, -8]} intensity={1.4} color="#915EFF" />
      <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.9}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.48 : 0.72}
          position={isMobile ? [0, -0.85, -0.55] : [0, -1.45, -1.0]}
          rotation={isMobile ? [0, -0.25, -0.04] : [-0.01, -0.35, -0.04]}
        />
      </Float>
    </mesh>
  );
};

const ComputersCanvas = () => {
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

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) setTouchInteractive(false);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (contextLost) {
    return (
      <div className="w-full h-full rounded-2xl bg-surface border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <p className="font-display text-lg font-semibold text-white">
          3D Workstation Viewport
        </p>
        <p className="text-sm text-secondary mt-1">
          WebGL rendering paused on this device.
        </p>
      </div>
    );
  }

  const allowOrbit = !isMobile || touchInteractive;

  return (
    <div className="relative w-full h-full">
      <div
        className={`w-full h-full ${
          allowOrbit ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ touchAction: allowOrbit ? "none" : "pan-y" }}
      >
        <Canvas
          frameloop="always"
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [20, 3.2, 5.5], fov: 24 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
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
          <Suspense fallback={null}>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={allowOrbit}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
            <Computers isMobile={isMobile} />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>

      <CanvasOverlayLoader />

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

export default ComputersCanvas;
