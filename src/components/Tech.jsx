import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { BallCanvas } from "./canvas";
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
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories =
    selectedCategory === "All"
      ? techCategories
      : techCategories.filter((c) => c.category === selectedCategory);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Technical Architecture</p>
        <div className="mt-1 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <h2 className={styles.sectionHeadText}>Tech Stack</h2>

          {/* Interactive Category Filter Controls */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
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
                    className={`min-h-[38px] px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
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

      {/* Desktop: Interactive 3D Procedural Orbs; Mobile: Fast Tactile Emblem Grid */}
      {isMobile ? (
        <div className="mt-8 grid grid-cols-2 xs:grid-cols-4 gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-surface border border-white/[0.08] rounded-xl p-3.5 flex flex-col items-center justify-center gap-2 text-center"
            >
              <span
                className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#070913] text-white border"
                style={{ borderColor: tech.color }}
              >
                {tech.badge}
              </span>
              <span className="text-[12px] font-medium text-secondary">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-4 lg:grid-cols-8 gap-4">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28">
                <BallCanvas
                  badge={tech.badge}
                  color={tech.color}
                  name={tech.name}
                />
              </div>
              <span className="text-[12px] font-medium text-secondary mt-1">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="mt-5 flex justify-start">
          <button
            type="button"
            onClick={() => navigate("/all-technologies")}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-surface border border-white/[0.12] text-white text-[13px] font-medium hover:border-[#915eff] transition-colors cursor-pointer"
          >
            View Full Tech Index
          </button>
        </div>
      )}

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
