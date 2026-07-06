export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    extraSlow: 1.2,
  },
  ease: {
    outExpo: [0.19, 1, 0.22, 1],
    inOutExpo: [0.87, 0, 0.13, 1],
    outSine: [0.61, 1, 0.88, 1],
  },
  spring: {
    stiff: { stiffness: 400, damping: 30 },
    bouncy: { stiffness: 300, damping: 15 },
    gentle: { stiffness: 100, damping: 20 },
    magnetic: { type: "spring", mass: 0.1, stiffness: 150, damping: 15 },
  },
} as const;
