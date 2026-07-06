import { Variants } from "framer-motion";

export const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 4,
    transition: { duration: 0.1 },
  },
};

export const accordionVariants: Variants = {
  collapse: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } },
  },
  expand: {
    height: "auto",
    opacity: 1,
    transition: { height: { duration: 0.3 }, opacity: { duration: 0.25 } },
  },
};

export const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const drawerSlideVariants: Variants = {
  closed: { x: "100%" },
  open: { x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
