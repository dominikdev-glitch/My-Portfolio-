import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { technologies, techCategories } from "../constants";

const AllTechnologies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary px-5 sm:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-white transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Portfolio</span>
        </button>

        <p className={styles.sectionSubText}>Complete Index</p>
        <h1 className={`${styles.sectionHeadText} mt-1`}>Tech Stack</h1>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-surface border border-white/[0.08] rounded-xl p-4 flex items-center gap-3"
            >
              <span
                className="font-mono text-xs font-bold px-2 py-1 rounded bg-[#070913] text-white border border-white/10"
                style={{ borderColor: tech.color }}
              >
                {tech.badge}
              </span>
              <span className="text-sm font-medium text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {techCategories.map((group) => (
            <div
              key={group.category}
              className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-4">
                <h2 className="font-display text-white font-semibold text-[18px]">
                  {group.category}
                </h2>
                <p className="text-secondary text-[13px] mt-1">
                  {group.summary}
                </p>
              </div>
              <div className="md:col-span-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] font-mono text-white-100">
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
      </div>
    </div>
  );
};

export default AllTechnologies;
