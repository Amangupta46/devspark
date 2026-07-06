export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateParticles(seed: number, count: number) {
  const prng = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: prng() * 100,
    y: prng() * 100,
    size: prng() * 3 + 1,
    dur: prng() * 30 + 20,
    del: prng() * 20,
    op: prng() * 0.15 + 0.02,
  }));
}
