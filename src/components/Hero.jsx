import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { ComputersCanvas } from "./canvas";
import { styles } from "../styles";
import { heroHighlights, profile } from "../constants";

const Hero = () => {
  return (
    <section className="hero-backdrop relative w-full pt-20 pb-10 sm:pt-28 sm:pb-16 border-b border-white/[0.08] overflow-x-hidden">
      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-center min-w-0">
            <p className="text-[12px] sm:text-[13px] font-medium text-secondary tracking-wide">
              {profile.experience}
              <span className="mx-2 text-white/30" aria-hidden="true">
                ·
              </span>
              {profile.location}
              <span className="mx-2 text-white/30" aria-hidden="true">
                ·
              </span>
              {profile.availability}
            </p>

            <h1 className={`${styles.heroHeadText} mt-3 sm:mt-4`}>
              {profile.name}
            </h1>

            <p className="font-display text-[18px] sm:text-[24px] font-semibold text-[#915eff] mt-2 sm:mt-3">
              {profile.role}
            </p>

            <p className={`${styles.heroSubText} mt-3 sm:mt-4`}>
              I build scalable backend systems, multi-chain Web3 applications,
              and Layer-1 blockchain infrastructure in C++20, Solidity, Node.js,
              and TypeScript.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center min-h-[44px] py-2.5 px-5 sm:px-6 rounded-lg bg-[#915eff] hover:bg-[#7e4be6] text-white text-[14px] sm:text-[15px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Projects
              </a>
              <a
                href={profile.cvUrl}
                download={profile.cvFilename}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 sm:px-5 rounded-lg bg-surface border border-white/[0.14] hover:border-[#915eff] text-white text-[14px] sm:text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download CV</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-2 text-[14px] sm:text-[15px] font-medium text-secondary hover:text-white whitespace-nowrap shrink-0 transition-colors duration-150"
              >
                <span>GitHub (@{profile.handle})</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Workstation */}
          <div className="lg:col-span-6 flex flex-col min-w-0">
            <div className="w-full h-[240px] xs:h-[280px] sm:h-[380px] lg:h-[460px] rounded-2xl bg-[#0E1222]/60 border border-white/[0.08] overflow-hidden relative">
              <ComputersCanvas />
            </div>
            <p className="hidden lg:block text-[12px] font-mono text-secondary/75 mt-2.5 text-right">
              Interactive 3D viewport · Drag to rotate
            </p>
          </div>
        </div>

        {/* Full-Width Architectural Capability Strip below the split */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {heroHighlights.map((item, idx) => (
            <div
              key={item.label}
              className={idx === 0 ? "lg:pr-6" : "lg:px-6"}
            >
              <p className="text-[12px] font-medium text-secondary">
                {item.label}
              </p>
              <p className="font-mono text-[13px] sm:text-[14px] font-medium text-white mt-1 tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
