import { ANIMATION_CONFIG } from "../config/animation";
import type { Variants } from "framer-motion";

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.outExpo },
  },
  exit: {
    opacity: 0,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.inOutExpo },
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.outExpo },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.inOutExpo },
  },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.outExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.inOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
