import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CanvasOverlayLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  useEffect(() => {
    earth.scene.traverse((child) => {
      if (child.isMesh && !child.userData.centered) {
        child.geometry?.center();
        child.userData.centered = true;
      }
    });
  }, [earth]);

  return (
    <mesh>
      <hemisphereLight intensity={0.9} color="#E6E4FF" groundColor="#070913" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
      <primitive object={earth.scene} scale={2.45} position-y={0} rotation-y={0} />
    </mesh>
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
          Lagos, Nigeria · Remote Worldwide
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
          shadows
          frameloop="demand"
          dpr={[1, 1.5]}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}
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
              autoRotate
              autoRotateSpeed={1.6}
              enableZoom={false}
              enablePan={false}
              enableRotate={allowOrbit}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Earth />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>

      <CanvasOverlayLoader />

      {isMobile && (
        <button
          type="button"
          onClick={() => setTouchInteractive((prev) => !prev)}
          className="absolute bottom-3 right-3 z-20 min-h-[36px] px-3 py-1.5 rounded-lg bg-[#070913]/90 border border-white/20 text-[12px] font-medium text-white hover:border-[#915eff] transition-colors cursor-pointer"
        >
          {touchInteractive ? "Done Rotating" : "Rotate 3D"}
        </button>
      )}
    </div>
  );
};

export default EarthCanvas;
