"use client";

import React, { useState } from "react";
import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { usePerformance } from "@/experience/hooks/use-performance";
import { SectionHeader } from "@/components/shared/section-header";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";

// Icons (lucide or standard text if not available)
import {
  Code2,
  Terminal,
  Database,
  Cloud,
  Cpu,
  Globe,
  Layers,
  Server,
  Network,
  Sparkles,
  GitBranch,
} from "lucide-react";

const INNER_NODES = [
  { id: "react", label: "React", icon: Code2, color: "hsla(193,95%,68%,0.2)" },
  { id: "next", label: "Next.js", icon: Globe, color: "hsla(0,0%,100%,0.2)" },
  { id: "ts", label: "TypeScript", icon: Terminal, color: "hsla(211,60%,48%,0.2)" },
  { id: "node", label: "Node.js", icon: Server, color: "hsla(113,44%,45%,0.2)" },
];

const OUTER_NODES = [
  { id: "python", label: "Python", icon: Terminal, color: "hsla(208,50%,45%,0.2)" },
  { id: "fastapi", label: "FastAPI", icon: Network, color: "hsla(173,81%,40%,0.2)" },
  { id: "pg", label: "PostgreSQL", icon: Database, color: "hsla(209,55%,45%,0.2)" },
  { id: "docker", label: "Docker", icon: Layers, color: "hsla(209,92%,55%,0.2)" },
  { id: "aws", label: "AWS", icon: Cloud, color: "hsla(34,100%,50%,0.2)" },
  { id: "openai", label: "OpenAI", icon: Cpu, color: "hsla(160,100%,35%,0.2)" },
  { id: "supabase", label: "Supabase", icon: Database, color: "hsla(158,100%,40%,0.2)" },
  { id: "github", label: "GitHub", icon: GitBranch, color: "hsla(0,0%,90%,0.2)" },
];

