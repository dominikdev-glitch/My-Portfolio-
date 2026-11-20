import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Decal, Float, OrbitControls, Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const createBadgeTexture = (badge, color) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 256, 256);

  ctx.beginPath();
  ctx.arc(128, 128, 108, 0, Math.PI * 2);
  ctx.fillStyle = "#0E1222";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = color || "#915EFF";
  ctx.stroke();

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

const ResponsiveOrthoSync = ({ count }) => {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (camera.isOrthographicCamera && size.width > 0) {
      camera.zoom = size.width / (count * 3.0);
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height, count]);

  useFrame(() => {
    if (camera.isOrthographicCamera && size.width > 0) {
      const targetZoom = size.width / (count * 3.0);
      if (Math.abs(camera.zoom - targetZoom) > 0.01) {
        camera.zoom = targetZoom;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
};

const InteractiveTechOrb = ({ tech, xPos, index, allowInteract }) => {
  const decal = useMemo(
    () => createBadgeTexture(tech.badge, tech.color),
    [tech.badge, tech.color]
  );
  const spinRef = useRef(null);
  const dragState = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
  });

  useEffect(() => {
    return () => {
      decal.dispose();
    };
  }, [decal]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragState.current.active || !spinRef.current) return;
      const dx = e.clientX - dragState.current.lastX;
      const dy = e.clientY - dragState.current.lastY;
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
      spinRef.current.rotation.y += dx * 0.015;
      spinRef.current.rotation.x += dy * 0.015;
      dragState.current.velY = dx * 0.008;
      dragState.current.velX = dy * 0.008;
    };

    const handlePointerUp = () => {
      dragState.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!spinRef.current) return;
    if (!dragState.current.active) {
      // Gentle idle sway keeping the decal front-facing while showing 3D facets
      const t = state.clock.elapsedTime + index * 0.65;
      spinRef.current.rotation.y +=
        dragState.current.velY + (Math.sin(t * 0.9) * 0.25 - spinRef.current.rotation.y) * Math.min(1, delta * 0.7);
      spinRef.current.rotation.x +=
        dragState.current.velX + (Math.cos(t * 0.7) * 0.12 - spinRef.current.rotation.x) * Math.min(1, delta * 0.7);
      dragState.current.velX *= 0.92;
      dragState.current.velY *= 0.92;
    }
  });

  return (
    <group position={[xPos, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.28} floatIntensity={0.32}>
        <group
          ref={spinRef}
          onPointerDown={(e) => {
            if (!allowInteract) return;
            e.stopPropagation();
            dragState.current.active = true;
            dragState.current.lastX = e.clientX;
            dragState.current.lastY = e.clientY;
          }}
        >
          <mesh castShadow receiveShadow scale={0.96}>
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
        </group>
      </Float>
    </group>
  );
};

export const TechOrbsRow = ({
  items,
  isMobile = false,
  touchInteractive = false,
}) => {
  const [contextLost, setContextLost] = useState(false);

  if (contextLost) {
    return (
      <div
        className={`grid ${
          items.length === 4 ? "grid-cols-4" : "grid-cols-8"
        } gap-2 sm:gap-4 py-2`}
      >
        {items.map((tech) => (
          <div
            key={tech.name}
            className="aspect-square rounded-xl bg-surface border border-white/10 flex flex-col items-center justify-center p-2"
            title={tech.name}
          >
            <span
              className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#070913] text-white border"
              style={{ borderColor: tech.color }}
            >
              {tech.badge}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const allowInteract = !isMobile || touchInteractive;
  const count = items.length;
  const aspectClass = count === 4 ? "aspect-[4/1.15]" : "aspect-[8/1.15]";

  return (
    <div
      className={`w-full ${aspectClass} ${
        allowInteract ? "pointer-events-auto cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
      style={{ touchAction: allowInteract ? "none" : "pan-y" }}
    >
      <Canvas
        orthographic
        frameloop="always"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], zoom: 40 }}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
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
        <ResponsiveOrthoSync count={count} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 5]} intensity={1.0} />
        <Suspense fallback={null}>
          {items.map((tech, idx) => {
            const xPos = -(count - 1) * 1.5 + idx * 3.0;
            return (
              <InteractiveTechOrb
                key={tech.name}
                tech={tech}
                xPos={xPos}
                index={idx}
                allowInteract={allowInteract}
              />
            );
          })}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
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
