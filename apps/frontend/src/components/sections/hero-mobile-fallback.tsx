export function HeroMobileFallback() {
  return (
    <div
      className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-neutral-950/80 pointer-events-none select-none"
      aria-hidden="true"
      style={{
        background: "linear-gradient(135deg, hsla(222,22%,10%,0.5) 0%, hsla(222,22%,5%,0.2) 100%)",
        backdropFilter: "blur(48px) saturate(1.2)",
        border: "1px solid hsla(0,0%,100%,0.08)",
        boxShadow: "0 0 0 1px hsla(0,0%,0%,0.6), inset 0 1px 1px 0 hsla(0,0%,100%,0.2), 0 24px 64px -16px hsla(0,0%,0%,0.6)",
      }}
    >
      <style>{`
        @keyframes hero-core-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(0.95); }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
        @keyframes hero-ring-spin {
          0% { transform: translate(-50%, -50%) rotateX(60deg) rotateY(15deg) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(60deg) rotateY(15deg) rotateZ(360deg); }
        }
        @keyframes pulse-hero-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .hero-orb-system {
          will-change: transform, opacity;
          transform-style: preserve-3d;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-system {
            animation: none !important;
          }
        }
      `}</style>
      
      {/* Background Soft Glows */}
      <div className="absolute inset-0">
        <div 
          className="hero-orb-system absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, hsla(37,93%,55%,0.3) 0%, transparent 70%)", animation: "pulse-hero-glow 6s ease-in-out infinite" }}
        />
        <div 
          className="hero-orb-system absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/4 -translate-y-1/4 rounded-full"
          style={{ background: "radial-gradient(circle, hsla(222,100%,60%,0.2) 0%, transparent 70%)", animation: "pulse-hero-glow 8s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Solid Geometric Core (Icosahedron representation) */}
      <div 
        className="hero-orb-system absolute top-1/2 left-1/2 h-32 w-32"
        style={{ animation: "hero-core-spin 20s linear infinite reverse" }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <linearGradient id="coreGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <filter id="coreGlowBlur">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#coreGlowBlur)">
            <polygon points="50,10 90,40 50,70 10,40" fill="url(#coreGold)" opacity="0.9" />
            <polygon points="50,10 90,40 70,90 30,90 10,40" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
            <polygon points="50,70 70,90 30,90" fill="url(#coreGold)" opacity="0.7" />
            <polygon points="50,40 90,40 70,90 50,70" fill="url(#coreGold)" opacity="0.5" />
            <polygon points="50,40 10,40 30,90 50,70" fill="url(#coreGold)" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Complex Glass Shell (TorusKnot representation) */}
      <div 
        className="hero-orb-system absolute top-1/2 left-1/2 h-64 w-64 rounded-full border border-white/20"
        style={{ 
          animation: "hero-ring-spin 15s linear infinite",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%)",
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 0 15px rgba(59,130,246,0.2)",
          backdropFilter: "blur(4px)"
        }}
      >
        {/* Inner ring detailing */}
        <div className="absolute inset-2 rounded-full border border-white/10 border-t-white/30" />
        <div className="absolute inset-[-10px] rounded-full border border-blue-500/10 border-b-blue-500/30" />
      </div>
    </div>
  );
}
