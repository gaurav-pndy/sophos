// e.g. src/lib/motionVariants.js
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInUpStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

export const hoverFloat = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.02 },
};
