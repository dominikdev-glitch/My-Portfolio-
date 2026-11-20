import React from "react";
import { motion } from "framer-motion";
import { Server, Blocks, Network, Layers } from "lucide-react";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const iconMap = {
  server: Server,
  blocks: Blocks,
  network: Network,
  layers: Layers,
};

const ServiceCard = ({ index, title, description, iconName, number }) => {
  const Icon = iconMap[iconName] || Server;

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.08 * index, 0.45)}
      className="bg-surface border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between hover:border-[#915eff]/50 transition-colors duration-200"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#915eff]/15 border border-[#915eff]/30 flex items-center justify-center text-[#915eff]">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="font-mono text-[13px] text-secondary tabular-nums">
            {number}
          </span>
        </div>

        <h3 className="font-display text-white text-[20px] font-semibold">
          {title}
        </h3>
        <p className="mt-2.5 text-secondary text-[14px] leading-[1.65]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Overview</p>
        <h2 className={`${styles.sectionHeadText} mt-1`}>
          Engineering Scalable Backends &amp; Multi-Chain Systems
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 0.6)}
        className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[1.7]"
      >
        I&apos;m Ibekwe Somtochukwu (dominikdev-glitch), a Backend &amp;
        Blockchain Developer with 3+ years of experience working remotely
        worldwide with US EST timezone overlap (UTC+1). From solo-architecting
        the MERMAI Layer-1 blockchain in C++20 to shipping multi-chain platforms
        across Ethereum, BNB Smart Chain, Solana, and TRON, I focus on security,
        clean architecture, and end-to-end delivery.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, idx) => (
          <ServiceCard
            key={service.title}
            index={idx}
            number={service.index}
            title={service.title}
            description={service.description}
            iconName={service.iconName}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
