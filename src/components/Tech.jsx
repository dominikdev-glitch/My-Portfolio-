import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { TechOrbsRow } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies, techCategories } from "../constants";
import { textVariant } from "../utils/motion";

const filterOptions = [
  "All",
  "Backend",
  "Blockchain / Web3",
  "Frontend",
  "Tools",
];

const Tech = () => {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );
  const [touchInteractive, setTouchInteractive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const compactQuery = window.matchMedia("(max-width: 1023px)");

    const syncViewport = () => {
      setIsMobile(mobileQuery.matches);
      setIsCompact(compactQuery.matches);
      if (!mobileQuery.matches) setTouchInteractive(false);
    };

    syncViewport();
    mobileQuery.addEventListener("change", syncViewport);
    compactQuery.addEventListener("change", syncViewport);
    return () => {
      mobileQuery.removeEventListener("change", syncViewport);
      compactQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  const filteredCategories =
    selectedCategory === "All"
      ? techCategories
      : techCategories.filter((c) => c.category === selectedCategory);

  const orbRows = isCompact
    ? [technologies.slice(0, 4), technologies.slice(4, 8)]
    : [technologies];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Technical Architecture</p>
        <div className="mt-1 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <h2 className={styles.sectionHeadText}>Tech Stack</h2>

          {/* Interactive Category Filter Controls */}
          <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <div
              role="tablist"
              aria-label="Filter technologies by category"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-surface border border-white/[0.08] whitespace-nowrap"
            >
              {filterOptions.map((option) => {
                const isActive = selectedCategory === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(option)}
                    className={`min-h-[40px] px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#915eff] text-white"
                        : "text-secondary hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Same Interactive 3D Procedural Orbs across Mobile, Tablet, and Desktop */}
      <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
        {orbRows.map((rowItems, rowIdx) => (
          <div key={rowIdx}>
            <TechOrbsRow
              items={rowItems}
              isMobile={isMobile}
              touchInteractive={touchInteractive}
            />
            <div
              className={`grid ${
                rowItems.length === 4 ? "grid-cols-4" : "grid-cols-8"
              } gap-1 sm:gap-2 mt-1`}
            >
              {rowItems.map((tech) => (
                <span
                  key={tech.name}
                  className="text-center text-[11px] sm:text-[12px] font-medium text-secondary truncate px-0.5"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isMobile && (
          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-[12px] font-mono text-secondary/80">
              {touchInteractive
                ? "Drag any 3D orb to rotate"
                : "3D Tech Stack · Tap to spin"}
            </p>
            <button
              type="button"
              onClick={() => setTouchInteractive((prev) => !prev)}
              className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#070913] border border-white/20 text-[12px] font-medium text-white hover:border-[#915eff] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {touchInteractive ? "Done Rotating" : "Rotate 3D"}
            </button>
          </div>
        )}
      </div>

      {/* Unboxed Architectural Tech Matrix */}
      <div className="mt-10 sm:mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {filteredCategories.map((group) => (
          <div
            key={group.category}
            className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-baseline"
          >
            <div className="md:col-span-4 min-w-0">
              <h3 className="font-display text-white font-semibold text-[18px]">
                {group.category}
              </h3>
              <p className="text-secondary text-[13px] mt-1">{group.summary}</p>
            </div>

            <div className="md:col-span-8 min-w-0 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:text-[14px] font-mono text-white-100">
              {group.items.map((item, idx) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  {idx < group.items.length - 1 && (
                    <span className="text-white/25" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
