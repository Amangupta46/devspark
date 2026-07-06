import React from "react";
import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";
import { Parallax } from "@/experience/motion/parallax";
import { ScrollLine } from "@/experience/motion/scroll-line";
import { Search, Lightbulb, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discover",
    description:
      "Deep-dive analysis of your business goals, target audience, and market landscape.",
    supportingText: "Duration: 1-2 weeks",
    icon: Search,
    color: "hsla(37,93%,55%,0.15)", // Amber
    glow: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "02",
    title: "Strategy",
    description: "Formulating a comprehensive architecture plan and product roadmap.",
    supportingText: "Duration: 1 week",
    icon: Lightbulb,
    color: "hsla(210,100%,60%,0.15)", // Blue
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: "03",
    title: "Design",
    description:
      "Crafting pixel-perfect, premium glassmorphism interfaces and interactive prototypes.",
    supportingText: "Duration: 2-3 weeks",
    icon: PenTool,
    color: "hsla(280,80%,60%,0.15)", // Purple
    glow: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: "04",
    title: "Development",
    description: "Engineering scalable, high-performance web applications with Next.js and WebGL.",
    supportingText: "Duration: 4-6 weeks",
    icon: Code2,
    color: "hsla(10,80%,60%,0.15)", // Rose
    glow: "rgba(244, 63, 94, 0.5)",
  },
  {
    id: "05",
    title: "Launch",
    description: "Rigorous visual QA, performance audits, and a coordinated go-live strategy.",
    supportingText: "Duration: 1 week",
    icon: Rocket,
    color: "hsla(160,80%,50%,0.15)", // Emerald
    glow: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: "06",
    title: "Scale",
    description: "Continuous iteration, analytics tracking, and conversion rate optimization.",
    supportingText: "Ongoing partnership",
    icon: TrendingUp,
    color: "hsla(300,80%,60%,0.15)", // Fuchsia
    glow: "rgba(217, 70, 239, 0.5)",
  },
];

export function ProcessSection() {
  return (
    <Section id="process" background="darker" className="relative overflow-hidden">
      {/* Background Ambience */}
      <BackgroundLayer showNoise />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 -left-1/4 h-[800px] w-[800px] rounded-full bg-amber-500/10 mix-blend-screen blur-[150px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-blue-500/10 mix-blend-screen blur-[150px]" />
        {/* Depth Fog */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-transparent" />
      </div>

      <MaxWidth className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            subheading="Methodology"
            title="Precision at every stage."
            description="A systematic, transparent approach that guarantees quality from initial discovery to global deployment."
          />
        </ScrollReveal>

        <ContentWrapper>
          <div className="relative mx-auto max-w-5xl py-20">
            {/* The Central Connection Line */}
            <ScrollLine />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`relative mb-24 flex items-center md:mb-32 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Central Node */}
                  <div className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-xl md:left-1/2">
                    <div
                      className="absolute inset-0 rounded-full opacity-20 blur-md"
                      style={{ backgroundColor: step.glow }}
                    />
                    <Icon className="relative z-10 h-4 w-4 text-neutral-300 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Spacer for the opposite side on desktop */}
                  <div className="hidden w-1/2 md:block" />

                  {/* Card Side */}
                  <div className="w-full pl-12 md:w-1/2 md:px-12">
                    <ScrollReveal delay={0.1}>
                      <Parallax speed={0.1 * (index % 2 === 0 ? 1 : -1)}>
                        <PremiumCard glowColor={step.color} className="group">
                          <div className="flex h-full flex-col p-8 lg:p-10">
                            {/* Step Header */}
                            <div
                              className="mb-6 flex items-center justify-between"
                              style={{ transform: "translateZ(20px)" }}
                            >
                              <div className="flex items-center gap-4">
                                <span className="font-mono text-4xl font-extrabold text-neutral-800 transition-colors duration-500 group-hover:text-neutral-700">
                                  {step.id}
                                </span>
                                <h3 className="text-2xl font-bold tracking-tight text-white">
                                  {step.title}
                                </h3>
                              </div>
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-colors duration-500 group-hover:border-neutral-700 group-hover:text-white">
                                <Icon className="h-5 w-5" />
                              </div>
                            </div>

                            {/* Description */}
                            <p
                              className="mb-8 text-base leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300"
                              style={{ transform: "translateZ(10px)" }}
                            >
                              {step.description}
                            </p>

                            {/* Supporting Text Footer */}
                            <div
                              className="mt-auto flex items-center gap-2 border-t border-neutral-800/50 pt-4"
                              style={{ transform: "translateZ(15px)" }}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: step.glow }}
                              />
                              <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                                {step.supportingText}
                              </span>
                            </div>
                          </div>
                        </PremiumCard>
                      </Parallax>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
