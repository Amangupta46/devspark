import { Variants } from "framer-motion";

export const headerVariants: Variants = {
  visible: {
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // ease-out
    },
  },
  hidden: {
    y: "-100%",
    transition: {
      duration: 0.25,
      ease: [0.55, 0.055, 0.675, 0.19], // ease-in
    },
  },
};

export const drawerVariants: Variants = {
  closed: {
    x: "100%",
    transition: {
      duration: 0.25,
      ease: [0.55, 0.055, 0.675, 0.19], // ease-in
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1], // ease-out
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 0.6,
    transition: {
      duration: 0.25,
    },
  },
};

export const itemVariants: Variants = {
  closed: {
    opacity: 0,
    y: 16,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
