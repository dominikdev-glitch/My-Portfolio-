import { motion } from "framer-motion";
import React from "react";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        initial="hidden"
        variants={staggerContainer()}
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0 overflow-x-hidden`}
      >
        <span className="hash-span" id={idName} />
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
