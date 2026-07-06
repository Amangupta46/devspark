"use client";

export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: "url('/noise.webp')",
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}