export function TechStackSection() {
  const { reducedMotion } = usePerformance();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Math helper for orbital positions
  const getPos = (index: number, total: number, radiusPct: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + radiusPct * Math.cos(angle);
    const y = 50 + radiusPct * Math.sin(angle);
    return { x: `${x}%`, y: `${y}%` };
  };

  const innerRadius = 25; // 25% of container
  const outerRadius = 45; // 45% of container

  return (
    <Section id="tech-stack" background="darker" className="relative overflow-hidden">
      {/* Immersive Background */}
      <BackgroundLayer showNoise />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 mix-blend-screen blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 mix-blend-screen blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]" />
      </div>

      <MaxWidth className="relative z-10 max-w-7xl">
        <ScrollReveal>
          <SectionHeader
            subheading="The Foundation"
            title="Built on modern, resilient architecture."
            description="We leverage enterprise-grade technologies to ensure your product is fast, secure, and ready to scale."
          />
        </ScrollReveal>

        <ContentWrapper
          className="mt-20 hidden lg:block"
          style={{ contentVisibility: "auto", contain: "layout style" }}
        >
          <style>{`
            @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            .tech-orbit-cw { animation: spin-cw 60s linear infinite; transform-origin: 50% 50%; }
            .tech-orbit-ccw { animation: spin-ccw 100s linear infinite; transform-origin: 50% 50%; }
            @media (prefers-reduced-motion: reduce) {
              .tech-orbit-cw, .tech-orbit-ccw { animation: none !important; }
            }
          `}</style>
          {/* DESKTOP UNIVERSE */}
          <div className="relative mx-auto aspect-square w-full max-w-[900px]">
            {/* SVG Connections (Static Base Layer) */}
            <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="50%" stopColor="rgba(59,130,246,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
              </defs>

              {/* Inner connections */}
              <g className="tech-orbit-cw">
                {INNER_NODES.map((_, i) => {
                  const pos = getPos(i, INNER_NODES.length, innerRadius);
                  return (
                    <line
                      key={`in-line-${i}`}
                      x1="50%"
                      y1="50%"
                      x2={pos.x}
                      y2={pos.y}
                      stroke="url(#lineGrad)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </g>

              {/* Outer connections */}
              <g className="tech-orbit-ccw">
                {OUTER_NODES.map((_, i) => {
                  const pos = getPos(i, OUTER_NODES.length, outerRadius);
                  return (
                    <line
                      key={`out-line-${i}`}
                      x1="50%"
                      y1="50%"
                      x2={pos.x}
                      y2={pos.y}
                      stroke="url(#lineGrad)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                    />
                  );
                })}
              </g>
            </svg>

            {/* Orbit 1 (Inner) */}
            <div className="tech-orbit-cw absolute inset-0 z-10">
              <div className="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-800/50" />
              {INNER_NODES.map((node, i) => {
                const pos = getPos(i, INNER_NODES.length, innerRadius);
                const isHovered = hoveredNode === node.id;

                return (
                  <div
                    key={node.id}
                    className="absolute h-16 w-32 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pos.x, top: pos.y }}
                  >
                    <div
                      className="tech-orbit-ccw h-full w-full"
                      style={{ animationDuration: "60s" }}
                    >
                      <div
                        className="h-full w-full transition-transform duration-300"
                        style={{
                          transform: isHovered
                            ? "scale(1.1) translateZ(30px)"
                            : "scale(1) translateZ(0)",
                        }}
                      >
                        <PremiumCard
                          glowColor={node.color}
                          className="h-full w-full cursor-pointer rounded-xl p-0"
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div className="flex h-full flex-col items-center justify-center gap-1">
                            <node.icon
                              className={`h-5 w-5 ${isHovered ? "text-white" : "text-neutral-400"}`}
                            />
                            <span className="text-[10px] font-semibold tracking-wider text-neutral-300">
                              {node.label}
                            </span>
                          </div>
                        </PremiumCard>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orbit 2 (Outer) */}
            <div className="tech-orbit-ccw absolute inset-0 z-10">
              <div className="absolute top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-800/30" />
              {OUTER_NODES.map((node, i) => {
                const pos = getPos(i, OUTER_NODES.length, outerRadius);
                const isHovered = hoveredNode === node.id;

                return (
                  <div
                    key={node.id}
                    className="absolute h-16 w-28 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pos.x, top: pos.y }}
                  >
                    <div
                      className="tech-orbit-cw h-full w-full"
                      style={{ animationDuration: "100s" }}
                    >
                      <div
                        className="h-full w-full transition-transform duration-300"
                        style={{
                          transform: isHovered
                            ? "scale(1.1) translateZ(30px)"
                            : "scale(1) translateZ(0)",
                        }}
                      >
                        <PremiumCard
                          glowColor={node.color}
                          className="h-full w-full cursor-pointer rounded-xl p-0"
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div className="flex h-full flex-col items-center justify-center gap-1">
                            <node.icon
                              className={`h-4 w-4 ${isHovered ? "text-white" : "text-neutral-500"}`}
                            />
                            <span className="text-[10px] font-medium tracking-wider text-neutral-400">
                              {node.label}
                            </span>
                          </div>
                        </PremiumCard>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Centerpiece Component */}
            <div className="pointer-events-auto absolute top-1/2 left-1/2 z-30 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
              {/* Fake shadow for performance */}
              <div className="pointer-events-none absolute inset-[-20px] rounded-full bg-blue-500/20 blur-xl" />
              <PremiumCard
                glowColor="hsla(210,100%,60%,0.3)"
                className="relative flex h-full w-full items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/80 p-0"
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <Sparkles className="mb-2 h-6 w-6 text-blue-400" />
                  <span className="px-2 text-xs leading-tight font-bold text-white">
                    DevSpark
                    <br />
                    Engineering
                  </span>
                </div>
                {/* Animated inner rings */}
                {!reducedMotion && (
                  <>
                    <div
                      className="tech-orbit-cw absolute inset-[-10px] rounded-full border border-blue-500/20"
                      style={{ animationDuration: "4s" }}
                    />
                    <div
                      className="tech-orbit-ccw absolute inset-[-20px] rounded-full border border-amber-500/10"
                      style={{ animationDuration: "8s" }}
                    />
                  </>
                )}
              </PremiumCard>
            </div>
          </div>

          {/* MOBILE ADAPTIVE LAYOUT */}
        </ContentWrapper>

        <ContentWrapper className="mt-12 lg:hidden">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Combine all nodes for mobile grid */}
            {[...INNER_NODES, ...OUTER_NODES].map((node) => (
              <PremiumCard key={node.id} glowColor={node.color} className="h-24 p-0">
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <node.icon className="h-5 w-5 text-neutral-400" />
                  <span className="text-[10px] font-semibold tracking-widest text-neutral-300 uppercase">
                    {node.label}
                  </span>
                </div>
              </PremiumCard>
            ))}
          </div>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
