export const textVariant = (delay = 0) => {
  return {
    hidden: {
      y: -16,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.35,
        delay: delay,
        ease: "easeOut",
      },
    },
  };
};

export const fadeIn = (direction, type = "tween", delay = 0, duration = 0.35) => {
  return {
    hidden: {
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay = 0, duration = 0.35) => {
  return {
    hidden: {
      scale: 0.94,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction, type = "tween", delay = 0, duration = 0.4) => {
  return {
    hidden: {
      x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};