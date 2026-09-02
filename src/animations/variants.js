export const EASE = [0.22, 1, 0.36, 1];
export const DURATION = 0.45;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const viewportOnce = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: EASE } },
};

export const cardHover = {
  rest: { y: 0, scale: 1, transition: { duration: 0.25, ease: EASE } },
  hover: { y: -4, scale: 1.015, transition: { duration: 0.25, ease: EASE } },
};

export const buttonHover = {
  rest: { scale: 1, transition: { duration: 0.2, ease: EASE } },
  hover: { scale: 1.02, transition: { duration: 0.2, ease: EASE } },
  tap: { scale: 0.985, transition: { duration: 0.15, ease: EASE } },
};
