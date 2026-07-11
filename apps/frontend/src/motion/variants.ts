import { Variants } from "framer-motion";

export const TRANSITION_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const TRANSITION_EASE = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1], // ease-out
  duration: 0.4,
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: TRANSITION_EASE },
  exit: { opacity: 0, y: -10, scale: 0.99, transition: { ...TRANSITION_EASE, duration: 0.2 } },
};

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: TRANSITION_EASE },
  exit: { opacity: 0, transition: { ...TRANSITION_EASE, duration: 0.2 } },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: TRANSITION_SPRING },
  exit: { opacity: 0, y: -20, transition: TRANSITION_EASE },
};

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: TRANSITION_SPRING },
  exit: { opacity: 0, x: 20, transition: TRANSITION_EASE },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: TRANSITION_SPRING },
  exit: { opacity: 0, scale: 0.95, transition: TRANSITION_EASE },
};

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: TRANSITION_EASE },
};

// Micro-interactions for Hover/Tap
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01, transition: TRANSITION_SPRING },
  tap: { y: 0, scale: 0.98, transition: TRANSITION_SPRING },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: TRANSITION_SPRING },
  tap: { scale: 0.95, transition: TRANSITION_SPRING },
};
