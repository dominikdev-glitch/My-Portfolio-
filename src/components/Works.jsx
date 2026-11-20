import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { styles } from "../styles";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import ProjectPreview from "./ProjectPreview";

const ProjectCard = ({ index, project, onSelect }) => {
  return (
    <motion.article
      variants={fadeIn("up", "tween", index * 0.08, 0.35)}
      className="min-w-0 bg-surface border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#915eff]/50 transition-colors duration-200"
    >
      <div>
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="w-full aspect-video overflow-hidden block cursor-pointer border-b border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
          aria-label={`Inspect ${project.name} architecture`}
        >
          <ProjectPreview projectId={project.id} />
        </button>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[12px] font-medium text-secondary min-w-0">
            <span className="shrink-0">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.networks}</span>
          </div>

          <h3 className="font-display text-white font-bold text-[20px] sm:text-[22px] mt-2">
            {project.name}
          </h3>

          <p className="text-secondary mt-3 text-[14px] leading-[1.65]">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-white/[0.06] flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] font-mono text-secondary">
          {project.stack.map((tech, idx) => (
            <React.Fragment key={tech}>
              <span>{tech}</span>
              {idx < project.stack.length - 1 && (
                <span className="text-white/25" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="min-h-[40px] inline-flex items-center text-[13px] font-semibold text-white hover:text-[#915eff] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Inspect Architecture
          </button>

          <div className="flex items-center gap-4 shrink-0">
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] inline-flex items-center gap-1 text-[13px] font-medium text-secondary hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] inline-flex items-center gap-1 text-[13px] font-medium text-secondary hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-surface border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-[#0A0D16] border-b border-white/[0.08]">
          <ProjectPreview projectId={project.id} expanded />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-3 right-3 w-11 h-11 rounded-full bg-[#070913]/90 border border-white/20 text-white flex items-center justify-center hover:bg-[#915eff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] font-medium text-secondary">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.networks}</span>
          </div>

          <h3
            id="project-modal-title"
            className="font-display text-white font-bold text-[24px] sm:text-[30px] mt-2"
          >
            {project.name}
          </h3>

          <p className="text-secondary text-[15px] leading-[1.7] mt-3">
            {project.description}
          </p>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <h4 className="font-display text-white text-[15px] font-semibold mb-3">
              Architecture Highlights
            </h4>
            <ul className="space-y-2.5">
              {project.architecture.map((point) => (
                <li
                  key={point}
                  className="text-white-100/90 text-[14px] leading-[1.6] flex items-start gap-3"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#915eff] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-mono text-secondary">
              {project.stack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < project.stack.length - 1 && (
                    <span className="text-white/25" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#070913] border border-white/[0.14] hover:border-[#915eff] text-white text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>Live App</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg bg-[#915eff] hover:bg-[#7e4be6] text-white text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors"
              >
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Selected Systems</p>
        <h2 className={`${styles.sectionHeadText} mt-1`}>
          Projects &amp; Builds
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 0.5)}
        className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[1.7]"
      >
        Selected public repositories from GitHub — spanning a custom Layer-1
        blockchain in C++20, scheduled backend uptime automation, and full-stack
        TypeScript sharing workflows.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default SectionWrapper(Works, "projects");
