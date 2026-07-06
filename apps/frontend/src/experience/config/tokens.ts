export const MOTION_TOKENS = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2,
  },
  ease: {
    outExpo: [0.16, 1, 0.3, 1] as const,
    inOutExpo: [0.87, 0, 0.13, 1] as const,
    linear: "linear",
  },
  spring: {
    gentle: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
    bouncy: { type: "spring", stiffness: 150, damping: 15, mass: 1 },
    slow: { type: "spring", stiffness: 50, damping: 15, mass: 1 },
  },
} as const;

export const MOTION_TRANSITIONS = {
  sectionReveal: {
    duration: MOTION_TOKENS.duration.slow,
    ease: MOTION_TOKENS.ease.outExpo,
  },
  cardHover: MOTION_TOKENS.spring.gentle,
  springReveal: MOTION_TOKENS.spring.gentle,
  buttonHover: {
    duration: MOTION_TOKENS.duration.fast,
    ease: MOTION_TOKENS.ease.outExpo,
  },
  microInteraction: {
    duration: 0.15,
    ease: "easeOut",
  },
} as const;
