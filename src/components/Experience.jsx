import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { experiences } from "../constants";

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I&apos;m Working On</p>
        <h2 className={`${styles.sectionHeadText} mt-1`}>
          Engineering Focus
        </h2>
      </motion.div>

      <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {experiences.map((item, idx) => (
          <motion.div
            key={item.title}
            variants={fadeIn("up", "tween", 0.08 * idx, 0.45)}
            className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            <div className="lg:col-span-4 min-w-0">
              <div className="flex items-center gap-3 text-[13px] font-mono text-secondary tabular-nums">
                <span className="text-[#915eff] font-semibold">
                  {item.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{item.timeframe}</span>
              </div>
              <h3 className="font-display text-white text-[20px] sm:text-[22px] font-semibold mt-2">
                {item.title}
              </h3>
              <p className="text-secondary text-[13px] sm:text-[14px] mt-1.5 break-words">
                {item.subtitle}
              </p>
            </div>

            <ul className="lg:col-span-8 min-w-0 space-y-3">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="text-white-100/90 text-[15px] leading-[1.65] flex items-start gap-3"
                >
                  <span
                    className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#915eff] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
