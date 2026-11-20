import React from "react";
import { useProgress } from "@react-three/drei";

const CanvasOverlayLoader = () => {
  const { active, progress } = useProgress();

  if (!active && progress >= 100) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#0E1222]/60">
      <div className="flex flex-col items-center gap-3 px-5 py-4 rounded-xl bg-[#0E1222]/95 border border-white/10">
        <span className="canvas-loader" aria-hidden="true" />
        <p className="font-mono text-xs text-secondary tabular-nums whitespace-nowrap">
          Loading scene · {Math.min(100, Math.round(progress))}%
        </p>
      </div>
    </div>
  );
};

export default CanvasOverlayLoader;
